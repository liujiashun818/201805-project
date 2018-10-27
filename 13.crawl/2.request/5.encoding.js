let request = require('request');
let iconv = require('iconv-lite');
let url = 'http://top.baidu.com/buzz?b=7&c=10&fr=topcategory_c10';
let cheerio = require('cheerio');
let options = {
    url,
    encoding: null//告诉request不要帮我把buffer 转成字符串
}
request(options, function (err, response, body) {
    let contentType = response.headers['content-type'];//charset=gb2312
    let encoding;
    if (contentType.lastIndexOf('=') > 0) {
        encoding = contentType.slice(contentType.lastIndexOf('=') + 1);
    }
    console.log('1', encoding);
    if (!encoding) {
        let b = body.toString();
        let result = b.match(/charset=(.+?)"/);
        if (result) {
            encoding = result[1];
        }
    }
    console.log('2', encoding);
    if (!encoding)
        encoding = 'utf8';
    console.log('3', encoding);
    body = iconv.decode(body, encoding);
    //console.log(body);//gb2312  gbk  gb18030
    let $ = cheerio.load(body);
    let titles = []
    //console.log(Object.prototype.toString.call($('a.list-title')));
    $('a.list-title').each((index, item) => {
        let $this = $(item);
        //console.log($this.text());
        titles.push($this.text());
    });
    console.log(titles);
});