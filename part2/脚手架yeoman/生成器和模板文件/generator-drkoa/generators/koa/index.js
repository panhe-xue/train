

// 这是yeoman的核心入口，导出一个继承yeoman-generator的类

const Generator = require('yeoman-generator')

const getFiles = function(dir) {
    const files = ms.fs.readdirSync(dir)
    files.forEach((item, index) => {
        const fullPath = ms.path.join(dir, item)
        const stat = ms.fs.statSync(fullPath)
        if(stat.isDirectory()) {
            connectService(fullPath, app)
        } else {
            // const Service = require(fullPath)
            // item = item.slice(0, -3)
            return fullPath
        }
    })
}

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
        const templates = getFiles()
        console.log(templates, 'tttttttttttttttttt....');
        templates.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answer
            )
        })
    }
}