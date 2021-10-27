### 常见面试题
    1. Vue响应式原理
    2. 为什么在 Vue3.0 采用了 Proxy,抛弃了 Object.defineProperty？
    3. vue 是如何对数组方法进行变异的 ?
### Object.defineProperty
    1. 属性描述中，不能同时存在get/set 与 writable/value
    2. 监听的属性不能在get里返回，不然会无限循环
    
    Object.defineProperty(vm, 'a', {
        // value: 'a',
        // writable: true,
        enumerable: true,
        // configurable: true,
        get() {
            console.log('j')
            return object.a
        },
        set(newValue) {
            console.log('kkk')
            if(newValue === object.a) {
                return
            }
            object.a = newValue
        }
    })

### Proxy
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

### 发布订阅模式和观察者模式
    发布订阅模式
        订阅者
        发布者
        信号中心
    定义：假定我们存在一个’信号中心‘，某个任务执行完成，可以向信号中心发布一个信号，其他任务可以向信息中心订阅这个信号。从而知道什么时候执行
    
    观察者模式
        观察着-Watcher：当事件发生时，具体要做的事情
        目标（发布者）-Dep：当事件发生调用观察者的updater
        无事件中心

### Vue响应式原理
1. 把data的外层属性代理到vm上 。只需要代理外层，当访问内部属性依然会触发这层代理。 

2. Vue实例化的时候会递归把数据初始化为get setter。

   ```javascript
   // 初始化数据
   function initData (vm) {
     let data = vm.$options.data // data数据
     data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {} // getData 为绑定vm
     const keys = Object.keys(data)
     let i = keys.length
     while (i--) {
       const key = keys[i]
       proxy(vm, `_data`, key) // 代理数据到vm上
     }
     observe(data, true /* asRootData */) // observe data
   }
   
   // 代理数据到vue实例上
   export function proxy (target, sourceKey, key) {
     sharedPropertyDefinition.get = function proxyGetter () {
       return this[sourceKey][key] // vm['_data'][key]
     }
     sharedPropertyDefinition.set = function proxySetter (val) {
       this[sourceKey][key] = val
     }
     Object.defineProperty(target, key, sharedPropertyDefinition)
   }
   
   // 开始转换数据
   export function observe (value, asRootData) {
     return new Observer(value)
   }
   
   ```
   ```javascript
   // observe.js
    export class Observer {
      value;
      dep;
      vmCount: number; // number of vms that have this object as root $data
   
      constructor (value: any) {
          this.value = value
          this.dep = new Dep()
          this.vmCount = 0
          // 递归处理属性为 🉑️观察对象
          if (Array.isArray(value)) {
          		this.observeArray(value)
          } else {
          		this.walk(value)
          }
      }
    
      walk (obj: Object) {
          const keys = Object.keys(obj)
          for (let i = 0; i < keys.length; i++) {
         	  defineReactive(obj, keys[i])
          }
      }
      observeArray (items: Array<any>) {
          for (let i = 0, l = items.length; i < l; i++) {
          		observe(items[i])
          }
      }
    }
   ```

3. 并且等待触发收集依赖 dep

   ```javascript
   export function defineReactive (
     obj,
     key,
     val
   ) {
     const dep = new Dep()
    
     Object.defineProperty(obj, key, {
       enumerable: true,
       configurable: true,
       get: function reactiveGetter () {
         const value = getter ? getter.call(obj) : val // 数据为getter的时候获取值
         if (Dep.target) {
           dep.depend() // 收集依赖
           if (childOb) {
             childOb.dep.depend() // 收集依赖
             if (Array.isArray(value)) {
               dependArray(value) // 遍历收集依赖
             }
           }
         }
         return value
       },
       set: function reactiveSetter (newVal) {
         dep.notify()
       }
     })
   }
   ```

   

4. 在进行render的时候会创建watcher实例，并收集所有的依赖

5. 当值改变的时候，会触发所有的update，更新视图
        ![](https://gzmeiji.oss-cn-shenzhen.aliyuncs.com/mj-ecmiddle-sys/goodsdetail/vue%E5%93%8D%E5%BA%94%E5%BC%8F.png)