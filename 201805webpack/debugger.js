let {resolve} = require('path');
//node_modules\webpack-cli\bin\cli.js
let webpackPath = resolve(__dirname,'node_modules','webpack-cli','bin','cli.js');
require(webpackPath);