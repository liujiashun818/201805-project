exports.keys = 'zfpx';//用来加密cookie的，防止修改cookie
//只有在此处配置的中间件才会起作用
exports.middleware = [
    'time',
    'ua'
]
exports.time = {
    prefix: '本次请求一共花了 '
}
exports.ua = {
    uas: []
}
exports.view = {
    defaultViewEngine: 'ejs',//默认的渲染引擎
    //设置针对什么类型的文件用什么模板引擎来进行渲染
    mapping: {
        //如果渲染的是.ejs的模板文件的话，用ejs模板引擎来进行渲染
        '.ejs': 'ejs'
    }
}
exports.news = {
    url: 'https://baijia.baidu.com'
}