
let crypto = require('crypto');
let CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let key = 'O+UkOD1OI0sfNmW3Q+rfkw==';
let accept = crypto.createHash('sha1').update(key + CODE).digest('base64');
console.log(accept);