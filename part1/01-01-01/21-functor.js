// Functor(函子)
// 为什么要学函子：把副作用控制在可控的范围内，异常处理，异常操作等。
// 函子； 
// 容器： 包含值和值的变形关系(这个变形关系就是函数)
// 函子： 是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）

class Container {
	constructor (value) {
		this._value = value
	}
	static of (value) {
		return new Container(value)
	}
	map (fn) {
		return this.isNothing() ? Container.of(null) : Container.of(fn(this._value))
	}
	isNothing () {
		return this._value === null || this._value === undefined
	}
}

const res = new Container(5)
	.map(x => x + 1)
	.map(x => x + 1 )
	.map(x => x + 1)

console.log(res)