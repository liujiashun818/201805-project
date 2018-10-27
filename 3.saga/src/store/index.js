import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from '../redux-saga';
import rootSaga from '../saga';
let sagaMiddleware = createSagaMiddleware();
//此中间件可以监听动作，执行对应的逻辑
let store = createStore(reducer, applyMiddleware(sagaMiddleware));
//saga就是一个generator函数 启动saga 就是启动generator就是 执行generator .next()
// run的原理就是co的库
sagaMiddleware.run(rootSaga);
export default store;