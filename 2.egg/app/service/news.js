let {Service} = require('egg');

class NewsService extends Service {
   async list(){
       let newsUrl = this.config.news.newsUrl;
       let result = await this.ctx.curl(newsUrl,{
           method:'GET',
           dataType:'json'
       });
       //data 是定死的，是响应体的意思
       let items = result.data.data;
       /*
         items.forEach(item=>{
           item.createAt = this.ctx.helper.fromNow(item.createAt);
       });
        */
       return items;
   }
}
module.exports = NewsService;