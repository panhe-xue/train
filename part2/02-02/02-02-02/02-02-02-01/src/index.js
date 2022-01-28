
// import login from './js/login'
// import { a } from './js/api'

// document.body.appendChild(login())
// console.log(window.testp, 'testp', a)
// // console.log(window.testapi, 'testapi')

// console.log(module.hot.accept, '.......')

// module.hot.accept('./js/login', (param) => {
//     console.log('登录文件修改了', param)
//     document.body.appendChild(login())
// })


// ---------- react 的热替换 ------------
import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/App.jsx'

ReactDOM.render(<App />, document.getElementById('app'))