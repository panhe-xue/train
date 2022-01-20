const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')

const app = express()

// 获取配置文件
const config = require('./webpack.config.js')

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler))

app.listen(8000, () => {
	console.log('服务运行在，8000端口上')
})