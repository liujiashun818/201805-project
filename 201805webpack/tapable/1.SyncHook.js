//let {SyncHook} = require('tapable');
class SyncHook{
    constructor(argNames){
        this.argNames = argNames;
        this.tasks = [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    call(){
        let args = Array.prototype.slice.call(arguments,0,this.argNames.length);
        this.tasks.forEach(task=>task(...args));
    }
}
// tap注册监听=on call触发事件=emit
let queue = new SyncHook(['name','age']);
//第一个参数没有实际作用，只是用来给插件起个名字
queue.tap('1',function(name,age){
    console.log(1,name,age);
});
queue.tap('2',function(name){
    console.log(2,name);
});
queue.tap('3',function(name){
    console.log(3,name);
});
queue.call('zfpx',9,0);