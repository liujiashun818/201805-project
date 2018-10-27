//所有的effect都是简单对象
export function take(actionType) {
    return {
        type: 'take',
        actionType
    }
}
export function put(action) {
    return {
        type: 'put',
        action
    }
}
export function call(fn, ...args) {
    return {
        type: 'call',
        fn,
        args
    }
}
export function all(tasks) {
    return {
        type: 'all',
        tasks
    }
}
//fork 在多进程 的时候，意思就是开启一个子进程 。这个子进程就跟主进程没有关系 。
export function fork(fn) {
    return {
        type: 'fork',
        fn
    }
}

export function* takeEvery(actionType, task) {
    yield fork(function* () {
        while (true) {
            const action = yield take(actionType);
            yield task(action);
        }
    });

}