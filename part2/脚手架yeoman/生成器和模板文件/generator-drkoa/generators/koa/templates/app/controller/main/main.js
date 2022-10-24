const router = require('koa-router')()


// router.prefix('/')
/**
 * 获取配置参数
 */
router.post('/test', async (ctx, next) => {
  let ret = ctx.RetCode.SUC_OK
  let msg = ctx.RetMsg.SUC_OK
  let subMsg
  let data = {}

  // 参数
  ctx.logs.info('配置参数:', ctx.request.body)
  try {
    do{
      data = await ctx.app.service.main.test()
      ctx.logs.info("config messages ", data)
    } while(false)

  } catch (error) {
    ctx.logs.error('获取config有问题 config has error:', error)
    ret = ctx.RetCode.ERR_SERVER_EXCEPTION
    msg = ctx.RetMsg.ERR_SERVER_EXCEPTION
    subMsg = error.message
  }

  let result = {
    ret,
    msg,
    subMsg,
    data
  }
  ctx.logs.info('ctx.body :', result)
  ctx.body = result
})

module.exports = router
