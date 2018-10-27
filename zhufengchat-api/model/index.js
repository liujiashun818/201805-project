const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const conn = mongoose.createConnection('mongodb://localhost/zfpxchat');
const User = conn.model('User', {
    email: { type: String, required: true },
    avatar: { type: String },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    room: { type: ObjectId, ref: 'Room' }//当前用户在哪个房间内
});

const Room = conn.model('Room', {
    name: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    users: [{ type: ObjectId, ref: 'User' }]
});

const Message = conn.model('Message', {
    user: { type: ObjectId, ref: 'User' },
    content: { type: String },
    room: { type: ObjectId, ref: 'Room' },//当前用户在哪个房间内
    createAt: { type: Date, default: Date.now }
});

module.exports = {
    User,
    Room,
    Message
}