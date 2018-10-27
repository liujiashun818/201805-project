let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(8080);
//============================
//websocket服务器分为二部分，分别是服务器端和客户端
let Server = require('ws').Server;
//创建一个websocket服务器的实例，监听的端口号是8888
let server = new Server({ port: 8888 });
//监听客户端的连接和发过来的消息 socket 代表这个客户端的连接
//A拨打B的电话号，如果B接通了，则相当于在他们之间建立了连接，connction
//接通之后就要说话，
//socket 就代表电话 
// emitemitter 
server.on('connection', function (socket) {
    //监听客户端发过来的消息 就相当于A的耳朵听到了B说的话
    socket.on('message', function (message) {
        console.log(message);
        //向指定的客户端发送消息
        socket.send(`服务器对你说:${message}`);
    });
});
