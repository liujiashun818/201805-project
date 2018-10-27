const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//multer是一个处理文件上传的中间件
const multer = require('multer');
const upload = multer({ dest: './upload' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);
app.get('/', function (req, res) {
    res.json({ name: 'hello' });
});
//echo 回音
app.post('/json', function (req, res) {
    res.json(req.body);
});
app.post('/form', function (req, res) {
    res.json(req.body);
});
app.post('/formdata', upload.single('avatar'), function (req, res) {
    console.log(req.file);
    console.log(req.body);
    res.json(req.body);
});