

// 这是yeoman的核心入口，导出一个继承yeoman-generator的类

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    writing() {
        // yeoman在生成文件阶段 调用该方法
        this.log('待执行....');
    }
}