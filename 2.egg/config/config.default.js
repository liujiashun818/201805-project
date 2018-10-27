module.exports = appInfo => {
    const config = {};

    config.keys = 'zfpx';
    //配置模板
    config.view = {
        defaultExtension:'.html',//配置模板的默认后缀名
        defaultViewEngine:'nunjucks',//默认的渲染引擎
        mapping:{//把模板的后缀和渲染的方法对应关联起来
            '.html':'nunjucks'
        }
    }
    config.news = {
        newsUrl:'https://www.easy-mock.com/mock/5b94a5431db725615747d036/news'
    }
    config.middleware = [
       
    ]
    config.cost = {
        name:'zfpx'
    }
    /* config.logger = {
        level: 'DEBUG',
    }; */
    config.robot = {
        ua:[
           
        ]
    }
    config.security = {
        csrf:false
      }
    return config;
};
