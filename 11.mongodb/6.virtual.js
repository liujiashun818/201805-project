let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
let crypto = require('crypto');
/**
 * 数据库 集合 文档
 */
//1.连接数据库 // mongodb://主机名:端口号/数据库名
let dbUrl = 'mongodb://localhost:27017/school';
let conn = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
//用户 objectId 是唯一的可以唯一标记一个文档
//virutal方便的实现属性分割和合并
let UserSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String// 086-18910000000
});
UserSchema.virtual('area').get(function () {
    return this.phone.split('-')[0];
});
UserSchema.virtual('cell').get(function () {
    return this.phone.split('-')[1];
});
UserSchema.virtual('fullname').get(function () {
    return this.firstname + this.lastname;
});
//在对象保存之前执行一个钩子函数
UserSchema.pre('save', function (next) {
    this.password = crypto.createHmac('sha1', 'zfpx').update(this.password).digest('hex');
    next();
});
UserSchema.methods.exist = function (callback) {
    this.password = crypto.createHmac('sha1', 'zfpx').update(this.password).digest('hex');
    this.model('User').findOne({ username: this.username, password: this.password }, function (err, doc) {
        if (doc) callback(null, true)
        else callback(null, false)
    });
}
//area 加两个字段增加了数据库的存储空间，而且更新也不方便
let User = conn.model('User', UserSchema);
let user = new User({ username: 'zfpx', password: '123456', phone: '086-18910000000', firstname: '张', lastname: '三' });
/* console.log(user.phone);
console.log(user.area);//086
console.log(user.cell);//18910000000
console.log(user.fullname);
 */

//hook钩子 生命周期函数
/* user.save(function (err, doc) {
    console.log(doc);
}); */
user.exist(function (exist) {
    console.log(exist);
});

