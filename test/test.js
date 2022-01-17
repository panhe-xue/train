// const math = require('mathjs')
// const Big = require('big.js')
// const x = new Big(1.14)
// console.log(parseInt(new Big(1.14).times(100)))

//  const { create, all } = require('mathjs');
//  const mathjs = create(all);
//   mathjs.config({ number: 'BigNumber' });
// console.log(mathjs.multiply(1.14, 100));

// var object = {}

// Object.defineProperty(o, 'a', {
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     get() {
//         return 1
//     },
//     set(newValue) {
//         return 2
//     }
// })

// var a = [2, 3, 6]
// for (let v of a) {
//     if (v > 2) {
//         console.log(v);
//         continue;
//     }
//     console.log('aaaa', v);
// }
// a.map(item => {
//     console.log(item);
//     if (item > 2) {
//         continue;
//     }
// })

// function Person(name, age) {
    // this.name = name
    // this.age = age
    // this.sayName = function() {
    //     return this.name
    // }
    // var name = 'ph'
    // console.log('name', name)
    // this.name = 'panhe'
// }

// Person.prototype.sayAge = function () {
//     return this.age
// }

// const p = new Person('panhe', 28)

// console.log(p)
// console.log(typeof p)
// console.log(p instanceof Person)
// console.log(Object.prototype.toString.call(p))
// console.log(p.sayName())
// console.log(p.sayAge())

// 

// const data = {
//     valueOf: () => {console.log('valueof被调用了'); return 123},
//     toString: () => {console.log('tostring被调用了'); return 'adc'},
//   }
  
// console.warn("data == 'abc'", data == 'abc'); // true
// console.warn("data === 123", data === 123); // false
// console.warn("`${data}`", `${data}`); // true
// console.warn("data + '' === 'abc'", data + '' === 'abc'); // false
// console.warn("+dat", +data)
// console.warn('Number(data)', Number(data))
// console.warn('isNaN(data)', isNaN(data))
// console.warn('JSON.stringify(data)', JSON.stringify(data))
// console.warn('String(data)', String(data))

const test = (
  console.log('1'),
  console.log('2'),
  console.log('3')
)
console.log(test)

// function test1() {
//   console.log('1')
//   console.log('2')
//   return 'a'
// }