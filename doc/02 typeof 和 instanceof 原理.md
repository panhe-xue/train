### 该部分常见面试题目

```javascript
function Foo() {
}

Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
```

### 基础概念

###### typeof：

```javascript
typeof 3     // 'number'
typeof 'a'   // 'string'
typeof true  // 'boolean'
typeof undefined // 'undefined'
typeof Symbol() // 'symbol'

// 特殊
typeof BigInt(10) // 'bigint'
//
typeof null // 'object'
typeof {}    // 'object'
typeof new Map()    // 'object'
typeof new Set()    // 'object'
// 函数
typeof function () {} // 'funtion'

```

Typeof 可以很好的判断基本类型，但是对于引用类型，返回都是object，包括，set,map, 对象，数组等等。并且函数都是返回 function。

基本类型： number, string, boolean, undefined,null,symbol,BigInt

###### instanceof:

先说结论：

- instanceof左边是对象，右边是可调用的函数。
- instanceof判断右边构造函数是否属于左边的对象指向的原型链上。

来看看instanceof的使用：

第一种情况

```javascript
function Foo() {}
const foo = new Foo()

// 第一种情况
console.log(foo instanceof Foo) // true
console.log(foo.__proto__) // {}
console.log(Foo.prototype) // {}
console.log(foo.__proto__ === Foo.prototype) // true

```

这种情况，我们能验证 foo的下划线的proto指向的原型就是构造函数 Foo的原型。

然后instancesof 做的操作就是判断 左边对象的下划线proto是否是在右边的构造函数原型上。

第二种情况：

```javascript
function Foo() {}
const foo = new Foo()

// 第二种情况
console.log(foo instanceof Object); // true
console.log(foo.__proto__.__proto__); // [Object: null prototype] {}
console.log(Object.prototype); // [Object: null prototype] {}
console.log(foo.__proto__.__proto__ === Object.prototype); // true
```

第二种情况是把右边的 Foo构造函数换成 Object 构造函数。

可以验证foo.__proto__ 是指向 Foo.prototype，Foo.prototype.___proto_  指向的是Object.prototype.

说明，instanceof 会沿着左边对象的原型链去查找，查看是否有匹配表达式右边构造函数的原型的对象。

###  核心原理

##### typeof

咋们来讨论下typeof原理。在讨论前我们想一个问题，js中怎么存储变量类型的？

js引擎在存储变量的时候，变量存储最终会变成机器码，机器码的低三位存储了变量的类型，三位机器码和类型对应关系：

- 000: 对象
- 001: 整数
- 010: 浮点数
- 100: 字符串
- 110: 布尔值

所以typeof最终会拿到已经存储过的三位机器码，来确定该变量的数据类型。

但是对于历史原因，null存储的机器码也为 000，所以，咋们用typof null得到的结果为object。然后null为单独的一种数据类型。当你用 xxx instanceof null时:

```javascript
1 instanceof null

// VM81:1 Uncaught TypeError: Right-hand side of 'instanceof' is not an object
```

##### intanceof

​	intanceof的原理我们上面使用知道，就是去查找右边原型链上的属性是否含有左边的原型。

但是有些情况让人费解，看一下这些情况：

```javascript
function Foo() {}
const foo = new Foo()

// 第三种特殊情况
console.log(Foo instanceof Foo);           // false
console.log(Foo instanceof Object);        // true
console.log(Foo instanceof Function);      // true
console.log(Object instanceof Object);     // true
console.log(Function instanceof Object);   // true
console.log(Function instanceof Function); // true
console.log(Object instanceof Function);   // true
```

有几点有些让人费解,：

- 为什么Object 属于Object构造函数本身，Function 属于Function构造函数本身，Foo构造函数却不是。
- 为什么 Object 属于 Function, Function属于Object。两者这似乎形成了环？

我们来画一张图可能更好理解一些：

![](https://gzmeiji.oss-cn-shenzhen.aliyuncs.com/mj-ecmiddle-sys/goodsdetail/prototype.png)

从图可知，Object instaceof Object 之所以会是 true，是因为如下关系

```javascript

console.log(Object.__proto__); // {} (这是Function的原型对象)
console.log(Object.__proto__.__proto__); // [Object: null prototype] {}
console.log(Object.prototype); // [Object: null prototype] {}
console.log(Object.__proto__.__proto__ === Object.prototype); // true
```

```Object.__proto__``` 指向了 Function的原型，```Object.__proto__.__proto__```相当于  Function的原型的原型，即指回到了Object的原型

### 用来做什么的



### 优缺点



### 面试点分析

### 拓展
