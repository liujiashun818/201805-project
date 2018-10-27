module.exports = (options,app)=>{
    //判断一下来访问的客户端是不是某种类型的客户端，如果是的话，则不允许其访问
    return async function(ctx,next){
        //获取请求头 ctx.get('user-agent'); ctx.request.headers['user-agent'];
        let userAgent = ctx.get('user-agent');
        ctx.logger.error(userAgent);
        //匹配某些元素
        let flag = options.ua.some(ua=>ua.test(userAgent));
        if(flag){
            ctx.status = 403;
            ctx.body = '你无权访问';
        }else{
            await next();
        }
    }
 }