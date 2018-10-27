//读取标签数组
const request = require('request-promise');
const cheerio = require('cheerio');
//项目名 读取  标签
const debug = require('debug')('crawl:read:articles');
module.exports = async function (url) {
    let options = {
        url,
        transform: function (body) {
            return cheerio.load(body);//$
        }
    }
    let $ = await request(options);
    let articles = [];
    let as = $('a.title');
    for (let i = 0; i < as.length; i++) {
        if (i < 2) {
            let $this = $(as[i]);
            let href = $this.attr('href');
            let title = $this.text();
            let id = href.match(/\/(post|entry)\/(\w+)/)[2];
            let { content, tags } = await readArticle(id, `https://juejin.im${href}`);
            articles.push({
                id,
                title,
                href,
                content,
                tags
            });
            debug(`读取文章:${title}`);
        }
    }
    return articles;
}
async function readArticle(id, url) {
    let options = {
        url,
        transform: function (body) {
            return cheerio.load(body);//$
        }
    }
    let $ = await request(options);
    let content = $('.article-content').first().html();
    let tags = [];
    $('.tag-title').each(function (index, item) {
        let $this = $(item);
        tags.push($this.text());
    });
    return {
        content,
        tags
    }
}

/* let uri = 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF';*/
//module.exports('https://juejin.im/tag/%E5%89%8D%E7%AB%AF').then(function (articles) {
//    console.log(articles);
//});