import React, { Component } from 'react'
import Header from './components/Header'
import Bottom from './components/Bottom'

export default class App extends Component {
	constructor() {
		super()
	}
	render () {
		alert(223)
		return <div>
			React组件。。。123232323阿斯顿会更好呢
			<Header />
			<Bottom />
		</div>
	}
}