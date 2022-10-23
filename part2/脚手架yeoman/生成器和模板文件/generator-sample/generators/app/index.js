

// 这是yeoman的核心入口，导出一个继承yeoman-generator的类

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        console.log('构造函数。。。。');
        super(args, opts);
    }
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'your project name',
            default: this.appname
        }, {
            type: 'confirm',
            name: 'cool',
            message: 'would you like add react?'
        }]).then(answer => {
            this.answer = answer
        })
    }
    m1() {
        this.log('函数一部执行了');
    }
    writing() {
        // yeoman在生成文件阶段 调用该方法
        this.fs.write(
            this.destinationPath('tmp.txt'),
            'panhe' + ' | ' + this.answer.name + ' | ' + this.answer.cool
        )
    }
}