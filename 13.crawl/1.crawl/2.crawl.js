const request = require('request');
const fs = require('fs');
let url = 'https://juejin.im/welcome/frontend';
request(url, function (err, response, body) {
    //console.log(body);
    let regex = /st:name="title" class="title" data-v-\w+>(.+?)<\/a>/g;
    let titles = [];
    body.replace(regex, function (matched, title) {
        titles.push(title);
    });
    console.log(titles);
    //fs.writeFileSync('frontend.html', body);
});
