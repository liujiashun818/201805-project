import * as service from '../services/role';
import { PAGE_SIZE } from '../constants';
const ENTITY = 'role';
/**
 * [
{
name:'权限管理',
id:1,
children:[
 {id:2,name:'用户管理'},
 {id:3,name:'资源管理'}
 {id:4,name:'角色管理'}
]
}
]
 */
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
        selectedRows: [],
        setResourceVisible: false,//设置权限的模态窗口是否显示
        checkedKeys: [],//哪些权限被选中了
        resources: [],//资源,是一个数组，里面第一层放着顶层资源
        setUserVisible: false,//窗口是否显示
        targetKeys: [],//选中的用户
        users: [] //所有的用户
    },

    subscriptions: {
        setup({ dispatch, history }) {
            // 通过地址来分页   /admin/user?pageNum=2
            history.listen(({ pathname, query }) => {
                if (pathname === `/admin/${ENTITY}`) {
                    dispatch({ type: 'fetch', payload: query });
                    dispatch({ type: 'getResource' });
                    dispatch({ type: 'getUser' });
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
        },
        *getResource({ }, { call, put }) {
            let resources = yield call(service.getResource);
            yield put({ type: 'save', payload: { resources } });
        },
        *getUser({ }, { call, put }) {
            let users = yield call(service.getUser);
            yield put({ type: 'save', payload: { users } });
        },
        *setResource({ }, { call, put, select }) {
            let record = yield select(state => state.role.record);
            let checkedKeys = yield select(state => state.role.checkedKeys);
            yield call(service.setResource, {
                roleId: record.id,
                resourceIds: checkedKeys
            });
            yield put({ type: 'save', payload: { setResourceVisible: false, selectedRowKeys: [], selectedRows: [] } });
            yield put({ type: 'fetch', payload: {} });
        },
        *setUser({ }, { call, put, select }) {
            let record = yield select(state => state.role.record);
            let targetKeys = yield select(state => state.role.targetKeys);
            yield call(service.setUser, {
                roleId: record.id,
                userIds: targetKeys
            });
            yield put({ type: 'save', payload: { setUserVisible: false, selectedRowKeys: [], selectedRows: [] } });
            yield put({ type: 'fetch', payload: {} });
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },

};
