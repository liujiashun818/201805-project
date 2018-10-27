const {transform} = require('babel-core');//核心引擎
// t是指的是babel-types模块，它用来生成新的节点，或者判断某个节点是不是某个类型的节点
const t = require('babel-types');
let code = 'const sum = (a,b)=>a+b;';
//访问者模式
let ArrowFunction = {
    //visitor是定死的
   visitor:{
       //函数名字来自于你想捕获的节点对象的type属性
    ArrowFunctionExpression(path){
        let node = path.node;
        let id = path.parent.id;//parent 取得父节点
        let returnStatement = t.returnStatement(node.body);
        let body = t.blockStatement([returnStatement]);
        let func = t.functionExpression(id, node.params, body, false, false);
        //用func节点替换掉当前的node节点
        //path.parentPath 指的父路径
        //path.parent指的是父节点  
        path.parentPath.parent.kind = 'var';
        path.replaceWith(func);
    }
   }
}
let ret = transform(code,{// options webpack.config.js options
    plugins:[ArrowFunction]
});
console.log(ret.code);