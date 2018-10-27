import * as registerService from '../services/register';
import router from 'umi/router';
export default {

    namespace: 'register',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        *getCaptcha({ payload }, { call, put }) {
            yield call(registerService.getCaptcha, payload);
        },
        *submit({ payload }, { call, put }) {
            let result = yield call(registerService.submit, payload);//{ code: 0, data: user }
            if (result.code == 0) {
                router.push('/User/Login');
            }
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
