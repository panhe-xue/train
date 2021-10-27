// const math = require('mathjs')
// const Big = require('big.js')
// const x = new Big(1.14)
// console.log(parseInt(new Big(1.14).times(100)))

//  const { create, all } = require('mathjs');
//  const mathjs = create(all);
//   mathjs.config({ number: 'BigNumber' });
// console.log(mathjs.multiply(1.14, 100));

var object = {}

Object.defineProperty(o, 'a', {
    writable: true,
    enumerable: true,
    configurable: true,
    get() {
        return 1
    },
    set(newValue) {
        return 2
    }
})