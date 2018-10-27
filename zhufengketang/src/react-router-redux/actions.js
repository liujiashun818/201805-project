export const CALL_HISTORY_METHOD = 'CALL_HISTORY_METHOD';
export function push(...args){
    return {
        type:CALL_HISTORY_METHOD,
        payload:{
            method:'push',
            args
        }
    }
}