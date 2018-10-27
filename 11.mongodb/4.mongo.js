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
    name: String,
    age: Number
});
//给模型扩展静态方法
//this=model
UserSchema.statics.findByUsername = function (username, callback) {
    this.findOne({ name: username }, callback);
}
let User = conn.model('User', UserSchema);
//用起来方便，语义化
User.findByUsername('zfpx1', function (err, result) {
    console.log(err);
    console.log(result);
});

/* User.find({ age: { $in: [1, 3, 5] } }, function (err, docs) {
    console.log(docs);
    process.exit();
}); */
/* User.find({ age: { $exists: true } }, function (err, docs) {
    console.log(err);
    console.log(docs);
    process.exit();
}); */