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
    1，路由有几种模式？它们之间的区别？
        1.1 hash模式
            1.1.1 地址后面会有#，比如： https://baidu.com/#abc.
            1.1.2 兼容性好，基本上的浏览器都会支持
            1.1.3 兼容性好，基本上的浏览器都会支持