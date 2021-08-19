/** 
 * 函数执行的几个步骤
 * 	1，确定作用域链
 * 	2，确定this的值
 * 	3，变量提升
 * 	4，形参赋值
 * 	5，初始化argument
 * 	6,执行函数代码
 * 
 * */

let a = 10
function foo (a) { // 0x000
	return function (b) { // 0x001
		// body...
		console.log(b + (++a))
	}
}

let fn = foo(10) // 0x001
fn(5)
foo(6)(7)
fn(20)
console.log(a)