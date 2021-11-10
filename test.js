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

var a = [2, 3, 6]
for (let v of a) {
    if (v > 2) {
        console.log(v);
        continue;
    }
    console.log('aaaa', v);
}
// a.map(item => {
//     console.log(item);
//     if (item > 2) {
//         continue;
//     }
// })