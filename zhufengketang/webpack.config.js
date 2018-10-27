const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    devtool:"source-map",
    devServer:{
        historyApiFallback:true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: ['@babel/plugin-proposal-class-properties',
                            ['@babel/plugin-proposal-decorators',{legacy:true}],
                            '@babel/plugin-proposal-export-default-from'
                        ]
                        }
                    }
                ],
                exclude: /node_modules/,
                include: resolve('./src')
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", "css-loader", "less-loader"
                ],
                include: resolve('./src')
            },
            {
                test: /\.(png|gif|jpg)/,
                use: ["url-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}