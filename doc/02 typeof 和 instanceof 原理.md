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

（基本类型： number, string, boolean, undefined,null,symbol,BigInt）

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

*Tips:* 

- *```__proto__```：是实例对象才具有的对象，指向构造函数(每个对象都是由构造函数创建出来的)的原型。*
- *```instanceof```是构造函数(普通的函数都可以作为构造函数)具有的对象，指向该构造函数到原型。*
- *上面2点总结出，实例对象的```__proto__``` 和 构造函数的```prototype```是指向同一个地址。*

由后面三个表达式打印知道 foo的```__proto__```指向的原型就是构造函数 Foo的原型。

**结合第一个打印，允许我做一个逻辑不严谨的推理：```instanceof```的检测机制为左侧对象的```__proto__```是否为右侧原型**



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

可以验证```foo.__proto__``` 是指向``` Foo.prototype```，```Foo.prototype.__proto__```  指向的是```Object.prototype```.

从第一个打印为true说明，instanceof 会沿着左边对象的原型链去查找，查看是否有匹配表达式右边构造函数的原型的对象。

~~**重新更新下我的不严谨的推理：```instanceof```的检测机制为左侧对象的```__proto__```是否在右侧原型链上。**~~

**重新更新下我的不严谨的推理：```instanceof```的检测机制为表达式的右侧原型是否在左侧对象的```__proto__```所在的原型链上。**

(之所以划掉上面的推理，因为是由```__proto__```一层层去找的，同时查找方式是左侧开始找，不是右侧开始去找)

###  核心原理

##### typeof

咋们来讨论下typeof原理。在讨论前我们想一个问题，js中怎么存储变量类型的？

js引擎在存储变量的时候，变量存储最终会变成机器码，机器码的低三位存储了变量的类型，三位机器码和类型对应关系：

- 000: 对象
- 001: 整数
- 010: 浮点数
- 100: 字符串
- 110: 布尔值

但是对于历史原因，null存储的机器码也为 000，所以，咋们用typof null得到的结果为object。然而null为单独的一种数据类型。当你用 xxx instanceof null时:

```javascript
1 instanceof null

// VM81:1 Uncaught TypeError: Right-hand side of 'instanceof' is not an object
```

**所以大胆推测 typeof检测类型机制：检测变量的时候，会提取存储变量类型三位机器码的值，然后判断他们的类型。**

##### intanceof

​	intanceof的检测机制我们推测过，就是去查找表达式右边的原型是否在表达式左边构造函数的原型链上。

但是有些情况让人费解，看一下的第三种特殊情况：

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

```Object.__proto__``` 指向了 Function的原型，```Object.__proto__.__proto__```相当于  Function的原型的原型，即指回到了Object的原型，所以Object是可以是Object的构造函数原型链上。

再来看看Function，Function比较特殊唯一个构造函数，其```__proto__```指向是原型，意思是```__proto__```和```prototype```指向都是同一个对象---```Function.prototype```

而对于普通的的函数只所以不能自己属于自己，是因为左侧已经在右侧更深层次了。对于Foo而言 右侧是Foo的原型，左侧则是```Function.prototype ---> Object.prototype```这条链上根本没有```Foo.prototype```。



对于为什么 Object 属于 Function, Function属于Object。两者这似乎形成了环？

特殊情况的结论：我们把 Object 与 Function 看作相同类型的，即构造函数，构造函数的```__proto__```都会指向```Function.prototype```。```Function.prototype```的```__proto__```会指向```Object.prototype```。而```Object.prototype```到终止了。

![](https://gzmeiji.oss-cn-shenzhen.aliyuncs.com/mj-ecmiddle-sys/goodsdetail/prototype%20(1).png)



##### 关于instanceof的手写实现

思路就是循环左边的```__proto__```属性，当前的原型是否是表达式右侧的原型，如果是就返回true，如果检测到左侧到了原型链最顶端即为null，则返回true

```javascript
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
```



### 面试点分析

常见面试题部分我相信大家应该都清楚了。上面都有总结了。



### 扩展

另外一种检测类型的方法：```Object.prototype.toString.call```

```javascript
Object.prototype.toString.call(undefined) //'[object Undefined]'
Object.prototype.toString.call(null)      //'[object Null]'
Object.prototype.toString.call({})        //'[object Object]'
Object.prototype.toString.call([])        //'[object Array]'
Object.prototype.toString.call(3)         //'[object Number]'
Object.prototype.toString.call(true)      //'[object Boolean]'
Object.prototype.toString.call('str')     //'[object String]'
Object.prototype.toString.call(function() {}) //'[object Function]'
function SelfClass() {}
Object.prototype.toString.call(new SelfClass()) //'[object Object]'
```
