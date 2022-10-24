module.exports = function () {
    return async (ctx, next) => {
        // 请求的信息
        let begin_time = new Date().getTime()
        let message = `request host: ${ctx.host}--ip: ${ctx.ip}--method: ${ctx.method}--originalUrl: ${ctx.originalUrl}`
        ctx.logs.info('**************************requeset begin********************************')
        ctx.logs.debug(message)
        await next()
        let dur = new Date().getTime() - begin_time
        ctx.logs.info('response time :', dur, 'status: ', ctx.status)
        ctx.logs.info('**************************requeset end********************************')
    }
}