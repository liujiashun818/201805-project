module.exports = (options, app) => {
    return async function (ctx, next) {
        //User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36
        let userAgent = ctx.get('user-agent');// 得到的就是请求头中的User-Agent
        let matched = options.uas.some(item => item.test(userAgent));
        if (matched) {
            ctx.status = 403;//forbidden
            ctx.body = '无权访问';
        } else {
            await next();
        }
    }
}