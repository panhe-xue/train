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

function Foo() {}
const foo = new Foo()

// console.log(foo);
// console.log(Object instanceof Function);

// console.log(foo instanceof Object);
// 对象 instanceof 构造函数
// __proto__ 指向 构造函数.prototyp

// console.log(foo instanceof Foo);
// console.log(foo.__proto__ instanceof Foo);
// console.log(foo instanceof Foo.prototype);
// console.log(foo.__proto__);
// console.log(Foo.prototype);
// console.log(foo.__proto__ === Foo.prototype);

// console.log(foo instanceof Object);
// console.log(foo.__proto__.__proto__);
// console.log(Object.prototype);
// console.log(foo.__proto__.__proto__ === Object.prototype);

// console.log(foo.__proto__.__proto__.__proto__);
// console.log(Object.prototype);
// console.log({}.__proto__);
// console.log(Object.prototype);
// console.log({}.__proto__ === Object.prototype);

// console.log(Foo instanceof Foo);
// console.log(Foo instanceof Object);
// console.log(Foo instanceof Function);
// console.log(Object instanceof Object);
// console.log(Function instanceof Object);
// console.log(Function instanceof Function);


// console.log(typeof new Map());
// console.log(typeof new Set());

// console.log(Object.__proto__); // [Object: null prototype] {}
// console.log(Object.__proto__.__proto__); // [Object: null prototype] {}
// console.log(Object.prototype); // [Object: null prototype] {}
// console.log(Object.__proto__.__proto__ === Object.prototype); // true

function _instanceof(left, right) {
    let leftproto = left.__proto__
    // const rightproto = right.prototype
    const rightproto = Object.getPrototypeOf(right);
    while (true) {
      if (leftproto === null) {
        return false
      }
    if (leftproto === rightproto) {
      return true
    }
    // leftproto = leftproto.__proto__;
    leftproto = Object.getPrototypeOf(leftproto);
   }
}

console.log(_instanceof(foo, Foo))
