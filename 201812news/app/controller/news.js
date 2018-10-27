const { Controller } = require('egg');
class NewsControler extends Controller {
    //一般来说控制器只会处理请求的参数，和返回响应
    async index() {
        let { ctx } = this;
        //后端渲染
        let news = await this.ctx.service.news.fetch();
        await ctx.render('news.ejs', { news });
    }
}
module.exports = NewsControler;