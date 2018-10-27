let mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * 数据库 集合 文档
 */
//1.连接数据库 // mongodb://主机名:端口号/数据库名
let dbUrl = 'mongodb://localhost:27017/school';
let conn = mongoose.createConnection(dbUrl, { useNewUrlParser: true });
//2.定义骨架模型 对应于集合的 定义了集合中文档的字段的名称和类型以及一些校验规则
let UserSchema = new Schema({
    name: String,
    age: Number
});
//3.定义数据库操作Model
let User = conn.model('User', UserSchema);
/**
User.create({ name: 'zfpx11', age: 1 }, function (err, result) {
    //{ _id: 5bc2ec42d822a216c81ff5b8, name: 'zfpx1', age: 1, __v: 0 }
    console.log(result);
});


User.create({ name: 'zfpx2', age: 2 }).then(function (doc) {
    //{ _id: 5bc2ec88e7222a168cdf8630, name: 'zfpx2', age: 2, __v: 0 }
    console.log(doc);
});

//mongoose 里，即使你没有$set操作符，也是更新指定的字段，其它字段不变
User.update({ name: 'zfpx1' }, { $set: { name: 'zfpx11' }, $inc: { age: 1 } }, { multi: true }, function (err, result) {
    //{ ok: 1, nModified: 1, n: 1 } nModified:1 表示实际更新的条数 n:1表示要更新的条数
    //如果能匹配上几条那么n就是几，然后在实际更新的时候会进行比较,如果新值和旧值是一样的，则不进行实际的更新
    console.log(result);
});

User.remove({ name: 'zfpx11' }, { justOne: true }, function (err, result) {
    //{ ok: 1, n: 2 } ok=1表示成功，n=2表示实际删除的记录数为2
    console.log(result);
});

let users = [];
for (let i = 1; i <= 10; i++) {
    users.push({ name: `zfpx${i}`, age: i });
}
User.create(users, function (err, docs) {
    console.log(docs)
});


User.find({}, { name: 1, _id: 0 }, function (err, docs) {
    console.log(docs);
});
 */
let pageNum = 3;
let pageSize = 3;
//当你在调用exec方法的时候才真正开始执行查询
User.find({}).sort({ age: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize).exec(function (err, docs) {
    console.log(docs);
});