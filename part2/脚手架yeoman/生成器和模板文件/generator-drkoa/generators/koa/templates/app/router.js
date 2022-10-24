// const login = require('./contriller/login/login')
const ms = require('../ms')

const initRoutes = (dir, app) => {
  const files = ms.fs.readdirSync(dir)
  files.forEach((item, index) => {
    const fullPath = ms.path.join(dir, item)
    const stat = ms.fs.statSync(fullPath)
    if(stat.isDirectory()) {
      initRoutes(fullPath, app)
    } else if(/\.js$/ig.test(item)) {
        const Route = require(fullPath)
        app.use(Route.routes(), Route.allowedMethods())
    }
  })
}

module.exports = (app) => {
  const dir = ms.path.join(__dirname, 'controller')
  initRoutes(dir, app)
}
