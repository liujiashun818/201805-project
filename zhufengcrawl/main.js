const readTags = require('./read/tags');
const readArticles = require('./read/articles');
const writeTags = require('./write/tags');
const writeArticles = require('./write/articles');
let entry = 'https://juejin.im/subscribe/all';
const debug = require('debug')('crawl:write:tags');
(async function () {
    debug(`开始执行任务`);
    let tags = await readTags(entry);
    await writeTags(tags);
    let allAriticles = {};
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        let articles = await readArticles(tag.url);
        articles.forEach(item => {
            allAriticles[item.id] = item;
        })
    }
    await writeArticles(Object.values(allAriticles));
    debug(`任务完毕`);
    process.exit(0);

})()