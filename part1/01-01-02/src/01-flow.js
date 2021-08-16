/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns 
 * @flow
 */
/* 
1，本次主要介绍什么是强类型什么是弱类型？什么是静态类型什么是动态类型？他们之间有什么不一样？
2，javasrcript自由的类型系统的问题？对我们工作造成了什么影响
3，然后介绍flow和typesrcipt这2个主流的类型系统方案，flow: 是一个工具，弥补javascript语言类型的不足。typescript是基于javascript上的一门语言

一，
（类型安全）
强类型：语言层面限制函数的形参类型必须与形参类型相同，不允许有任何的弱类型转换
弱类型：不会限制实参类型，允许任意的数据隐式类型转换
（类型检查）
静态类型：声明时类型就已经确定并且不能修改了
动态类型：在运行时才能确定变量类型，而且变量类型可以随时修改
区别：是否运行随时去修改变量的类型
二，
1，调用对象里面不存在的方法时会报错。undefined不能作为函数执行
2，计算2个数的合，如果一个数为字符串，则结果为字符串拼接（约定没有保障）
3，boolean值作为key，用字符串去取值会取不到。

强类型的好处： 1，错误提前暴露 2，更加智能的提示，编码更准确 3，重构（破坏性的改动）更牢靠 4，减少不必要的类型判断

三，flow类型检测器：为javascript提供了更完善的类型系统。
*/

// const { number } = require("mathjs");

/*
flow 使用总结：
1，
*/
import { callbackify } from "util";

function sum(a: number, b: number) {
	return a + b
}

sum(100, 'a');
sum('b', 'a');

function square(n) {
	return n * n;
}

square('100');

function foo(): number {
	return 100;
}

const a: string = 'a';
const b: number = NaN;

const arr: Array<number> = [1, 3, 3];
const arr1: number[] = [1, 3, 4];

// 元组
const arr2: [string, number] = [';a', 1];

const obj: { [string]: string } = {
	'a': 'b',
	'a': 'b',
}

function foo2(callback: (string, number) => void) {
	callback('string', 100);
}

foo2(function('100', '200') {

})
