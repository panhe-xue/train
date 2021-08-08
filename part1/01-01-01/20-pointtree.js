// 非Point Free模式
// Point Free：我们可以把数据处理的过程定义成与数据无关的合成运算，
// 不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起
// 在使用这种模式之前我们需要定义一些辅助的基本运算函数

// .不需要指明处理的数据
// .只需要合成运算过程
// .需要定义一些辅助的基本运算函数

const _ = require('lodash')
const fp = require('lodash/fp')
// const join = fp.join('-')
// const map = fp.map(_.toLower)

// console.log(join(['a', 'b', 'c']))
// console.log(map(['AC', 'BC', 'CC']))

// Hello  World => hell0_world
// const t = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

// console.log(t('Hello     World'))

// const map= fp.map(function(item){
// 	return item * 2
// });

// console.log(map([1, 2, 3]))

// 把一个字符串的首字母提取并转化成大写
// const t = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.toUpper, fp.first)), fp.split(' '));
const t = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.toUpper, fp.last)), fp.split(' '))
console.log(t('world wild web'))