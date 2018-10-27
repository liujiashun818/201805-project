 let {app,assert} = require('egg-mock/bootstrap');
/**
 * 测试异步模块有三种写法
 * 1. 用done 回调
 * 2. 返回promise
 * 3. 用async await 
 */
describe('测试home控制器', function(){
   /*  it('测试index1',async function(){
      await app.httpRequest()
         .get('/')
         .expect(200)
         .expect('hi egg');
    });
    it('测试index2', function(){
        return  app.httpRequest()
           .get('/')
           .expect(200)
           .expect('hi egg');
      });
    it('测试index3', function(done){
         app.httpRequest()
           .get('/')
           .expect(200,done)
           .expect('hi egg');
    }); */
    it('测试/post',async function(){
        let obj = {name:'zfpx'};
        await app.httpRequest()
           .post('/post')
           .type('form')//指定请求体的类型是表单格式 application/x-www-form-urlencoded
           .send(obj)
           .expect(200)
           .expect(obj);
      });
});