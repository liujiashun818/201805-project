import * as roomService from '../services/room';
import router from 'umi/router';
export default {

    namespace: 'room',

    state: {
        list: [] //房间列表
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname == '/Room') {
                    let userStr = window.sessionStorage.getItem('user');
                    if (userStr) {
                        let user = JSON.parse(userStr);
                        dispatch({ type: 'login/save', payload: { user } });
                        dispatch({ type: 'getRooms' });
                    } else {
                        router.push('/User/Login');
                    }

                }
            });
        },
    },

    effects: {
        *getRooms({ payload }, { call, put }) {
            let { code, data } = yield call(roomService.getRooms);// {code:0,data:list}
            if (code == 0) {
                yield put({ type: 'save', payload: { list: data } });
            }
        },
        *createRoom({ payload }, { call, put }) {
            yield call(roomService.createRoom, payload);
            yield put({ type: 'getRooms' });
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
