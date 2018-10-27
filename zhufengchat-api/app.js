const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const { User, Room, Message } = require('./model');
let app = express();
app.use(cors({
    origin: 'http://localhost:8000',//允许此来源
    credentials: true,//支持客户端跨域发送cookie
}));
app.use(session({
    resave: true,
    secret: 'zfpx',
    saveUninitialized: true
}));
app.use(bodyParser.json());
let user = require('./routes/user');
let room = require('./routes/room');
app.use('/user', user);
app.use('/room', room);
let server = require('http').createServer(app);
let io = require('socket.io')(server);
server.listen(3000);
io.on('connection', async function (socket) {
    console.log('客户端连接成功');
    let { roomID, userID } = socket.handshake.query;
    socket.join(roomID);//加入某个房间
    let user = await User.findById(userID);
    user.room = roomID;
    await user.save();
    let room = await Room.findById(roomID);
    socket.on('getRoom', async function (roomID) {
        let users = await User.find({ room: roomID });//用户的数组
        let messages = await Message.find({ room: roomID }).sort({ createAt: -1 }).limit(20).populate('user');//消息的数组
        messages.reverse();//查出来是从新到旧，反转后从旧到新
        socket.emit('room', { room, users, messages });
    });
    socket.on('message', async function (content) {
        let message = new Message({
            user: userID,
            content,
            room: roomID
        });
        await message.save();
        message.user = user;
        io.in(roomID).emit('message', message);
    });
    socket.on('exit', async function () {
        user.room = null;
        await user.save();
    });
    socket.on('error', async function () {
        user.room = null;
        await user.save();
    });
    socket.on('disconnect', async function () {
        user.room = null;
        await user.save();
    });
});
