import * as types from '../action-types';
import {getSliders,getLessons} from '@/api/home';
export default {
    changeCategory(category){
        return {type:types.CHANGE_CATEGORY,payload:category};
    },
    getSliders(){
        //这二个参数是redux-thunk 提供的 
        return function(dispatch,getState){
            getSliders().then(sliders=>{
                dispatch({type:types.SET_HOME_SLIDERS,payload:sliders});
            });
        }
    },
    getLessons(){
        return function(dispatch,getState){
            let {category,lessons:{offset,limit,hasMore,loading}} = getState().home;
            if(hasMore && !loading){
                dispatch({type:types.SET_HOME_LESSONS_LOADING,payload:true});
                getLessons(category,offset,limit).then(payload=>{
                    dispatch({type:types.SET_HOME_LESSONS,payload});
                });
            }
        }
    },
    refreshLessons(){
        return function(dispatch,getState){
            let {category,lessons:{limit,loading}} = getState().home;
            if(!loading){
                //清空list loading=true
                dispatch({type:types.RESET_HOME_LESSONS});
                getLessons(category,0,limit).then(payload=>{
                    dispatch({type:types.REFRESH_HOME_LESSONS,payload});
                });
            }
        }
    }
}