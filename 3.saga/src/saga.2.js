import { take, put, takeEvery, call, all } from './redux-saga/effects';
import * as types from './store/action-types';
const delay = ms => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(5);
        }, ms);
    })
}
/* export default function* () {
    let action = yield take(types.ASYNC_ADD);
    yield put({ type: types.ADD });
} */
export function* counter() {
    let amount = yield call(delay, 1000);
    yield put({ type: types.ADD, payload: amount });
}
/**
 * 1. 监听每一次的动作
 * 2. 不会阻塞当前的 generator
 */
export function* counterWatcher() {
    // {type:types.ASYNC_ADD,amount:3}
    yield takeEvery(types.ASYNC_ADD, counter);
}
export function* logger(action) {
    console.log(action);
}
export function* loggerWatcher() {
    yield takeEvery(types.ASYNC_ADD, logger);
}

export default function* () {
    yield all([loggerWatcher(), counterWatcher()]);
}

