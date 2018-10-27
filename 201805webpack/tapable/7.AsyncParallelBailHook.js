//let {AsyncParallelHook} = require('tapable');
class AsyncParallelBailHook{
    constructor(){
        this.tasks = [];
    }
    tapPromise(name,task){
        this.tasks.push(task);
    }
    promise(){
        return Promise.all(this.tasks.map(task=>task(...arguments)));
    }
}
//异步并行，当所有的任务都执行完毕之后执行最终回调
let hook = new AsyncParallelBailHook(['name']);
console.time('cost');
hook.tapPromise('1',function(name){
   return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000);
   });
});
hook.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            reject('2Wrong');
        },2000);
   });
});
hook.tapPromise('3',function(name,callback){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000);
   });
});
hook.promise('zfpx').then(function(data){
    console.timeEnd('cost');
},function(err){
    console.error(err);
    console.timeEnd('cost');
});