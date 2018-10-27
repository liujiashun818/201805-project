import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import { createHashHistory } from 'history';
export {
    connect
};
export default function () {
    let app = {
        _model: [],
        model,
        _router: null,
        router,
        start
    }
    //每当调用一次model方法，会把模型参数传递给app._model，添到数组里去
    function model(m) {
        app._model.push(m);
    }
    function router(fn) {
        app._router = fn;
    }

    function start(selector) {
        let reducers = app._model.reduce((memo, m) => {
            //key是一个命名空间的名字，也对应于合并后的状态的名字
            memo[m.namespace] = (state = m.state, action) => {
                let reducer = m.reducers[action.type];
                if (reducer) {
                    return reducer(state, action);
                }
                return state;
            }
            return memo;
        }, {});
        //合并后的reducers
        let rootReducer = combineReducers(reducers);
        //处理saga 把effects对象封装成一个saga
        let sagaMiddleware = createSagaMiddleware();
        let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
        function* rootSaga() {
            for (let i = 0; i < app._model.length; i++) {
                let effects = app._model[i].effects;
                for (let effect in effects) {
                    yield takeEvery(effect, effects[effect], { put, call });
                }
            }
        }
        sagaMiddleware.run(rootSaga);
        //此处的app_router是一个函数式组件
        let history = createHashHistory();
        let App = app._router({ app, history });
        ReactDOM.render(<Provider store={store}>
            {App}
        </Provider>, document.querySelector(selector));
    }
    return app;
}

// export function take(actionType) {
//     return {
//         type: 'take',
//         actionType
//     }
// }

// export function fork(task) {
//     return {
//         type: 'fork',
//         task
//     }
// }

// export function* takeEvery(actionType, task, ...extra) {
//     yield fork(function* () {
//         while (true) {
//             let action = yield take(actionType);
//             yield task(...extra, action);
//         }
//     });
// }