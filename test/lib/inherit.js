"use strict";

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 原型链继承
// function Person () {
//     this.colors = ['red', 'green']
// }
// Person.prototype = {
//     getColors: function() {
//         return this.colors
//     }
// }
// function Child () {
// }
// Child.prototype = new Person()
// const c1 = new Child();
// const c2 = new Child();
// c1.colors.push('black')
// c2.colors.push('yellow')
// console.log(c1.colors)
// console.log(c2.colors)
// 构造函数继承
// function Person () {
//     this.colors = ['red', 'green']
// }
// Person.prototype = {
//     getColors: function() {
//         return this.colors
//     }
// }
// function Child () {
//     Person.call(this, ...arguments)
// }
// const c1 = new Child();
// const c2 = new Child();
// c1.colors.push('black')
// c2.colors.push('yellow')
// console.log(c1.colors)
// console.log(c2.colors)
// console.log(c2.getColors)
// function getRes(p) {
//     const res = new Object()
//     res.__proto__ = p.prototype
//     return res
// }
// // 组合继承
// function Main() {
// }
// Main.prototype.test = 'a'
// function Person () {
//     this.colors = ['red', 'green']
// }
// Person.prototype = getRes(Main)
// Person.prototype.getColors = function() {
//     return this.colors
// }
// function Child () {
//     Person.call(this, ...arguments)
// }
// Child.prototype = getRes(Person)
// Child.prototype.getAge = function () {
//     return this.age
// }
// function Animal () {
//     Person.call(this, ...arguments)
// }
// Animal.prototype = getRes(Person)
// const c = new Child();
// console.log('Object.getPrototypeOf(c)', Object.getPrototypeOf(c))
// const a = new Animal();
// console.log('Object.getPrototypeOf(a)', Object.getPrototypeOf(a))
// console.log('Object.getPrototypeOf(Object.getPrototypeOf(c))', Object.getPrototypeOf(Object.getPrototypeOf(c)))
// 原型式继承
// function object(o) {
//     function F() {}
//     F.prototype = o
//     return new F()
// }
// const cat = {
//     heart: '@',
//     colors: ['white', 'black']
// }
// // // 寄生式继承
// function createAnthor(origin) {
//     const clone = object(origin)
//     clone.sayhi = function() {
//         return 'hi'
//     }
//     return clone
// }
// const instance1 = createAnthor(cat)
// instance1.heart = '0'
// instance1.colors.push('ll')
// console.log(instance1.heart)
// console.log(instance1.colors)
// console.log(instance1)
// console.log(Object.getPrototypeOf(instance1))
// 寄生组合继承
// function object(o) {
//     function F() {}
//     F.prototype = o
//     return new F()
// }
// function createAnthor(Child, Parent) {
//     const prototype = object(Parent.prototype) // 产生一个对象指向 parent.prototype
//     prototype.constructor = Child // 每个原型对象有一个constructor对象
//     Child.prototype = prototype
// }
// function Person() {}
// Person.prototype = {}
// function Child() {}
// Child.prototype = {}
// Object.prototype.name = 'panhe'
// const a = new Object()
// console.log(a)
// console.log(Object.getPrototypeOf(a))
// console.log(a.name)
// function Person() {}
// const b = new Person()
// console.log(b)
// console.log(Object.getPrototypeOf(b))
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(b)))
// console.log(b.name)
var Parent = /*#__PURE__*/function () {
  function Parent(name) {
    _classCallCheck(this, Parent);

    this.name = name;
  }

  _createClass(Parent, [{
    key: "getname",
    value: function getname() {
      return this.name;
    }
  }]);

  return Parent;
}();

var Child = /*#__PURE__*/function (_Parent) {
  _inherits(Child, _Parent);

  var _super = _createSuper(Child);

  function Child(name) {
    _classCallCheck(this, Child);

    return _super.call(this, name);
  }

  return Child;
}(Parent);

var c = new Child('随风行酱');
console.log('aa', c.getname());