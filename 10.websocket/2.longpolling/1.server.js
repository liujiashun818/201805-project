let express = require('express');
let app = express();
app.use(express.static(__dirname));
/* app.get('/clock', function (req, res) {
    //我要等待数据返回，如果有新数据，就返回，否则就先挂着不返回
    //当时间到秒数是5的整数 的时候才返回
    let timer = setInterval(function () {
        let date = new Date();
        if (date.getSeconds() % 5 == 0) {
            res.send(date.toLocaleTimeString());
            clearInterval(timer);
        }
    }, 1000);
}); */
/**
 * 每100毫秒能跑一个来回，那么一秒就要有10个来回
 * 在些时候，比如说股票交易系统
 */
app.get('/clock', function (req, res) {
    res.send(new Date().toLocaleTimeString());
});
app.listen(8080);