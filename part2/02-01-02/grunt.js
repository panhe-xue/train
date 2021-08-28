/** 
 * grunt的使用步骤
 * 
 * 1. 安装grunt: npm install grunt -D
 * 2. 创建一个grunt的入口文件，自动执行的任务
 * 	2.1 需要导出一个函数
 * 	2.2 参数提供了一系列操作操作任务方法
 * 	
 * */
 

 module.exports = grunt => {
 	// 2. grunt.initConfig()注册全局的配置信息
 	grunt.initConfig({
 		foo: {
 			bar: 123
 		}
 	})

 	// 1.grunt.registerTask 方法注册执行的任务
 	grunt.registerTask('first', () => {
 		console.log('first');
 		// 2.1 获取配置信息
 		grunt.config('foo.bar')
 		return false
 	})
 	grunt.registerTask('sec', () => {
 		console.log('sec');
 		return false
 	})
 	grunt.registerTask('async', function() {
 		const done = this.async()
 		setTimeout(() => {
 			console.log('async')
 			done()
 			// done(false) 为失败任务
 		}, 1000)
 	}

 	// 3.多任务，子任务
 	grunt.initConfig({
 		build: {
 			options: {// 作为全局的配置
 				foo: 'bar'
 			},
 			css: {
 				options: { // 单独设置配置
 					foo: 'baz'
 				}
 			},
 			js: '2'
 		}
 	})

 	grunt.registerMUltiTask('build', function () {
 		console.log(this.options()) // 获取当前任务的配置
 		console.log(`target: ${this.target}, data: ${this.data}`)
 	})

    // 4.插件的使用： 1，安装插件, 2，配置插件信息 3，用grunt.loadNpmTasks() 方法使用插件
    grunt.initConfig({
        clean: {
            temp: 'temp/**'
        }
    })

    // grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks(grunt) // 自动加载所有的grunt插件中的任务

    // 5. grunt常用的插件： 
    //  5.1: 
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass,
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                ourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        }
    });
 }



