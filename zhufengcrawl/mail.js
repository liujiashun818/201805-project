const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
        user: '83687401@qq.com',
        pass: ''
    }
});


module.exports = function (title) {
    let options = {
        from: '83687401@qq.com',
        to: '83687401@qq.com',
        subject: title,
        html: '<h1>hello</h1>'
    }
    transport.sendMail(options, function () {
        console.log(arguments);
    });
}