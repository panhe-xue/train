### New的使用

#### 前言

我想大部分人，看文章都是有目的的，可能想弄清楚心中的疑惑，然后开始百度。

言归正传，看这篇关于javascirpt中new的操作符时我们带着几个问题来看，并且最终弄清楚这些问题。

- new如何使用？
- new 创建对象的时候内部构造函数做了什么操作？
- new创建的对象和构造函数的原型以及原型链是怎么样的关系？
- 对应构造函数中的this指向，以及相比其他绑定this的方式其优先级如何？

#### new如何使用

我们来测试一下下面这段代码

```javascript
const a = 1
const b = 'ab'
const c = null
const d = undefined
const e = true
const f = function () {}
const g = {}

console.log(new a)
console.log(new b)
console.log(new c)
console.log(new d)
console.log(new e)
console.log(new f())
console.log(new g)

```

结论： 进过运行我们会知道，除了 ```console.log(new f())```正常打印出对象，其他都是报错：```TypeError: g is not a constructor```。所以new 使用很简单，new 后面跟一个函数，我们叫这个函数为构造函数。

其中一个小知识点：

```javascript
console.log(new f())
console.log(new f)
```

两者在执行上没有区别，new 会自动执行后面的构造函数。当构造函数没有参数的时候，两者可以等同。

#### new 创建对象的时候内部构造函数做了什么操作

关于这个问题，我们来通过执行代码来进行总结:

```javascript
function Person() {
    console.log('person构造函数')
}

console.log(new Person())
```

打印：

```javascript
person构造函数
Person {}
```

从打印我们可以看出，new的时候会：

1. 会执行构造函数
2. 目前会返回一个空对象



ok，接着往下测试：

```javascript
function Person() {
    this.name = '随风行酱'
    this.logname = function () {
        console.log(this.name);
    }
}

const p = new Person()

console.log(p) // Person { name: '随风行酱', logname: [Function (anonymous)] }
```

从这个测试我们总结一点：构造函数的this被绑定到了返回的这个对象上。



接下来看下，返回的对象和构造函数原型的关系：

```javascript
function Person() {
}
Person.prototype = {
    name: '随风行酱',
    logname: function() {
        console.log(this.name);
    }
}

const p = new Person()

console.log(Object.getPrototypeOf(p)) // { name: '随风行酱', logname: [Function: logname] }
console.log(p) // {}
p.logname() // 随风行酱
```

这个我们知道，新的对象继承了构造函数的原型，但并没有赋值在该对象上，即 ```p.__proto__ === Person.prototype```.

最后一种情况：

```javascript
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
    console.log('执行了')
    return new Animal()
}
Person.prototype = {
    name: '随风行酱',
    logname: function() {
        console.log(this.name);
    }
}

const p = new Person()

console.log(Object.getPrototypeOf(p)) // { b: 'b' }
console.log(p) // { n: '随风行酱', l: [Function (anonymous)] }
```

当构造函数有返回值的时候，我们可以知道创建的新对象直接就是该对象，this并没有指向该对象，并且该对象的原型直接指向Animal的原型，即该对象就是new Animal创建的对象。

#### 总结：

1. new 后面只能跟构造函数
2. 会执行构造函数内部代码
3. 构造函数如果返回值类型不是对象，则会创建一个新对象，内部this会指向该对象，并且该对象的原型指向构造函数原型。
4. 如果构造函数返回的是一个对象，则直接返回该对象，包含对象的原型。



#### 手写new

```javascript
const _new = function (ConFunc, ...args) {
  	if (typeof ConFunc !== 'function'){
      throw 'must is not a constructor'
    }
    const a = {}
    const res = ConFunc.apply(a, args)
    a.__proto__ = ConFunc.prototype
    return typeof res === 'object' ? res : a;
}
```

简单的手写实现。

关于new中的this的优先级大家可以测试一下，这里直接告诉大家结论：new中的优先级最高，相比其他改变this的指向。在我另外一片文章有详细的说明。

