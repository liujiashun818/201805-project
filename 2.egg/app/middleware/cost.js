module.exports = (options,app)=>{
   return async function(ctx,next){
     const start = Date.now();
     await next();
     console.log(options.name,' 本次请求花费了 ',Date.now() - start,' ms' );
   }
}