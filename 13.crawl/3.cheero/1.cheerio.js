const cheerio = require('cheerio');
let html = (
    `
      <h1 class="title">hello</h1>
    `
);
let $ = cheerio.load(html);
$('h1.title').text('world');
$('h1.title').addClass('title2');
console.log($.html());