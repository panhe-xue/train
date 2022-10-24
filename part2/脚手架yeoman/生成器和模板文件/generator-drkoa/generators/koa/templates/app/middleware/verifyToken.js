var ms = require('../../ms')
module.exports = () => {
    return async function(ctx, next) {
        let result = {
            ret: ctx.RetCode.TOKEN_EXPIRED,
            msg: ctx.RetMsg.TOKEN_EXPIRED,
            subMsg: ''
        }
        const token = ctx.headers.token || (ctx.query && ctx.query.token)
        ms.logs.info("middleware login message:", ctx.originalUrl, token, ctx.query)
        if(ctx.ms.config.noCheckTokenRoute.includes(ctx.originalUrl)) return await next()
        if(token) {
            try {
                let res = await ms.tokenData.verifyTokenKey(token)
                ctx._res = res
            } catch (error) {
                ms.logs.error('token 解析错误 error:', error)
                ms.logs.info('ctx.body :', result)
                ctx.body = result
            }
            await next()
        } else {
            ms.logs.error('无token')
            result.subMsg = '无token'
            ms.logs.info('ctx.body :', result)
            ctx.body = result
            return
        }
    }
}