// function * foo() {
// 	console.log('start')

// 	const res = yield 'foo'
// 	console.log(res, 'res')
// 	return 'a'
// }

// const generator = foo()

// const     = generator.next()
// console.log('generator.next()1', result)

// const r = generator.next('测试')
// console.log('generator.next()2', r)

// 第一个next 开始执行函数体。遇到yield的时候停止执行函数体，跳出到next处。依次执行。到done

// const promise = new Promise((resolve, reject) => {
// 	console.log(1)
// 	resolve()
// 	console.log(2)
// })

// promise.then(res => {
// 	console.log(res)
// })
// console.log(4)

Promise.resolve(1)
.then(2)
.then(3)
.then(Promise.resolve(3))
.then(console.log)