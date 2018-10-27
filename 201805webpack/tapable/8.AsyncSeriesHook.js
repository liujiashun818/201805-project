//let {AsyncSeriesHook} = require('tapable');
class AsyncSeriesHook{
    constructor(){
        this.tasks = [];
    }
    tapPromise(name,task){
        this.tasks.push(task);
    }
    promise(){
        let args = Array.from(arguments);
        let [first,...others] = this.tasks;
        return others.reduce((a,b)=>{
            return a.then(()=>b(...args));
        },first(...args));
    }
}
//异步串行，先执行第一个，第一个完成后再执行第二个
let hook = new AsyncSeriesHook(['name']);
console.time('cost');
hook.tapPromise('1',function(name){
   return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1,name);
            resolve();
        },1000);
   });
});
hook.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2,name);
            resolve();
        },2000);
   });
});
hook.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3,name);
            resolve();
        },3000);
   });
});
hook.promise('zfpx').then(function(data){
    console.timeEnd('cost');
});