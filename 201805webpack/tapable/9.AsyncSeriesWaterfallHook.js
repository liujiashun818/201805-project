//let {AsyncSeriesWaterfallHook} = require('tapable');
class AsyncSeriesWaterfallHook{
    constructor(){
        this.tasks = [];
    }
    tapPromise(name,task){
        this.tasks.push(task);
    }
    promise(){
        let [first,...others] = this.tasks;
        return others.reduce((a,b)=>{
            return a.then(b);
        },first(...arguments));
    }
}
//promise.then(data=>console.log(data))
//异步串行，先执行第一个，第一个完成后再执行第二个
let hook = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
hook.tapPromise('1',function(name){
   return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1,name);
            resolve('a');
        },1000);
   });
});
hook.tapPromise('2',function(data){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2,data);
            resolve('b');
        },2000);
   });
});
hook.tapPromise('3',function(data){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3,data);
            resolve('c');
        },3000);
   });
});
hook.promise('zfpx').then(function(data){
    console.log('data',data);
    console.timeEnd('cost');
});