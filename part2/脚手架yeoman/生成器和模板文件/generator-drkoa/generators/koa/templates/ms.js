let logs = require('./util/log')
let ret = require('./util/retStatus')
const util = require('./util/util')
const curl = require('./util/httpClient')
const JWT = require('./util/jsonwebtoken')
const tokenData = new JWT()
const path = require('path')
const fs = require('fs')
const config = require('./app/config/config.default.js')
const connectMysql = require('./app/db/connect');
const connectRedis = require('./app/db/redisConnect');

module.exports = {
    logs,
    path,
    fs,
    RetCode: ret.RetCode,
    RetMsg: ret.RetMsg,
    util,
    tokenData,
    curl: new curl(),
    config,
    connectMysql,
    connectRedis,
}