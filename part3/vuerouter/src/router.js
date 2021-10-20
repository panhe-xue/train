import Vue from 'vue'
import VueRouter from './vuerouter'
import HelloWorld from './components/HelloWorld.vue'
import About from './About.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/about', component: About },
]

export default new VueRouter({
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}