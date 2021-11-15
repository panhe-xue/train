// const a = 1
// const b = 'ab'
// const c = null
// const d = undefined
// const e = true
// const f = function (name) {
//     console.log('执行了...', name)
// }
// const g = {}

// console.log(new a)
// console.log(new b)
// console.log(new c)
// console.log(new d)
// console.log(new e)
// console.log(new f)
// console.log(new f('panhe'))
// console.log(new g)


function Animal() {
    this.n = '随风行酱'
    this.l = function () {
        console.log(this.name);
    }
}
Animal.prototype = {
    b: 'b'
}

function Person() {
    this.name = '随风行酱'
    this.logname = function () {
        console.log(this.name);
    }
}
Person.prototype = {
    name: '随风行酱',
    logname: function() {
        console.log(this.name);
    }
}

const _new = function (ConFunc, ...args) {
    const a = {}
    const res = ConFunc.call(a, args)
    a.__proto__ = ConFunc.prototype
    return typeof res === 'object' ? res : a;
}

// const p = new Person()
const p = _new(Person)

console.log(Object.getPrototypeOf(p))
console.log(p)
// p.logname()