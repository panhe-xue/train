// 函数组合：如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间函数合并成一个函数
// 函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
// 函数组合默认是从右到左执行

// const fn = compose(fn1, fn2, fn3);
// const b = fn(a); // fn3, fn2, fn1

const _ = require('lodash');
// 函数组合演示
// function compose(f, g) {
// 	return function (value) {
// 		return f(g(value)) // 从右往左执行
// 	}
// }


const comp = compose(_.upperCase, _.first);
const complodash = compose(_.toUpper, _.first, _.reverse);

console.log(comp(['a', 'b']));
console.log(complodash(['a', 'b']));


// compose 手写函数组合
function compose (...args) {
	return function(value) {
		return args.reverse().reduce((all, fn, index) => fn(all), value)
	}
}