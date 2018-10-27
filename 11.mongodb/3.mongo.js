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
let User = conn.model('User', new Schema({
    name: String,
    email: { type: String, required: false }
}));
//你可以new一个模型，从而创建一个实体，实体代表一个对象，或者一个文档
//保存的时候字段保存取的是传入和对象参数属性集合和定义的Schema 属性的集合的交集
let user1 = new User({
    name: 'zfpx500',
    age: 500
});
//entity核心方法只有一个save
user1.save(function (err, doc) {
    //ValidatorError: Path `email` is required.
    console.log(err);
    console.log(doc);
    doc.name = 'zfpx500';
    doc.remove(function (err, doc) {
        console.log(err);
        console.log(doc);
    });
    /* doc.save(function (err, doc) {
        console.log(err);
        console.log(doc);
    }); */
});