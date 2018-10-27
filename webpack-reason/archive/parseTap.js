let fs=require('fs');
const path=require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname,'tag.txt')),
  crlfDelay: Infinity
});
let lines=[];
rl.on('line', (line) => {
	//console.log(`文件的单行内容：${line}`);
	lines.push(line);
});
setTimeout(function () {
	lines = [...new Set(lines)]; 
	console.log(lines);
	fs.writeFileSync(path.join(__dirname,'uniqueTag.txt'),lines.join('\r\n').toString());
},5000);