/** 
 * 
 * 为什么需要防抖和流程：
 * 在一些高频率事件触发的场景下我们不希望对应的事件处理函数多次执行
 * 场景：
 * 	滚动事件
 * 	输入的模糊匹配
 * 	轮播图切换
 * 	点击操作
 *  键盘操作
 * 	。。。。
 * 	浏览器默认情况下都会有自己的监听事件间隔（4 -6ms），如果检测到多次事件监听执行，那么就会造成不必要的资源的浪费
 * 	
 * 	前置场景： 页面上有一个按钮，我们可以多次连续点击
 * 	防抖：对于这个高频的操作来说，我们只希望识别一次点击，可以人为第一次或者最后一次
 * 	节流：对于高频率操作按照我们设置的频率来触发
 * 		
 * */

function debounce(handle, wait, immediate) { // 防抖
    if (typeof handle !== 'function') throw new Error('handle must be funtion')
    if (typeof wait == 'boolean') {
        wait = 1000
        immediate = wait
    }
    if(typeof wait === 'undefined') {
        wait = 1000
        immediate = false
    }
    if(typeof immediate === 'undefined') {
        immediate = false
    }
    let timer = null
    return function (...args) {
        const self = this
        if(immediate) {
            if(!timer) {
                handle.call(self, ...args)
                timer = setTimeout(() => {
                    timer = null
                }, wait)
            }
        } else {
            clearTimeout(timer)
            timer = setTimeout(handle.bind(self, ...args), wait)
        }
    }
}

function throttle (handle, wait) { // 节流
    if (typeof handle !== 'function') throw new Error('handle must be funtion')
    if(typeof wait === 'undefined') {
        wait = 1000
    }
    let pre = 0
    let timer = null
    return function(...args) {
        const self = this
        const now = new Date()
        const interval = wait - (now - pre)
        if(interval <=0) { // 处于低频操作中
            clearTimeout(timer)
            handle.call(self, ...args)
            pre = new Date()
        } else { // 处于高频操作中
            // 确保最后一次执行
            clearTimeout(timer)
            timer = setTimeout(() => {
                handle.call(self, ...args)
                pre = new Date()
            }, interval)
        }
    }
}