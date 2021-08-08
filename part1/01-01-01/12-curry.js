// 手写柯里函数
const _ = require('lodash');

function getSum(a, b, c) {
	return a + b + c
}

console.log(getSum.length)

const curry = curryfns(getSum)
// curry(1)(2)(3)
// curry(1, 2)(3)
// curry(1, 2, 3)
console.log(curry(1)(2)(3))
console.log(curry(1, 2)(3))
console.log(curry(1, 2, 3))

// 模拟
function curryfns(fn) {
	return function curriedFn(...arg) {
		if (arg.length >= fn.length) {
			return fn(...arg)
		}  else {
			return function(...args) {
				return curriedFn(...arg.concat(args))
			}
		}
	}
}