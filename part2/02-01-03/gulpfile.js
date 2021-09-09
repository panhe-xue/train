// gulp 的入口文件
// gulp的核心工作原理：
// gulp构建过程中包括三个过程： 输入（读取流） --> 加工（转换流） --> 输出（写入流）

// const { series, parallel } = require('gulp')

// const foo = (cb) => {
// 	setTimeout(() => {
// 		console.log('first task working~')
// 		cb()
// 	}, 1000)
// }

// const sec = cb => {
// 	setTimeout(() => {
// 		console.log('sec task working~')
// 		cb()
// 	}, 1000)
// }

// const timeout = time => {
// 	return new Promise(resolve => {
// 		setTimeout(resolve, time)
// 	})
// }

// exports.promise = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			console.log('==========--------promise..........')
// 			resolve()
// 		}, 2000)
// 	})
// }

// exports.async = async () => {
// 	await timeout(2000)
// 	console.log('async task......')
// }

// exports.default = series(foo, sec)
// exports.default = parallel(foo, sec) 

// const fs = require('fs')
// const { Transform } = require('stream')

// exports.default = (cb) => {
// 	const read = fs.createReadStream('test.css')
// 	const write = fs.createWriteStream('test.min.css')
// 	const transform = new Transform({
// 		transform: (chunk, encoding, callback) => {
// 			const input = chunk.toString()
// 			const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g,'')
// 			callback(null, output)
// 		}
// 	})
// 	read.pipe(transform).pipe(write)
// 	cb()
// }

// const { src, dest } = require('gulp')
// const cleanCss = require('gulp-clean-css')
// const rename = require('gulp-rename')

// exports.default = () => {
// 	return src('./test.css')
// 		.pipe(cleanCss())
// 		.pipe(rename({
// 			extname: '.min.css'
// 		}))
// 		.pipe(dest('dist'))
// }

// -----------------------------核心工作 ------------------------
console.log('JSON.stringify(require("gulp-cli"))')
module.exports = require('gulp-clis')



















