let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
/**
 * 数据库 集合 文档
 */
//1.连接数据库 // mongodb://主机名:端口号/数据库名
let dbUrl = 'mongodb://localhost:27017/school';
let conn = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
//用户 objectId 是唯一的可以唯一标记一个文档
let UserSchema = new Schema({
    username: String,
    password: String
});
//类上扩展 在模型上扩展
UserSchema.statics.login = function (username, password, callback) {
    this.findOne({ username, password }, callback);
}
UserSchema.methods.exist = function (callback) {
    this.model('User').findOne({ username: this.username, password: this.password }, function (err, doc) {
        if (doc) callback(null, true)
        else callback(null, false)
    });
}
let User = conn.model('User', UserSchema);
//User.create({ username: 'zfpx', password: '123456' });

let username = 'zfpx';
let password = '12345';
//如果想扩展这个登录的功能，封装这个登录的功能有两种方法
/* User.login(username, password, function (err, doc) {
    if (doc) {
        console.log('登录成功')
    } else {
        console.log('登录失败');
    }
}); */
let user = new User({ username, password });
user.exist(function (err, result) {
    console.log(result);
});