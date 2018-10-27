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
    email: String
}));
let Article = conn.model('Article', new Schema({
    title: String,
    content: String,// xxx.val('xx');
    user: { type: ObjectId, ref: 'User' }//User是Model的名字 conn.model('User')
}));
//文章 objectId
/**

User.create({
    name: 'zfpx1',
    email: 'zfpx1@qq.com'
}).then(function (doc) {//user保存成功后的此文档对象
    return Article.create({
        title: '标题',
        content: '内容',
        user: doc._id
    });
}).then(function (article) {
    console.log(article);
});

Article.find({}, function (err, docs) {
    console.log(docs);
    docs.forEach(doc => {
          User.find({ _id: doc.user }, function (err, docs) {
             docs[0];
         }) 
        User.findById(doc.user, function (user) {
            doc.user = user;
        });
    });
});
*/
//populate填充,user 我让mongoose把user字段从一个字符串转成一个对象
Article.find().populate('user').exec(function (err, docs) {
    console.log(docs);
});