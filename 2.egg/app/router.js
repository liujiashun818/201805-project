// let app = express();  let app = new Koa();
// 代表应用对象
// koa-router router
module.exports = app => {
    //controller是一个控制器对象 ,有属性和值属性就是app/controller下面的模块的名字，值是此模块导出的类的一个实例
    let { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/post', controller.home.post);
    router.get('/news', controller.news.index);
}