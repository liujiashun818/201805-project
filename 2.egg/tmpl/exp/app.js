let express = require('express');
let path = require('path');
let app = express();
let nunjucks = require('nunjucks');
nunjucks.configure(path.resolve(__dirname, 'views'), {
    autoescape: true,
    express: app
});
app.get('/', function (req, res) {
    res.render('index.html', { name: 'zfpx' });
});
app.listen(8080);