import { take, takeEvery, put, call, all } from 'redux-saga/effects';
import * as types from './store/action-types';
//worker saga 工作saga,也就是真正干活的saga
const delay = (ms) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(2);
        }, ms);
    });
}

export function* counter() {
    //call第一个参数是方法，第二个之后的是传入此方法的参数
    yield call(delay, 1000);
    //yield delay(1000);
    //在此处我要实现一秒后加一的操作
    //相当于dispatch(action) put就是直接派发动作
    yield put({ type: types.ADD });
}
//这是一个监听者，就是用来监听动作的
export function* counterWatcher() {
    console.log('counterWatcherbefore');
    //我在监听一次ASYNC_ADD动作
    //当监听到这个动作发生的时候，对把这个动作赋给前面的action,然后向下执行
    //let action = yield take(types.ASYNC_ADD);
    //take(types.ASYNC_ADD);=> {type:'take',actionType:ASYNC_ADD}
    //console.log('action1', action);
    //take(types.ASYNC_ADD);=> {type:'take',actionType:ASYNC_ADD}
    //console.log('action1', action);
    //监听每一次的ASYNC_ADD动作，然后当这个动作发生的时候执行counter方法
    //而且takeEvery不会阻塞当前generator代码的执行
    yield takeEvery(types.ASYNC_ADD, counter);
    console.log('counterWatcherafter');
}
export function* logger(action) {
    console.log('logger', action);
}
export function* loggerWatcher() {
    yield takeEvery(types.ASYNC_ADD, logger);
}
export default function* () {
    //all 类似于promise.all
    yield all([counterWatcher(), loggerWatcher()]);
}
//yield 后面的东西有很多种类型，比如generator 比如说iterator 比如说 普通 对象
//在中间件内部收到yield的值之后，它会来决定 如何去处理

