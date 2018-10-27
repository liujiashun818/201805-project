let moment = require('moment');
moment.locale('zh-cn');
module.exports = {
    fromNow(date){
       return  moment(new Date(date)).fromNow();
    },
    sum(a,b){
        return a+b;
    }
}