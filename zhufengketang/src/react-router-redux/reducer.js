export const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";
let initState = {
    location:{}
}
export function routerReducer(state=initState,action){
   switch(action.type){
       case LOCATION_CHANGE:
          return {location:action.payload};
       default:
        return state;   
   }
}