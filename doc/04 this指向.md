## 04 this指向

### 1、 先看个题热热身

```javascript
//隐士绑定 ----------------------------------
function reads() {
    console.log('reads', this.mains)
}

var package = {
    mains: 'package.json',
    reads: function() {
        setTimeout(function(){
            console.log('Hello,',this.mains);
        })
    },
}

var app = {
    mains: 'app.js',
    reads,
}

var ='window or golbal';

package.reads()             // 非隐士绑定 Hello, undefined | Hello, window or golbal
app.reads()                 // 隐士绑定 reads app.js
setTimeout(app.reads, 100)  // 非隐士绑定 Hello, undefined | Hello, window or golbal
setTimeout(() => {
    app.reads()             // 隐士绑定 reads app.js
}, 1)
setTimeout(app.reads.bind(app), 100) // 显示绑定
```



### 2、知识点


#### 基础概念

*从题目中看出是什么技术？干啥用的？*

1. this是javascript中的一个关键字(是不能作为变量名字的)。

2. 可以理解为一个指针指向当前执行上下文环境。

#### 原理

Javascript为什么会有this这个关键字出现，他为了解决什么问题？

看一下下面代码：

```javascript
function test() {
    console.log(this.name)
}

const person = {
    name: '张三',
    test,
}
 
var name = 'aaabb'
var getname = person.test

person.test() // 张三
getname() // aaabb
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fdfc7f38e6e4427821cc3e3013197fe~tplv-k3u1fbpfcp-zoom-1.image" alt="js执行图" style="zoom:60%;" />

可以看出，getname 与 person.test 是指向同一个函数地址。但是调用时，getname是在全局环境执行，而person.test是在person环境下执行。

由于同一个函数可以在不同环境上下文中执行，所以js需要一种机制，来区分当前的执行上下文环境。

所以this就出现了，设计目的就是在函数体内部，指代当前函数执行的上下文环境。

（http://www.ruanyifeng.com/blog/2018/06/javascript-this.html）

#### 优缺点

优点：优点就是它设计的目的，可以很方便的表示当前执行上下文环境

缺点：目前javascript中的this指向场景不够单一，不同情况下this指向复杂，容易导致无意识的bug。

(可以补充...)

#### 热身题分析

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0efbb077350467eab2570fe84a71339~tplv-k3u1fbpfcp-zoom-1.image)

我们可以看到：调用package.reads()的时候，会把setTimeout中的函数放进事件循环队列中。
当主线程代码执行完成以后，事件循环队列中有4个等待执行的函数。然后事件队列中的方法会在主线程中进行调用。此时函数都是在全局作用域中，所以第一个和第二个this指向window。第三个隐式绑定到了app对象上，所以会打印app.js。第四个会显式绑定到app对象，同样打印app.js

#### 拓展

箭头函数中的this和new 情况下的this

```javascript
function Person(name) {
    this.name = name;
    this.getName = function() {
       console.log(this) // this === cat
       return () => console.log(this)
    }
    this.getNames = function() {
        console.log(this) // this === cat
        return function() {console.log(this)}
    }
  }
const cat = new Person('jing')
var a = cat.getName()
a()
var b = cat.getNames()
b() // this === window | global | undefined
```

**当执行new的时候会创建一个新对象，并且构造函数的this指向该对象，所以当调用cat.getName()或者cat.getNames()的时候 该方法中的this隐士绑定到了cat上，即 this === cat.**

**cat.getName() 返回的是一个箭头函数，cat.getNames()的是一个普通函数，他们的调用都在全局环境中执行，但是箭头函数中的this 是cat，普通函数是全局环境。**

**所以得出结论：箭头函数指向的是声明时候的外层执行环境。**

#### **this绑定方式总结**

##### 默认绑定

​	一个函数被单独调用的时候，我们通常被看作默认绑定：

```javascript
function reads() {
    console.log('reads', this)
}
reads() // undefined | window | global
```

这里调用结果大体分三种情况：

第一种为严格模式下: 此时this为undefined

第二种为非严格模式下，当在浏览器环境下时，this指向window

第三种为非严格模式下，当在node环境下时，this指向global

##### 隐式绑定

当一个函数体在某个对象下被调用是，我们通常可以看作隐式绑定，类似： xxx.fn()

```javascript
function test() {
    console.log(this.name)
}
const person = {
    name: '张三',
    test,
}
person.test() // 张三
```

此时test是在全局作用域下的函数，但是当用person.test()调用的时候，函数内部的this指向了person。this此时被隐世绑定到了person执行上下文环境。

##### 显示绑定

​	this显示绑定是指一个函数通过，call, apply,bind方法去绑定新的对象。当绑定的对象为null或者undefined的时会变成默认绑定，this指向全局。

```javascript
function test() {
    console.log(this.name)
}
const person = {
    name: '张三',
    test,
}
test.call(person) // 张三
test.call(null) // window | global
```

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fBound
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // 当执行Function.prototype.bind()时, this为Function.prototype 
      // this.prototype(即Function.prototype.prototype)为undefined
      fNOP.prototype = this.prototype; 
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

##### NEW操作符绑定

1. 创建一个空对象，构造函数中的this指向这个空对象
2. 这个新对象被执行 [[原型]] 连接
3. 执行构造函数方法，属性和方法被添加到this引用的对象中
4. 如果构造函数中没有返回其它对象，那么返回this，即创建的这个的新对象，否则，返回构造函数中返回的对象

##### 箭头函数中的this

​	箭头函数的this是继承外层this的指向，并非静态：

```javascript
function Person(name) {
    this.name = name;
    this.getName = function() {
       console.log(this)
       return () => console.log(this)
    }
  }
const cat = new Person('jing')
var a = cat.getName()
a() // cat
var b = cat.getName.call(null)
b() // window
```

可以看出当改变了getName中this的指向时箭头函数继承了外层this的指向，始终和外层相同。