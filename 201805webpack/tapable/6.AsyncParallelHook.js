//let {AsyncParallelHook} = require('tapable');
class AsyncParallelHook{
    constructor(){
        this.tasks = [];
    }
    tapPromise(name,task){
        this.tasks.push(task);
    }
    promise(){
        return new Promise((resolve,reject)=>{
            let promises = this.tasks.map(task=>task(...arguments));
            let counter=0,total=this.tasks.length;
            let  done = ()=>{
                if(++counter == total){
                    resolve();
                }
            }
            promises.forEach(promise=>promise.then(done,done));

        });
    }
}
//异步并行，当所有的任务都执行完毕之后执行最终回调
let hook = new AsyncParallelHook(['name']);
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
            reject();
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
});