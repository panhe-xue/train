let _Vue = null

class VueRouter {
    static install(Vue) {
        _Vue = Vue
        // 1. router参数作为vue实例的属性
        Vue.mixin({
            beforeCreate: function () {
                if (this.$options.router) {   
                    Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            }
        }) 
    }
    
    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/'
        })
    }

    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }

    createRouteMap() {
        this.options.routes.map(route => {
            this.routeMap[route.path] = route.component
        })
    }

    initComponents(Vue) {
        const self = this
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
        Vue.component('router-view', {
            render(createElement) {
                const component = self.routeMap[self.data.current]
                return createElement(component)
            }
        })
    }

    initEvent() {
        const self = this
        window.addEventListener('popstate', function() {
            self.data.current = window.location.pathname
        })
    }

}

export default VueRouter