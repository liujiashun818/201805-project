//let request = require('request');
let http = require('http');
http.get({
    host: 'localhost',
    port: 3000,
    path: '/'
}, function (err, resonse) {
    console.log(resonse)
});
request('http://news.baidu.com/', function (err, response, body) {
    console.log(body);
});