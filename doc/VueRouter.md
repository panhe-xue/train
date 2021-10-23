### window.location几个api
（https://kaiwu.lagou.com/xunlianying/index.html?courseId=17&sharetype=copy#/detail?weekId=753&lessonId=3379）
    window.location.origin = 'https://kaiwu.lagou.com'
    window.location.host = 'kaiwu.lagou.com'
    window.location.pathname = '/xunlianying/index.html'
    window.location.search = '?courseId=17&sharetype=copy'
    window.location.hash = '#/detail?weekId=753&lessonId=3379'


### VueRouter 使用的几点总结：
    1. 配置一个路由列表route path ---> component
    2. 创建一个 router实例 new VueRouter(route)
    3. 传入router实例到Vue new Vue({ router })
    4. route-link组件来切换组件
    5. route-view组件来承载显示匹配组件
    6. vue实例可以访问到$route,$router属性

### install方法需要做哪些事情
    1. 混入$router对象到vue原型上
    Vue.mixin({
        beforeCreate: function () {
            if (this.$options.router) {   
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    }) 

### 构造函数要做的事情
    1. 初始化参数 options为实例化传入的参数 routeMap为路由和组件对应map 响应数据data包含当前current
    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/'
        })
    }

### init 初始化数据，组件，popstate事件
```javascript
1. route-link组件
Vue.component('router-link', {
    props: {
        to: String,
    },
    render(createElement) {
        return createElement('a', { 
            attrs: { href: this.to },
            on: { click: this.handle },
        }, [this.$slots.default])
    },
    methods: {
        handle(e) {
            history.pushState({}, '', this.to)
            e.preventDefault()
            this.$router.data.current = this.to
        }
    }
})
2. route-view组件
Vue.component('router-view', {
    render(createElement) {
        const component = self.routeMap[self.data.current]
        return createElement(component)
    }
})
3. popstate事件
window.addEventListener('popstate', function() {
    self.data.current = window.location.pathname
})
```

### 源码中的关键点总结(history模式)
    1. 调用install
        1.1 Vue原型上添加 $router $route属性
        1.2 定义全局组件 router-view router-link
        1.3 混入 Vue.mixin _router对象为router对象，调用init方法，history.current定义为 reactiveVue.util.defineReactive(this, '_route', this._router.history.current)
    1. 初始化实例
        1.1 初始化变量：三个钩子变量，history对象最终都是window.history
            1.1.1 history对象最终为window.history对象 包过histroy的pushState，replaceState，go
        1.2 
    2. 调用init方法,transitionTo


### Vue-Router常见面试题


### 面试题解析
是否支持pushstate / history：

```javascript
export const supportsPushState = inBrowser &&
        (function () {
        const ua = window.navigator.userAgent
        if (
            (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
            ua.indexOf('Mobile Safari') !== -1 &&
            ua.indexOf('Chrome') === -1 &&
            ua.indexOf('Windows Phone') === -1
        ) {
            return false
        }
        return window.history && typeof window.history.pushState === 'function'
    })()
```

1，路由有几种模式？它们之间的区别？
    1.1 hash模式
        1.1.1 地址后面会有#，比如： https://baidu.com/#abc.
        1.1.2 兼容性好，基本上的浏览器都会支持
        1.1.3 底层使用 支持的话就使用（window.location.pushstate || window.loc ation[replace ? 'replace' : 'assign'](url)） 否则 window.location.hash = path 如果可以监听 'popstate' : 'hashchange'
    1.2 history模式
        1.1.1 地址是正常的形式 比如： https://www.baidu.com/asdd/ads
        1.1.2 兼容性不好，只支持h5的history的浏览器
        1.1.3 底层直接使用pushstate 如果不支持 window.location[replace ? 'replace' : 'assign'](url)  直接监听 window.addEventListener('popstate', handleRoutingEvent)
    1.3 abstract模式
        当没有检测到window变量将会进入改模式，一般是在node端使用

2，导航守卫的总结，流程
    push/replace/addEventListener -> transitionTo -> confirmTransition -> runQueue
    每次改变路由都会触发 transitionTo 函数，其中包括触发一系列钩子函数runQueue

runQueue：

```javascript
export function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
  const step = index => {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)
}
```
queue:

```javascript
const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated),
      // global before hooks
      this.router.beforeHooks,
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      resolveAsyncComponents(activated)
    )

runQueue(queue, iterator, () => {
      // wait until async components are resolved before
      // extracting in-component enter guards
      const enterGuards = extractEnterGuards(activated)
      const queue = enterGuards.concat(this.router.resolveHooks)
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort(createNavigationCancelledError(current, route))
        }
        this.pending = null
        onComplete(route)
        if (this.router.app) {
          this.router.app.$nextTick(() => {
            handleRouteEntered(route)
          })
        }
      })
    })
  }

```
3，钩子函数中为什么要执行next

```javascript
const iterator = (hook: NavigationGuard, next) => {
      if (this.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      try {
        hook(route, current, (to: any) => {
          if (to === false) {
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true)
            abort(createNavigationAbortedError(current, route))
          } else if (isError(to)) {
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort(createNavigationRedirectedError(current, route))
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
```
其中的hook方法第三个方法就是next，如果不执行就无法进行导航或进行下一个钩子的执行





关键代码：

```javascript
  // 1.  
	export function pushState (url?: string, replace?: boolean) {
        saveScrollPosition()
        const history = window.history
        try {
            if (replace) {
                const stateCopy = extend({}, history.state)
                stateCopy.key = getStateKey()
                history.replaceState(stateCopy, '', url)
            } else {
                history.pushState({ key: setStateKey(genStateKey()) }, '', url)
            }
        } catch (e) {
            window.location[replace ? 'replace' : 'assign'](url)
        }
    }
	 // 2.
    Vue.util.defineReactive(this, '_route', this._router.history.current)
	 // 3.
    updateRoute (route: Route) {
        this.current = route
        this.cb && this.cb(route)
    }
```

