/* 
	1, Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去，执行器会立即执行
	2，Promise 中有三种状态 分别为 成功 fulfilled 失败 rejected 等待 pending
		pending -> fulfilled
		pending -> rejec
		一旦改变状态就不能改变了
	3，then的链式调用(异步怎么处理？)
	4，上一个then的结果返回值返回给下一个then的参数
	5, then返回promise对象特殊处理
*/

const MyPromise = require('./myPromise')
const p = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve(12)
	}, 2000)
	// resolve(12)
})

const r = p.then(res => {
	console.log(0)
	return 13
})

// console.log(r)

.then(() => {
	console.log(1)
	return 2
}).then((res) => {
	console.log(res)
	return 3
})
.then((res) => {
	console.log(res)
	return 4
})
.then((res) => {
	console.log(res)
	return 5
})
.then((res) => {
	console.log(res)
	return 6
})

// p.then(res => {
// 	console.log(1)
// 	console.log(res)
// 	return 13
// })

// p.then(res => {
// 	console.log(2)
// 	console.log(res)
// 	return 13
// })
