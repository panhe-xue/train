

// 这是yeoman的核心入口，导出一个继承yeoman-generator的类

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'your project name',
            default: this.appname
        }]).then(answer => {
            this.answer = answer
        })
    }
    writing() {
        // yeoman在生成文件阶段 调用该方法
        const templates = [
            // '.gitignore',
            'babel.config.js',
            'package.json',
            'postcss.config.js',
            'README.md',
            'public/favicon.ico',
            'public/index.html',
            'src/App.vue',
            'src/main.js',
            'src/router.js',
            'src/assets/logo.png',
            'src/components/HelloWorld.vue',
            'src/store/actions.js',
            'src/store/getters.js',
            'src/store/index.js',
            'src/store/mutations.js',
            'src/store/state.js',
            'src/utils/request.js',
            'src/views/About.vue',
            'src/views/Home.vue'
        ]
        templates.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answer
            )
        })
    }
    install() {
        console.log('安装...........');
    }
}