let request = require('request');
//如何向服务器发送post请求，请求体的格式是json
const options = {
    url: 'http://localhost:3000/form',
    method: 'POST',
    json: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    form: { name: 'zfpx', age: 10 }
}
request(options, function (err, resonse, body) {
    console.log(body)
});