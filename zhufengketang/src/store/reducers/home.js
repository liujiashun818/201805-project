import * as types from '../action-types';
let initState = {
    category:'all', //这里存放的是当前的课程分类
    sliders:[],//此处放置轮播图的数据
    lessons:{
        list:[],//课程列表数据
        hasMore:true,//是否还有数据
        offset:0,//取下一页数据的偏移量
        limit:5,//每页的条数
        loading:false//是否正在加载
    }
}
export default function(state=initState,action){
    switch(action.type){
        case types.CHANGE_CATEGORY:
           return {...state,category:action.payload};
        case types.SET_HOME_SLIDERS:
           return {...state,sliders:action.payload}; 
        case types.SET_HOME_LESSONS:
           return {...state,lessons:{
               ...state.lessons,
               list:[...state.lessons.list,...action.payload.list],
               hasMore:action.payload.hasMore,
               offset:state.lessons.offset+action.payload.list.length,
               loading:false
           }}; 
        case types.RESET_HOME_LESSONS:
           return {...state,lessons:{
               ...state.lessons,
               list:[],
               hasMore:true,
               offset:0,
               loading:true
           }}; 
        case types.REFRESH_HOME_LESSONS:
           return {...state,lessons:{
               ...state.lessons,
               list:action.payload.list,
               hasMore:action.payload.hasMore,
               offset:action.payload.list.length,
               loading:false
           }};   
        case types.SET_HOME_LESSONS_LOADING:
           return {...state,lessons:{
               ...state.lessons,
               loading:action.payload
        }};
           
        default:
          return state;   
    }
}