import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {routerMiddleware} from '@/react-router-redux';
import history from '@/history';
let routerWare = routerMiddleware(history);
//applyMiddelware是为想使用中间件，为什么要用中间件，是为了能让我们派发function
let store = createStore(reducers,applyMiddleware(promise,thunk,routerWare,logger));
window.store = store;
export default store;
// [promise,thunk,logger](dispatch)