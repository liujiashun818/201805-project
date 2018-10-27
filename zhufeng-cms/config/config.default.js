'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536483095408_1038';

  // add your config here
  config.middleware = [];

  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'zhufengcms',
    },
    app: true, // app.mysql
    agent: false,
  };
  config.PAGE_SIZE = 3;
  config.security = {
    csrf: false,
    whiteList: ['http://localhost:8000'],
  };
  return config;
};
