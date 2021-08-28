// gulp 的入口文件

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

const fs = require('fs')
const { Transform } = require('stream')

exports.default = (cb) => {
	const read = fs.createReadStream('test.css')
	const write = fs.createWriteStream('test.min.css')
	const transform = new Transform({
		transform: (chunk, encoding, callback) => {
			const input = chunk.toString()
			const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g,'')
			callback(null, output)
		}
	})
	read.pipe(transform).pipe(write)
	cb()
}