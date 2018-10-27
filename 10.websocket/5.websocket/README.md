### websocket第一次连接时的请求头
```js
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: O+UkOD1OI0sfNmW3Q+rfkw==
```

响应
```js
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Kn+ioM5OZVclL9LlB+fjAX03nMw=
```


```js
GET ws://localhost:8888/ HTTP/1.1
Host: localhost:8888
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36
Upgrade: websocket
Origin: http://localhost:8080
Sec-WebSocket-Version: 13
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Sec-WebSocket-Key: O+UkOD1OI0sfNmW3Q+rfkw==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

```


```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: Kn+ioM5OZVclL9LlB+fjAX03nMw=
```