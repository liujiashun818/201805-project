let {app,assert} = require('egg-mock/bootstrap');
describe('测试request的扩展功能', function(){
    it('测试isChrome是否正常',async function(){
      //ctx.get('key') = ctx.request.headers['key'];
      let ctx =  app.mockContext({
           headers:{
               'user-agent':'i love chrome very much'
           }
       });
       assert(ctx.request.isChrome);
    });
});