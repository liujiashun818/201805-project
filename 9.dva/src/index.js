import React, { Fragment } from 'react';
import dva from './dva';
import Counter from './App';
import { Router, Route } from 'dva/router';
import keymaster from 'keymaster';
//dva是一个函数，通过执行它可以拿到一个app对象
let app = dva();
const delay = ms => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
}
//一个模板就是一个状态，然后把reducer和状态 写在一起了，
//添加一个模块
app.model({
    //命名空间。因为一个应用会有很多个模型,每个模型要有一个名字
    namespace: 'counter',
    //此命名空间的默认状态
    state: { current: 0 },
    //它是用来接收action,修改仓库状态的
    reducers: {
        //reducer接收老状态和动作，返回新状态
        //sate老状态 action={type:'add'}
        add(state, action) {
            return { current: state.current + 1 };
        },
        minus(state, action) {
            return { current: state.current - 1 };
        }
    },
    //它是用来执行副作用的，比如说异步操作，调用api接口
    effects: {
        *add({ put, call }, action) {
            yield call(delay, 1000);
            yield put({ type: 'minus' });
        }
    }
});
const Home = () => <div>Home</div>
//参数是一个函数，此应用本身就是要渲染函数的返回值
app.router(({ history, app }) => (
    <Router history={history}>
        <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
        </Fragment>
    </Router>
));
//本质是启动应用，就是通过app.router获取组件，并且通过ReactDOM渲染到容器内容
app.start('#root');


//app.router app.start() app.model
//dav 就是基于react+redux最佳实践
/**
let finalReducecer = combineReducers({
    counter1: counter1Reducer,
    counter2: counter2Reducer
});
//state是合并后的状态,这个状态是finalReducecer计算得到的 
let totalState = {
    counter1: { number: 0 },
    counter2: { number: 0 }
}
**/