/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1701581759878_3766';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    // 定義多個數據庫使用
    datasources: [
      {
        delegate: 'model',
        dialect: 'mysql', 
        baseDir: 'model',
        host: '34.172.19.21',
        port: '3306',
        username: "mysql",
        password: "abc123",
        database: 'msgboard',
      },
      
      // {
      //   delegate: 'model',
      //   baseDir: 'model2',
      //   dialect: 'postgres',
      //   database: '',
      //   host: '',
      //   port: '',
      // },
    ]
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };




  return {
    ...config,
    ...userConfig,
  };
};
