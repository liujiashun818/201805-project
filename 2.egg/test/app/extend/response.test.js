let {app,assert} = require('egg-mock/bootstrap');
describe('测试response的扩展功能', function(){
    it('测试isOk是否正常',async function(){
        const ctx = app.mockContext();
        ctx.status = 200;
        assert(ctx.response.isOk);
    });
});