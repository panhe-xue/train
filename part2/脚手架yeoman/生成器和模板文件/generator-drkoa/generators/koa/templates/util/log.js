let log4js = require('log4js')

var basePath = __dirname + '/../../naixue_cha_log/logs/';
var reqPath = basePath + 'reqlogs/reqlogs';
var errPath = basePath + 'errlogs/errlogs';
var othPath = basePath + 'othlogs/othlogs';

log4js.configure({
  pm2: true,
  replaceConsole: true,
  disableClustering: true,
  appenders: {
   stdout: {//控制台输出
    type: 'stdout'
   },
   req: {//请求日志
    type: 'dateFile',
    filename: reqPath,//和pattern拼接组成的文件
    pattern: 'req-yyyy-MM-dd.log',
    alwaysIncludePattern: true
   },
   err: {//错误日志
    type: 'dateFile',
    filename: errPath,
    pattern: 'err-yyyy-MM-dd.log',
    alwaysIncludePattern: true
   },
   oth: {//其他日志
    type: 'dateFile',
    filename: othPath,
    pattern: 'oth-yyyy-MM-dd.log',
    alwaysIncludePattern: true
   }
  },
  categories: {
   default: { appenders: ['stdout', 'req'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
   error: { appenders: ['stdout', 'err'], level: 'error' },
   info: { appenders: ['stdout', 'oth'], level: 'info' }
  }
})

let defaultlog = log4js.getLogger()
let errorlog = log4js.getLogger('error')
let infolog = log4js.getLogger('info')

module.exports =  {
  debug: defaultlog.debug.bind(defaultlog),
  info: infolog.info.bind(infolog),
  warn: infolog.warn.bind(infolog),
  error: errorlog.error.bind(errorlog),
  fatal: errorlog.fatal.bind(errorlog)
}