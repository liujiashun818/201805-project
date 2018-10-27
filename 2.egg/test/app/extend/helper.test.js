let {app,assert} = require('egg-mock/bootstrap');
//babel-preset redux-saga/effects
describe('测试helper的扩展功能', function(){
    it('测试sum是否正常',async function(){
        let ctx = app.mockContext();
       assert(ctx.helper.sum(1,2)  == 3);
    });
});