// yeoman generators的核心入口
// yeoman generators声明周期会走我们定义的一些继承方法
// 会调用writing方法,需要导出

const Generator = require('yeoman-generator')
module.exports = class extends Generator {
	prompting() {
		return this.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'your file content',
			default: 'panhe'
		}])
		.then(res => {
			this.answers = res
		})
	}
	writing() {
		// this.answers = {name: ''}
		// this.fs.write(this.destinationPath('panhe.txt'), this.answers.name + '.')
		// this.fs.readdirSync(, )
	}
}

