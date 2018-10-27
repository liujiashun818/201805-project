const request = require('request');
const fs = require('fs');
let url = 'https://juejin.im/welcome/frontend';
/* request(url, function (err, response, body) {
    //console.log(body);
    let regex = /st:name="title" class="title" data-v-\w+>(.+?)<\/a>/g;
    let titles = [];
    body.replace(regex, function (matched, title) {
        titles.push(title);
    });
    console.log(titles);
    //fs.writeFileSync('frontend.html', body);
}); */


let axios = require('axios');
(async function () {
    let { headers, data } = await axios.get(url);
    let regex = /st:name="title" class="title" data-v-\w+>(.+?)<\/a>/g;
    //把普通的字符串转正则 1.把变化的字符串替换成通配符 2.把需要转义的字符进行转义
    let regexp = /st:name="title" class="title" data-v-\w+>.+?<\/a>/;
    let titles = [];
    data.replace(regex, function (matched, title) {
        titles.push(title);
    });
    console.log(titles);
})()