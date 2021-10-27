class Vue {
    constructor(options) {
        this.$options = options || {}
        this.$data = options.data || {}
        const el = options.el
        this.$el = typeof options.el === 'string' ? document.querySelector(el) : el
        this._proxyData(this.$data)
        new Observer(options.data)
    }
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}