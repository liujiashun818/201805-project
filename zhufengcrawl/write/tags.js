let { query } = require('../db');
const debug = require('debug')('crawl:write:tags');
module.exports = async function (tags) {
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];//应该判断一下，数据库里有没有这个标签，如果有的话，就更新，没有就插入
        debug(`写入标签:${tag.name}`);
        let oldTags = await query(`SELECT 1 FROM tag WHERE name = ? limit 1`, [tag.name]);
        if (oldTags && oldTags.length > 0) {
            await query(`UPDATE tag SET image=?,subscribe=?,article=?,url=? WHERE name=?`,
                [tag.image, tag.subscribe, tag.article, tag.url, tag.name]);
        } else {
            await query(`INSERT INTO tag(name,image,subscribe,article,url) VALUES(?,?,?,?,?)`,
                [tag.name, tag.image, tag.subscribe, tag.article, tag.url]);
        }
    }
}