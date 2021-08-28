/** 
 * plop的使用步骤：
 * 	1，安装plop： npm install plop -D
 * 	2，在项目根目录创建一个plopfile.js
 * 		2.1, plopfile文件导出一个函数，此函数的参数为plop对象，用于生产创建生成器任务
 * 	3,	创建plop-template 文件模板
 * 
 * */
 
 module.exports = plop => {
    plop.setGenerator('component', {
        description: 'creat a component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name',
            default: 'panhe'
        }],
        actions: [{
            type: 'add',
            path: 'src/components/{{name}}/{{name}}.js',
            templateFile: 'plop-templates/components.hbs'
        }]
    })
 }


 /**
  * 
  * 1，leetcode的简单中等题目
  * 2，数据结构： 树，二叉树，中序遍历，，，返链
  * 3，es6的语法用es5的方法实现
  * 4，hook fiber
  * 
  * /