//let {SyncWaterfallHook} = require('tapable');
class SyncWaterfallHook{
    constructor(argNames){
        this.argNames = argNames;
        this.tasks = [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    call(){
        let args = Array.prototype.slice.call(arguments,0,this.argNames.length);
       /*  let ret;
        for(let i=0;i<this.tasks.length;i++){
            let task = this.tasks[i];
            if(i==0){
                ret = task(...args);
            }else{
                ret = task(ret);
            }
        }
        return ret; */
       //let [first,...others] = this.tasks;
       //return others.reduce((a,b)=>b(a),first(...args));

        let reducers =  this.tasks.reduce((a,b)=>(...args)=>b(a(...args)));
        reducers(...args);
    }
}
// tap注册监听=on call触发事件=emit
let queue = new SyncWaterfallHook(['a','b']);
//第一个参数没有实际作用，只是用来给插件起个名字
queue.tap('1',function(a,b){
    console.log(1,a,b);
    return a+b;
});
queue.tap('2',function(data){
    console.log(2,data);
    return data+2;
});
queue.tap('3',function(data){
    console.log(3,data);
    return data+3;
});
let ret = queue.call(50,50);
console.log(ret);