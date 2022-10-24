'use strict'

// 设置默认node_env
!process.env.NODE_ENV && (process.env.NODE_ENV = 'development')
// 修改libuv的默认线程数
process.env.UV_THREADPOOL_SIZE = 128;
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const ms = require('./ms')

// 自封装中间件
const connects = require("./app/middleware/connects")
const requestlog = require("./app/middleware/requestlog")
const verifyToken = require('./app/middleware/verifyToken')
const verifyPrivilage = require('./app/middleware/verifyPrivilage')
const route = require('./app/router')

// error handler
onerror(app)

// 挂载ms
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') return
  ctx.ms = ms
  ctx.fs = ms.fs
  ctx.logs = ms.logs
  ctx.RetCode = ms.RetCode
  ctx.RetMsg = ms.RetMsg
  ctx.curl = ms.curl
  ctx.connectMysql = ms.connectMysql
  ctx.connectRedis = ms.connectRedis
  ctx.tokenData = ms.tokenData
  ctx.util = ms.util
  await next()
})

// 连接数据库
connects(app)
app.emit('connectMysql')
// app.emit('connectRedis')
app.emit('connectService')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/../public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 打印请求日志
app.use(requestlog())

// 校验登录有效性
app.use(verifyToken())

//权限校验
app.use(verifyPrivilage());

// 业务routes
route(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
