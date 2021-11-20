// //隐士绑定 ----------------------------------
// function reads() {
//     console.log('reads', this.mains)
// }

// var package = {
//     mains: 'package.json',
//     reads: function() {
//         setTimeout(function(){
//             console.log('Hello,',this.mains);
//         })
//     },
// }

// var app = {
//     mains: 'app.js',
//     reads,
// }

// var ='window or golbal';

// package.reads()
// app.reads()
// setTimeout(app.reads, 100)
// setTimeout(() => {
//     app.reads()
// }, 1)
// setTimeout(app.reads.bind(app), 100)

// 默认绑定
// 'use strict'
// function reads() {
//     console.log('reads', this)
// }
// reads()

// 隐世绑定
// function test() {
//     console.log(this.name)
// }
// const person = {
//     name: '张三',
//     test,
// }
// test.call(person) // 张三
// test.call(null) // window | global

// 显示绑定
// function test() {
//     console.log(this.name)
// }
// const person = {
//     name: '张三',
//     test,
// }
// test.call(person) // 张三
// test.call(null) // window | global