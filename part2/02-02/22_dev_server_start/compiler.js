const config = require('./lg.webpack')

const webpack = require('webpack')

const compiler = webpack(config)

compiler.run()
// console.log(JSON.stringify(compiler))