import '../css/login.less'
import '../css/login.css'
import '../css/test.css'
import '../font/iconfont.css'

function login() {
	const ele = document.createElement('h1')
	ele.className = 'name example iconfont icon-linggan'

	ele.innerHTML = '这是测试内容啊啥的sodas啊实打实的'
	return ele
}

document.body.appendChild(login())