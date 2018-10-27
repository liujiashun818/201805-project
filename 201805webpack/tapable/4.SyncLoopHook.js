//let {SyncLoopHook} = require('tapable');
class SyncLoopHook{
    constructor(argNames){
        this.argNames = argNames;
        this.tasks = [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    call(){
        let args = Array.prototype.slice.call(arguments,0,this.argNames.length);
        this.tasks.forEach(task=>{
            let ret;
            do{
                ret = task(...args);
            }while(ret);
        });
    }
}
// tap注册监听=on call触发事件=emit
let queue = new SyncLoopHook(['name','age']);
//第一个参数没有实际作用，只是用来给插件起个名字
let counter = 0;
queue.tap('1',function(name,age){
    console.log(1,name,age);
    if(++counter >=3){
        
    }else{
        return true;
    }
});
queue.call('zfpx',9);