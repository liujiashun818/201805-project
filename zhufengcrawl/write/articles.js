let { query } = require('../db');
const debug = require('debug')('crawl:write:articles');
const mail = require('../mail');
module.exports = async function (articles) {
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];//应该判断一下，数据库里有没有这个标签，如果有的话，就更新，没有就插入
        debug(`写入文章:${article.title}`);
        let oldArticles = await query(`SELECT 1 FROM article WHERE id = ? limit 1`, [article.id]);
        if (oldArticles && oldArticles.length > 0) {
            console.log('更新', article.content);
            await query(`UPDATE article SET title=?,href=?,content=? WHERE id=?`,
                [article.title, article.href, article.content, article.id]);
        } else {
            await query(`INSERT INTO article(id,title,href,content) VALUES(?,?,?,?)`,
                [article.id, article.title, article.href, article.content]);
            // 根据标签找到标签对应的用户user_tag,找到他们的email
            mail(article.title);
        }
        //处理文章的标签的关系 
        await query(`DELETE FROM article_tag WHERE article_id=?`, [article.id]);
        let tags = article.tags;//["JS","前端"]
        let tagsWhere = "'" + tags.join("','") + "'";
        let tagIds = await query(`SELECT id FROM tag WHERE name in (${tagsWhere})`);
        for (let j = 0; j < tagIds.length; j++) {
            await query(`INSERT INTO article_tag(article_id,tag_id) VALUES(?,?)`, [article.id, tagIds[j].id]);
        }

    }
}