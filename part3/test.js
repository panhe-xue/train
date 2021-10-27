var object = {
    a: 'ceshi',
    b: 'cccc'
}

var vm = new Proxy(object, {
    get(target, key) {
        console.log(target, key)
        return object[key]
    },
    set(target, key, newValue) {
        console.log(target, key, newValue, target[key] === newValue)
        if (target[key] === newValue) {
            return
        }
        target[key] = newValue
    },
})
// Object.defineProperty(vm, 'a', {
//     // value: 'a',
//     // writable: true,
//     enumerable: true,
//     // configurable: true,
//     get() {
//         console.log('j')
//         return object.a
//     },
//     set(newValue) {
//         console.log('kkk')
//         if(newValue === object.a) {
//             return
//         }
//         object.a = newValue
//     }
// })

