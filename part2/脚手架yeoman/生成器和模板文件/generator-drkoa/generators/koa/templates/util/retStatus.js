/**
 * 请求返回码
 *
 * @enum {number}
 */
class RetCode {}
    /**
     * 服务器执行异常
     */
    RetCode.ERR_SERVER_EXCEPTION = -500
    /**
     * 参数错误
     */
    RetCode.ERR_CLIENT_PARAMS_ERR = -400

    /**
     * 数据重复
     */
    RetCode.ERR_DATA_REPEAT = -401
    /**
     * 数据不对
     */
    RetCode.ERR_PRIVILEGE = -402
    /**
     * 登录过期
     */
    RetCode.TOKEN_EXPIRED = -50014;
    /**
     * 无效TOKEN Illegal token
     */
    RetCode.ILLEGAL_TOKEN = -50008;
    /**
     * 没有权限
     */
     RetCode.ERR_PERMISSION = -50009;
    /**
     * 请求成功
     */
    RetCode.SUC_OK = 0

  /**
   * 请求返回信息
   *
   * @export
   * @class RetMsg
   */
  class RetMsg {}
    /**
     * 请求成功
     *
     * @static
     */
    RetMsg.SUC_OK = "success";
    /**
     * 服务器执行异常
     *
    */
    RetMsg.ERR_SERVER_EXCEPTION = "服务器错误";
    /**
     * 参数错误
     *
    */
    RetMsg.ERR_CLIENT_PARAMS_ERR = "参数错误";

    /**
     * 数据重复
    */
    RetMsg.ERR_DATA_REPEAT = "数据重复";
    /**
     * 数据互斥
    */
    RetMsg.ERR_DATA_BMUTEX = "数据在黑名单中已存在,请先删除！";
    /**
     * 数据互斥
     * @RetMsg.
     * */
    RetMsg.ERR_DATA_WMUTEX = "数据在白名单中已存在,请先删除！";

    /**
     * 验证失败
     *
     * @RetMsg.
    */
    RetMsg.TOKEN_EXPIRED = "登录过期，请重新登陆！";
    /**
     * 验证失败
    */
    RetMsg.ERR_PRIVILEGE = "用户名活密码错误，请重新操作！";
    /**
     * 无效TOKEN Illegal token
     */
    RetCode.ILLEGAL_TOKEN= "无效登录TOKEN";
    /**
     * 无效TOKEN Illegal token
     */
     RetCode.ERR_PERMISSION= "没有权限访问";

module.exports = {
  RetCode: RetCode,
  RetMsg: RetMsg
}