const express = require('express');
const router = express.Router();
const { Room, User } = require('../model');
router.get('/list', async function (req, res) {
    let list = await Room.find();
    for (let i = 0; i < list.length; i++) {
        list[i].users = await User.find({ room: list[i]._id });
    }
    res.json({ code: 0, data: list });
});
router.post('/create', async function (req, res) {
    let room = req.body;
    await Room.create(room);//{name}
    res.json({ code: 0, data: '房间成功创建' });
});
module.exports = router;