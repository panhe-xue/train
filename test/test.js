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

function Person(name, age) {
    // this.name = name
    // this.age = age
    // this.sayName = function() {
    //     return this.name
    // }
    // var name = 'ph'
    // console.log('name', name)
    // this.name = 'panhe'
}

// Person.prototype.sayAge = function () {
//     return this.age
// }

const p = new Person('panhe', 28)

console.log(p)
console.log(typeof p)
console.log(p instanceof Person)
console.log(Object.prototype.toString.call(p))
// console.log(p.sayName())
// console.log(p.sayAge())

// 
