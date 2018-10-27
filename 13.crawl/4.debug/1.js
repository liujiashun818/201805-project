//const debug = require('debug');
const COLORS = [
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white"
]
const chalk = require('chalk');
function debug(name) {

    return function (...args) {
        if (process.env.DEBUG.indexOf('*') != -1) {
            let regStr = process.env.DEBUG.replace('*', '.*');
            let reg = new RegExp(regStr);
            if (!reg.test(name)) return;
        } else if (name != process.env.DEBUG) {
            return;
        }
        let color = COLORS[Math.floor(Math.random() * 7)];
        console.log.call(console, chalk[color](name), ...args, chalk[color]`+0ms`);
    }
}
let one = debug("crawl:one");
//先获取当前环境变量中的值 prcess.env.DEBUG =='one'
one('hello');
let two = debug("crawl:two");
//先获取当前环境变量中的值 prcess.env.DEBUG =='one'
two('two');
