//http://127.0.0.1:8000/api/user =>  http://127.0.0.1:7001/user
//https://www.npmjs.com/package/roadhog
let { resolve } = require('path');
let env = process.env.NODE_ENV;

export default {
    "proxy": {
        "/api": {
            target: env == 'development' ? "http://127.0.0.1:7001" : 'http://online',
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        }
    },
    alias: {
        "@": resolve('src')
    }
}

//import '@/assets/yay.jpg'
// roadhog npm