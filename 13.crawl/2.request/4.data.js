let request = require('request');
let fs = require('fs');
//如何向服务器发送post请求，请求体的格式还可以是formdata
//里面有二进制文件
const options = {
    url: 'http://localhost:3000/formdata',
    method: 'POST',
    json: true,
    headers: {
        "Content-Type": "multipart/form-data"
    },
    formData: {
        name: 'zfpx',
        age: 9,
        avatar: {
            value: fs.createReadStream('./avatar.jpg'),
            options: {
                filename: 'avatar.jpg',
                contentType: 'image/jpeg'
            }
        }
    }
}
request(options, function (err, resonse, body) {
    console.log(err)
    console.log(body);
});