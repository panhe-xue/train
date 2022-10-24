const node_env = (process.env.NODE_ENV === 'development' ? 'dev' : 'pro')
const MYSQL_OPTIONS = require('../db/options')[node_env]

const ms = require("../../ms")
const mysqlConnect = require('../db/connect')
const _redis = require('../db/redisConnect')


const connectService = function(dir, app) {
    const files = ms.fs.readdirSync(dir)
    files.forEach((item, index) => {
        const fullPath = ms.path.join(dir, item)
        const stat = ms.fs.statSync(fullPath)
        if(stat.isDirectory()) {
            connectService(fullPath, app)
        } else if(/\.js$/ig.test(item) && item !== 'index.js') {
            const Service = require(fullPath)
            item = item.slice(0, -3)
            app.service[item] = new Service(app)
        }
    })
}

module.exports = function(app) {
    app.mysql = {}
    app.redis = {}
    app.service = {}
    // 连接Mysql
    app.once("connectMysql", function() {
        ms.logs.info('connect mysql options', MYSQL_OPTIONS)
        app.mysql[MYSQL_OPTIONS.database] = new mysqlConnect(MYSQL_OPTIONS)
    })

    // 连接其他数据库:redis
    app.once('connectRedis', function() {
        app.redis = new _redis()
    })

    // 挂在service
    app.once('connectService', function() {
        const dir = ms.path.join(__dirname, '../dao')
        app.logs = ms.logs
        app.curl = ms.curl
        app.config = ms.config
        connectService(dir, app)
    })

    // 其他初始化，比如mysql同步redis
}