const {resolve} = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:resolve('dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        plugins:[['babel-import',{libaray:'lodash'}]]
                    }
                }
            }
        ]
    }
}