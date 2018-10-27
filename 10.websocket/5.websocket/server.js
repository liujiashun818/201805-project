let net = require('net');
let CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let crypto = require('crypto');
//现在手写一个websocket服务器，基于TCP服务器手写的
let server = net.createServer(function (socket) {
    //监听客户端发过来的数据 once表示 只监听一次 on connection
    socket.once('data', function (data) {
        data = data.toString();
        let lines = data.split('\r\n');
        let headers = lines.slice(1, -2);
        //第一步我们成功的拿到headers,就是所谓的请求头对象
        headers = headers.reduce((headers, line) => {
            let [key, val] = line.split(': ');
            headers[key] = val;
            return headers;
        }, {});
        //如果Upgrade的值是websocket的话，则需要升级协议
        if (headers.Upgrade == 'websocket') {
            let key = headers['Sec-WebSocket-Key'];
            let accept = crypto.createHash('sha1').update(key + CODE).digest('base64');
            let response = [
                "HTTP/1.1 101 Switching Protocols",
                "Upgrade: websocket",
                "Connection: Upgrade",
                `Sec-WebSocket-Accept: ${accept}`,
                '\r\n'
            ].join('\r\n');
            socket.write(response);
            //下面开始监听客户端发过来的消息了 走的是websocket协议 message
            socket.on('data', function (buffers) {
                //FIN|RSV1|RSV1|RSV3| opcode|
                let fin = (buffers[0] & 0b10000000) == 0b10000000;//是否最后一帧
                let opcode = buffers[0] & 0b00001111;//操作码 1表示文本
                let isMasked = (buffers[1] & 0b10000000) == 0b10000000;// 对方是否掩码把数据发过来了
                let length = buffers[1] & 0b01111111;//客户端发过来的数据的长度
                let maskKeyOffset = 2;
                if (length == 126) {
                    length = buffers.slice(2, 4);
                    maskKeyOffset = 4;
                } else if (length == 127) {
                    length = buffers.slice(2, 10);
                    maskKeyOffset = 10;
                }
                let mask = buffers.slice(maskKeyOffset, maskKeyOffset + 4);//4个字节 0 1 2 3
                let payload = buffers.slice(maskKeyOffset + 4);
                for (let i = 0; i < payload.length; i++) {
                    payload[i] ^= mask[i % 4];//i&3    0 0 0 0 0 0 1 1 
                }
                console.log(fin, opcode, isMasked, length, mask, payload);
                let response = Buffer.alloc(2 + payload.length);
                let ret = Buffer.from('world');
                response[0] = 0b10000001;
                response[1] = ret.length;
                ret.copy(response, 2);
                console.log('response', response);
                socket.write(response);
            });
        }

    });
});
server.listen(9999);
/**
 * GET ws://localhost:8888/ HTTP/1.1
 * Connection: Upgrade
 * Upgrade: websocket
 * Sec-WebSocket-Version: 13
 * Sec-WebSocket-Key: O+UkOD1OI0sfNmW3Q+rfkw==
 * 
 * 
 */