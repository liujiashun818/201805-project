import * as service from '../services/user';
import { PAGE_SIZE } from '../constants';
const ENTITY = 'user';
export default {

    namespace: ENTITY,

    state: {
        isCreate: true,
        list: [],
        pageNum: 1,
        total: 0,
        where: {},
        editVisible: false,//是否显示编辑窗口
        record: { gender: 1 },//代表当前正在编辑的对象
        selectedRowKeys: [],
        selectedRows: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            // 通过地址来分页   /admin/user?pageNum=2
            history.listen(({ pathname, query }) => {
                if (pathname === `/admin/${ENTITY}`) {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },

    effects: {
        *fetch({ payload: { pageNum, where } }, { call, put, select }) {
            if (!pageNum) {
                pageNum = yield select(state => state[ENTITY].pageNum);
            }
            if (!where) {
                where = yield select(state => state[ENTITY].where);
            }
            let { list, total } = yield call(service.list, pageNum, PAGE_SIZE, where);
            yield put({ type: 'save', payload: { list, total, pageNum: parseInt(pageNum), where } });
        },
        *add({ payload }, { call, put }) {
            yield call(service.add, payload);
            yield put({ type: 'fetch', payload: {} });
            yield put({ type: 'save', payload: { editVisible: false } });
        },
        *update({ payload }, { call, put }) {
            yield call(service.update, payload);
            yield put({ type: 'fetch', payload: {} });
            yield put({ type: 'save', payload: { editVisible: false } });
        },
        *del({ payload }, { call, put }) {
            yield call(service.del, payload);
            yield put({ type: 'fetch', payload: {} });
        },
        *delAll({ payload }, { call, put }) {
            yield call(service.delAll, payload);
            yield put({ type: 'fetch', payload: {} });
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },

};
