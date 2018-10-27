let { Controller } = require('egg');
class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi egg';
    }
    async post(){
        let body = this.ctx.request.body;
        this.ctx.body = body;
    }
}
module.exports = HomeController;