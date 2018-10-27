const { Controller } = require('egg');
class HomeController extends Controller {
    //ctx=request+response
    //ctx上下文对象 它里面有很多属性和方法 .request .response
    //ctx.body = ctx.response.body
    async index() {
        this.ctx.body = 'hello world';
    }
}
module.exports = HomeController;