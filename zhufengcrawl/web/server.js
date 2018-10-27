const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const { query } = require('../db');
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'zfpx'
}));
app.get('/', async function (req, res) {
    let { tagId } = req.query;
    let tags = await query(`SELECT * FROM tag`);
    if (!tagId) {
        tagId = tags[0].id;
    }
    let articles = await query(`SELECT article.* FROM article_tag INNER JOIN article ON article_tag.article_id=article.id WHERE  article_tag.tag_id=?`, [tagId]);
    res.render('index', { tags, articles });
});
app.get('/detail/:id', async function (req, res) {
    let id = req.params.id;
    let articles = await query(`SELECT * FROM article WHERE id=? limit 1`, [id]);
    res.render('detail', { article: articles[0] });
});
app.get('/login', async function (req, res) {
    res.render('login', {});
});
app.post('/login', async function (req, res) {
    let { email } = req.body;//{email}
    let oldUsers = await query(`SELECT * FROM user WHERE email=?`, [email]);
    if (oldUsers && oldUsers.length > 0) {
        let user = oldUsers[0];
        req.session.user = user;
    } else {
        let user = { email };
        let result = await query(`INSERT INTO user(email) VALUES(?)`, [email]);
        console.log('result', result);
        user.id = result.insertId;
        req.session.user = user;
    }
    res.redirect('/');
});
app.get('/subscribe', async function (req, res) {
    let tags = await query(`SELECT * FROM tag`);
    let user = req.session.user;
    let userTags = await query(`SELECT tag_id from user_tag WHERE user_id=?`, [user.id]);
    let tagIds = userTags.map(item => item.tag_id);
    tags.forEach(item => {
        item.subscribed = tagIds.indexOf(item.id) != -1;
    });
    res.render('subscribe', { tags });
});
app.post('/subscribe', async function (req, res) {
    let { subscribe } = req.body;//[]
    let user = req.session.user;
    await query(`DELETE FROM user_tag WHERE user_id`, [user.id]);
    for (let i = 0; i < subscribe.length; i++) {
        let tagId = parseInt(subscribe[i]);
        await query(`INSERT INTO user_tag(user_id,tag_id) VALUES(?,?)`, [user.id, tagId]);
    }
    res.redirect('/subscribe');
});
app.listen(3000);