// 函数组合要满足结合律
const _ = require('lodash')

function log(data) {
	console.log('log:', data);
	return data
}

const f = _.flowRight(_.toUpper, log, _.first, log, _.reverse)
const f1 = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const f2 = _.flowRight(_.toUpper, _.flowRight( _.first, _.reverse))

console.log(f(['john Ph', 'John stuipd']))
// console.log(f1(['john Ph', 'John stuipd']))
// console.log(f2(['john Ph', 'John stuipd']))