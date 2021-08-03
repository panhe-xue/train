const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
	constructor(executor) {
		executor(this.reslove, this.reject)
	}
	status = PENDING
	value = null
	reason = null
	successArr = []
	failsuccessArr = []
	reslove = (value) => {
		if (this.status !== PENDING) return
		this.status = FULFILLED
		this.value = value
		// 异步处理
		while(this.successArr.length) {
			this.successArr.shift()(this.value)
		}
	}
	reject = (reason) => {
		if (this.status !== PENDING) return
		this.status = REJECTED
		this.reason = reason
		// 异步处理
		while(this.failsuccessArr.length) {
			this.failsuccessArr.shift()(this.value)
		}
	}
	then(successfn, failfn) {
		const p = new MyPromise((resolve, reject) => {
			if (this.status === FULFILLED) {
				this.isFunc(successfn) && resolve(successfn(this.value))
			} else if (this.status === REJECTED) {
			 	this.isFunc(failfn) && reject(failfn(this.reason))
			} else { // 异步resolve的情况
				this.isFunc(successfn) && this.successArr.push(() => {
					this.isFunc(successfn) && resolve(successfn(this.value))
				})
				this.isFunc(failfn) && this.failsuccessArr.push(() => {
					this.isFunc(failfn) && reject(failfn(this.reason))
				})
			}
		})
		return p
	}
	isFunc(fn) {
		if(typeof fn === 'function') {
			return true
		}
		return false
	}
}

function resolvePromise (x, resolve, reject) {
	if (x instanceof MyPromise) {
		x.then(resolve, reject)
	} else {
		resolve(x)
	}
}

module.exports = MyPromise