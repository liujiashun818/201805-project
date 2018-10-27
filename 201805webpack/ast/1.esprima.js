let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen  = require('escodegen');
//希望把函数名叫ast的名字改成ast_ext
let code  = `function ast(){}`;
let ast = esprima.parse(code);
let indent=0;
function padding(){
    return ' '.repeat(indent);
}
//遍历语法 遍历的过程是一个深度优先的先序遍历
estraverse.traverse(ast,{
    enter(node){
        console.log(padding()+node.type+' enter');
        if(node.type == 'FunctionDeclaration'){
            node.id.name = 'ast_ext';
        }
        indent+=2;
    },
    leave(node){
        indent-=2;
        console.log(padding()+node.type+' leave');
    }
});

let result = escodegen.generate(ast);
console.log(result);