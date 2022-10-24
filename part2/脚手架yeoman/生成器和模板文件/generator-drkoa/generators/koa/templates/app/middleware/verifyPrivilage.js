var ms = require('../../ms')
module.exports = () => {
    return async function(ctx, next) {
        let result = {
            ret: ctx.RetCode.ERR_PERMISSION,
            msg: ctx.RetMsg.ERR_PERMISSION,
            subMsg: '该操作没有访问权限'
        }
        /* const token = ctx._res;
        ms.logs.info("middleware verify privilage message:", ctx.originalUrl, token, ctx.query)
        var userId = req.session.userId || "";
        let uri = req.url;
        
        //处理权限情况
        acl.isAllowed(userId, req.path, '*')
        .then(allowed => {
            if(allowed) {
                next()
            }else {
                res.json({
                  ret: RetCode.ERR_PRIVILEGE,
                  msg: RetMsg.ERR_PRIVILEGE
                });
                return;
            }
        })
        .catch((e) => {
            res.json({
                ret: RetCode.ERR_PRIVILEGE,
                msg: RetMsg.ERR_PRIVILEGE,
                subMsg: e.message
            })
            return
        }) */
    }
}