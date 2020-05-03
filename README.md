1.技术栈：nodeJS+vue+vuex+mysql+redis，前端使用vue的element-ui的组件库，后端使用nodeJS的服务，数据库mysql，缓存使用的是redis。

2.adapter.js，config.js这两个文件中配置redis和mysql连接
````
adapter.js

exports.cache = {
    type: 'redis',
    common: {
        timeout: 24 * 60 * 60 * 1000 // millisecond
    },
    redis: {
        handle: redisCache,
        host: '127.0.0.1',
        port: 6379,
        password: 'root'  //redis安装时候设置的密码
    }
};
//
//
exports.model = {
  type: 'mysql',
  common: {
    logConnect: true,
    logSql: true,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'structure_admin',
    prefix: 'structure_',
    encoding: 'utf8',
    host: '127.0.0.1',   //本地数据库
    port: '3306',　　　　　//数据库端口
    user: 'root',    //数据库的用户名
    password: 'root',    //数据库该用户名的密码
    dateStrings: true
  }
};

3.前端启动
````
npm run dev
 ````

4.node后端启动
````
npm start
 ````

5.redis路径运行命令
````
redis-server redis.windows.conf
````
6.redis需要重启时依次输入：
````
redis-cli -h 127.0.0.1 -p 6379 shutdown
````
````
redis-cli.exe
````
````
auth "root"
````
````
shutdown
````
````
redis-server.exe redis.windows.conf
````
