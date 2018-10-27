let nunjucks = require('nunjucks');
const path = require('path');
//配置模板文件的根目录 
nunjucks.configure(path.resolve(__dirname, 'view'), {
  autoescape: true
});
let ret = nunjucks.render('index.html', { name: '<h1>hello</h1>' });
console.log(ret);

