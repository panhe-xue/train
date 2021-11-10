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

基本类型： number, string, boolean, undefined,null,symbol,BigInt

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
// 
typeof function () {} // 'funtion'

```

Typeof 可以很好的判断基本类型，但是对于引用类型，返回都是object，包括，set,map, 对象，数组等等。并且函数都是返回 function。	

###### instanceof:

来看看instanceof的使用：

```javascript
function Foo() {}

```



### 核心原理

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



### 用来做什么的



### 优缺点



### 面试点分析

### 拓展
