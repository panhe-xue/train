// 柯里化案例

// console.log('hello word panhe'.match(/\s+/g));

const _ = require('lodash')

// const match = _.curry(function(reg, str) {
// 	return str.match(reg)
// })

// const haveSpace = match(/\s+/g)
// const haveNum = match(/\d+/g)

// 寻找数组中含有空格的数据
// const filter = _.curry(function(func, arr) {
// 	return arr.filter(func)
// })

// const findSpace = filter(haveSpace)
// const findNum = filter(haveNum)

// console.log(filter(haveSpace, ['John Conner', 'John_Conner']))
// console.log(findSpace(['John Conner23', 'John_Conner2']))
// console.log(findNum(['John Conner23', 'John_Conner2']))

// console.log(haveSpace('hello world'))
// console.log(haveNum('123asda12233'))

// --------------------------------------------------------

// 查找数组含有空格或者数字或者其他规则的元素

['John Conner', 'John_Conner'].filter(item => item.match(/\s+/g))

const match = _.curry(function(reg, str) {
	return str.match(reg)
})
const haveSpace = match(/\s+/g);
const haveNum = match(/\d+/g);

const filter = _.curry(function(func, arr) {
	return arr.filter(func)
})

const findSpace = filter(haveSpace);
const findNum = filter(haveNum);
