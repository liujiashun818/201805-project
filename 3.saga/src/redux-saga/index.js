
function createSagaMiddleware() {

    function sagaMiddleware({ dispatch, getState }) {
        function createEventEmitter() {
            //key是动作类型，值是一些回调函数 next
            let listeners = {};
            function once(actionType, cb) {
                listeners[actionType] = listeners[actionType] ? [...listeners[actionType], cb] : [cb];
            }
            function emit(action) {
                let cbs = listeners[action.type];
                //如果说此动作类型有对应的监听函数
                if (cbs) {
                    //因为是执行一次就销毁，所以先删除此属性
                    delete listeners[action.type];
                    //依次执行回调函数
                    cbs.forEach(cb => cb(action));
                }
            }
            return { once, emit };
        }
        let eventEmitter = createEventEmitter();
        function after(max, cb) {
            let count = 0;
            return function () {
                if (++count == max) {
                    cb();
                }
            }
        }
        //在run方法里要执行运行generator
        function run(generator, finalCallback) {
            //判断如果参数是一个生成器，那么要执行它得到迭代器，如果参数是一个迭代器了
            let it = typeof generator == 'function' ? generator() : generator;
            function next(action) {
                let { value: effect, done } = it.next(action);//value take done false
                if (!done && effect) {
                    if (effect[Symbol.iterator]) {
                        run(effect);
                        next(action);
                    } else {
                        switch (effect.type) {
                            //take的意思就是说要让此generator卡在这里，等待此动作类型发生的时候才会向下执行
                            case 'take':
                                //channel 约等于 evertEmiiter
                                eventEmitter.once(effect.actionType, next);
                                break;
                            case 'put':
                                //如果effect是put的话，我们要派发一个action
                                dispatch(effect.action);
                                break;
                            case 'call':
                                effect.fn(...effect.args).then(next);
                                break;
                            case 'fork':
                                run(effect.fn);
                                next();
                                break;
                            case 'all':
                                let done = after(effect.tasks.length, next);
                                effect.tasks.forEach(task => run(task, done));
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    finalCallback && finalCallback();
                }
            }
            next();
        }
        sagaMiddleware.run = run;
        return function (next) {//next调用下一个中间件
            return function (action) {
                //当中间件接收到action之后，要发射事件
                eventEmitter.emit(action);
                next(action);
            }
        }
    }
    return sagaMiddleware;
}

export default createSagaMiddleware;