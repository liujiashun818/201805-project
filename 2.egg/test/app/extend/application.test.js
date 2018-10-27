let {app,assert} = require('egg-mock/bootstrap');
describe('测试application的扩展功能', function(){
    it('测试缓存功能是否正常',async function(){
       app.cache.set('name','zfpx');
       assert(app.cache.get('name') =='zfpx');
    });
});