const express = require('express');
const { SMS } = require('../config');
const axios = require('axios');
const gravatar = require('gravatar');
const { User } = require('../model');
const router = express.Router();
//获取验证码
router.get('/getCaptcha', async function (req, res) {
    let { mobile } = req.query;//把手机号放在查询参数中传过来
    const url = 'https://open.ucpaas.com/ol/sms/sendsms';
    let captcha = new Date().getMilliseconds();//验证码
    //在后台把这个手机号 和验证码 和当前的用户绑定
    req.session.mobile = mobile;
    req.session.captcha = captcha;
    let result = await axios({
        method: 'POST',
        url,
        data: {
            sid: SMS.sid,
            token: SMS.token,
            appid: SMS.appid,
            templateid: SMS.templateid,
            param: captcha,
            mobile
        },
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        }
    })
    if (result.data.code == '000000') {
        res.json({ code: 0, data: '验证码发送成功' });
    } else {
        res.json({ code: 1, data: result.data.msg });
    }
});

router.post('/register', async function (req, res) {
    let { email, password, mobile, captcha } = req.body;
    let avatar = gravatar.url(email);
    if (req.session.captcha == captcha && req.session.mobile == mobile) {
        let user = await User.create({ email, mobile, password, avatar });
        res.json({ code: 0, data: user });
    } else {
        res.json({ code: 1, data: '验证码不正确' });
    }
});
router.post('/login', async function (req, res) {
    let { email, password, mobile, captcha, type } = req.body;
    if (type == 'account') {//邮箱和密码登录
        let user = await User.findOne({ email, password });
        if (user) {
            req.session.user = user;
            res.json({ code: 0, data: user });
        } else {
            res.json({ code: 1, error: '登录失败' });
        }
    } else {//手机验证码登录
        if (req.session.captcha == captcha && req.session.mobile == mobile) {
            let user = await User.findOne({ mobile });
            if (user) {
                req.session.user = user;
                res.json({ code: 0, data: user });
            } else {
                res.json({ code: 1, error: '登录失败' });
            }
        } else {
            res.json({ code: 1, error: '手机验证码错误' });
        }
    }
});

router.post('/changeAvatar', async function (req, res) {
    let { userID, avatar } = req.body;
    let user = await User.findById(userID);
    user.avatar = avatar;
    await user.save();
    res.json({ code: 0, data: user });
});

module.exports = router;
/**
 * {
    "code": "000000",
    "count": "1",
    "create_date": "2018-10-20 11:33:13",
    "mobile": "15718856132",
    "msg": "OK",
    "smsid": "64dc3f91b73ff5ca19b4412c5ae641ef",
    "uid": ""
}
{
    "code": "100015",
    "count": "0",
    "create_date": "",
    "mobile": "157188561",
    "msg": "号码不合法",
    "smsid": "",
    "uid": ""
}
 */