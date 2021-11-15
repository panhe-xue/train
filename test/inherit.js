
// 原型链继承

// function Person () {
//     this.colors = ['red', 'green']
// }

// Person.prototype = {
//     getColors: function() {
//         return this.colors
//     }
// }

// function Child () {
// }
// Child.prototype = new Person()

// const c1 = new Child();
// const c2 = new Child();
// c1.colors.push('black')
// c2.colors.push('yellow')

// console.log(c1.colors)
// console.log(c2.colors)


// 构造函数继承
// function Person () {
//     this.colors = ['red', 'green']
// }

// Person.prototype = {
//     getColors: function() {
//         return this.colors
//     }
// }

// function Child () {
//     Person.call(this, ...arguments)
// }
// const c1 = new Child();
// const c2 = new Child();
// c1.colors.push('black')
// c2.colors.push('yellow')

// console.log(c1.colors)
// console.log(c2.colors)
// console.log(c2.getColors)

// function getRes(p) {
//     const res = new Object()
//     res.__proto__ = p.prototype
//     return res
// }


// // 组合继承
 
// function Main() {
// }

// Main.prototype.test = 'a'

// function Person () {
//     this.colors = ['red', 'green']
// }

// Person.prototype = getRes(Main)
// Person.prototype.getColors = function() {
//     return this.colors
// }

// function Child () {
//     Person.call(this, ...arguments)
// }
// Child.prototype = getRes(Person)
// Child.prototype.getAge = function () {
//     return this.age
// }


// function Animal () {
//     Person.call(this, ...arguments)
// }

// Animal.prototype = getRes(Person)

// const c = new Child();
// console.log('Object.getPrototypeOf(c)', Object.getPrototypeOf(c))

// const a = new Animal();
// console.log('Object.getPrototypeOf(a)', Object.getPrototypeOf(a))
// console.log('Object.getPrototypeOf(Object.getPrototypeOf(c))', Object.getPrototypeOf(Object.getPrototypeOf(c)))

// 原型继承
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
const cat = {
    heart: '@',
    colors: ['white', 'black']
}
const instance1 = object(cat)
const instance2 = object(cat)
instance1.heart = '0'
instance1.colors.push('ll')

console.log(instance1.heart)
console.log(instance1.colors)
console.log(instance2.heart)
console.log(instance2.colors)