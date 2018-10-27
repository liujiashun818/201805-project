const CronJob = require('cron').CronJob;
//周期性的执行某项任务
//1参数是任务执行的时机 2参数是任务的定义
/**
 * 秒 Seconds	0-59
 * 分钟 Minutes	0-59
 * 小时 Hours	0-23
 * 日期 Day	1-31
 * 月 Months	0-11
 * 周几 Day of Week	0-6
 * * 代表任意的值
 * 6 特定值
 * 1-5 区间值，在1到5秒之间执行
 * 1,3,5,7,9 枚举值
 * /5 每隔多长时间一次
 * 每个月的8号晚上10点执行一次
 * 0 0 22 8 * *
 */
//job工作原理就是每隔一秒检查一次，看当前的时候和我配置的执行规则是否匹配，如果匹配就执行，不匹配不执行
let job = new CronJob('0 0 22 8 * *', function () {
    console.log(new Date().toLocaleTimeString())
});
job.start();