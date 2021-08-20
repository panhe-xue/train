// // io 函子
// // io函子中的_value是一个函数，这里是把函数作为值来处理
// // io函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作，包装当前的操作。
// // 把不纯的操作交给调用者处理
// const fp = require('lodash/fp')
// class IO {
// 	static of (x) {
// 		return new IO(function() {
// 			return x
// 		})
// 	}
// 	constructor(fn) {
// 		this._value = fn
// 	}
// 	map(fn) {
// 		return new IO(fp.flowRight(fn, this._value))
// 	}
// 	done() {
// 		return this._value()
// 	}
// }

// // 调用
// // const r = IO.of(process)
// // 	.map(p => p.execPath)
// // 	.done()

// const res = IO.of(4)
// 	.map(function (value) {
// 		setTimeout(() => console.log(Math.abs(value)), 10000)
// 		// throw 'a'
// 		return Math.abs(value);
// 	})

// console.log(res.done())

// var a = 1
// var a = 2
// console.log(a)
// // console.log(window.a)

// let b = 1
// let b = 2

// console.log(b)

var a = 10;
var obj = {
  a: 20,
  fn() {
  	console.log(this)
    setTimeout(() => {
      // console.log(this.a)
    })
  }
}
obj.fn()