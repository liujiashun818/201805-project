import * as loginService from '../services/login';
import * as registerService from '../services/register';
import router from 'umi/router';
export default {

    namespace: 'login',

    state: {
        user: null //login/user里面放的是当前的登录的用户
    },

    subscriptions: {
        setup({ dispatch, history }) { },
    },

    effects: {
        *getCaptcha({ payload }, { call, put }) {
            yield call(registerService.getCaptcha, payload);
        },
        *submit({ payload }, { call, put }) {
            let result = yield call(loginService.submit, payload);//{ code: 0, data: user }
            if (result.code == 0) {
                let user = result.data;
                //往 sessionStore里存和一份
                window.sessionStorage.setItem('user', JSON.stringify(user));
                //还会在仓库里存一份
                yield put({ type: 'save', payload: { user } });
                router.push('/Room');
            }
        },
        *changeAvatar({ payload }, { call, put }) {
            let result = yield call(loginService.changeAvatar, payload);
            if (result.code == 0) {
                let user = result.data;
                //往 sessionStore里存和一份
                window.sessionStorage.setItem('user', JSON.stringify(user));
                //还会在仓库里存一份
                yield put({ type: 'save', payload: { user } });
            }
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
