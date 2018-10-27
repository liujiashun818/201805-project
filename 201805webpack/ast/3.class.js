const {transform} = require('@babel/core');//核心引擎
// t是指的是babel-types模块，它用来生成新的节点，或者判断某个节点是不是某个类型的节点
const t = require('babel-types');
let code = `
class Person {
    constructor(name) {
        this.name=name;
    }
    getName() {
        return this.name;
    }
}
`;
//访问者模式
let ClassTransform = {
    //visitor是定死的
   visitor:{
    ClassDeclaration(path){
        let node = path.node;
        let id = node.id;
        let methods = node.body.body;
        methods = methods.map(method=>{
            if(method.kind == 'constructor'){
                return t.functionDeclaration(id, method.params, method.body, method.generator, method.async);
            }else{
                return t.expressionStatement(
                    t.assignmentExpression("=", 
                    t.memberExpression(
                        t.memberExpression(id,t.Identifier('prototype'))
                        , method.key),
                     t.functionExpression(null, method.params, method.body, method.generator, method.async)
                    )
                );
            }
        });
        path.replaceWithMultiple(methods);
    }
   }
}
let ret = transform(code,{// options webpack.config.js options
    plugins:[ClassTransform]
});
console.log(ret.code);