let { Controller } = require('egg');
//app ctx request response config logger 
class NewsController extends Controller {
    async index() {
        this.ctx.logger.info('app.config.env',this.app.config.env);
        let items = await this.service.news.list();
        await this.ctx.render('news',{items});
    }
}
module.exports = NewsController;