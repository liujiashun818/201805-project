import {CALL_HISTORY_METHOD} from './actions';
export default function routerMiddleware(history){
   return function(){
      return function(next){
        return function (action){
            //{type:CALL_HISTORY_METHOD,payload:{method,args}}
            // {type:CALL_HISTORY_METHOD,payload:{method:"push",args:['/profile']}}
            if(action.type == CALL_HISTORY_METHOD){
                // call调用 history =history对象 method 方法
                let {method,args} = action.payload;
                history[method](...args);
                //history.push('/profile');
            }else{
                next(action);
            }
        }
      }
   }
}