let src=`
let name=require('./base');
`;
let util=require('util');
let acorn=require('acorn');
const walk=require("acorn/dist/walk");
const escodegen=require('escodegen');	

let ast=acorn.parse(src,{
	sourceType: module,
	locations: true,
	ranges: true,
	
});
walk.simple(ast,{
	CallExpression(node) {
		console.log(node.callee.name);
		console.log(node.arguments[0].value);
		node.callee.name='require2';
	}
});
let source=escodegen.generate(ast);
console.log(source);

