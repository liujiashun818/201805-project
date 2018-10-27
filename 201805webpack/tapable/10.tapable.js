const {Tapable,SyncHook} = require("tapable");
const t = new Tapable();
t.hooks = {
    userHook: new SyncHook(),
    customerHook:new SyncHook()
};
let called = 0;
//plugin是旧的写法，已经废弃，相当于on tap
t.plugin("userHook", () => called++);
t.hooks.userHook.call();
console.log(called);
t.plugin("customerHook", () => called += 10);
t.hooks.customerHook.call();
console.log(called);