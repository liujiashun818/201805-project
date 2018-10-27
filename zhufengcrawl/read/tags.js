//读取标签数组
const request = require('request-promise');
const cheerio = require('cheerio');
//项目名 读取  标签
const debug = require('debug')('crawl:read:tags');

module.exports = async function (url) {
    let options = {
        url,
        transform: function (body) {
            return cheerio.load(body);//$
        }
    }
    let $ = await request(options);
    let tags = [];
    $('div.tag').each(function (index, item) {
        if (index < 3) {
            let $this = $(item);
            let url = $this.find('.info-box').children('a').first().attr('href');
            let name = $this.find('.title').first().text();
            let image = $this.find('.thumb').first().data('src');
            let subscribe = $this.find('.subscribe').first().text();
            let article = $this.find('.article').first().text();
            tags.push({
                name,
                url: `https://juejin.im${url}`,
                image,
                subscribe: subscribe.match(/(\d+)/)[1],
                article: article.match(/(\d+)/)[1]
            });
            debug(`读取标签:${name}`);
        }
    });
    return tags;
}
/* let uri = 'https://juejin.im/subscribe/all';
module.exports(uri).then(tags => {
    console.log(tags);
});  */