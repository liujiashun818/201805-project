//let {SyncBailHook} = require('tapable');
class SyncBailHook{
    constructor(argNames){
        this.argNames = argNames;
        this.tasks = [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    call(){
        let args = Array.prototype.slice.call(arguments,0,this.argNames.length);
        for(let i=0;i<this.tasks.length;i++){
            let task = this.tasks[i];
            let ret = task(...args);
            if(ret){
                return ;
            }
        }
    }
}
// tap注册监听=on call触发事件=emit
let queue = new SyncBailHook(['name','age']);
//第一个参数没有实际作用，只是用来给插件起个名字
queue.tap('1',function(name,age){
    console.log(1,name,age);
});
queue.tap('2',function(name){
    console.log(2,name);
    return '2Wrong';
});
queue.tap('3',function(name){
    console.log(3,name);
});
queue.call('zfpx',9,0);