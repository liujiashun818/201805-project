const { Service } = require('egg');
class NewsService extends Service {
    //eggjs里内置 一个方法，用来读取远程 接口数据
    //resut = {headers,data}
    //config 属性是this 的属性
    async fetch() {
        //console.log(this.ctx.helper)
        let { data } = await this.ctx.curl(this.config.news.url);
        data = data.toString();
        let news = [];
        let reg = /<a href="(\/s\?id=[^"]+)".+>([\s\S]+?)<\/a>/g;
        data.replace(reg, (matched, url, title) => {
            if (!title.includes('img') && !title.includes('查看详情'))
                news.push({
                    title,
                    url: 'https://baijia.baidu.com' + url,
                    time: new Date()
                    //time: this.ctx.helper.relative(new Date())
                });
        });
        return news;
    }
}
module.exports = NewsService;