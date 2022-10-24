var jwt = require('jsonwebtoken');
const secret = 'adsfasdfashl*^(fashfa'
/**
 * 生成token的类
 */
class JWT {
    constructor() {
    }
    genTokenKey(data) {
        const created = Math.floor(Date.now() / 1000)  // s

        var result = jwt.sign({
            data,
            exp: (process.env.NODE_ENV === 'development' ? (created + 60 * 60 * 4) : (created + 60 * 60 * 24 * 2)) // 2d测试过期
        }, secret)
        return result
    }
    verifyTokenKey(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decode) => {
                if(err) {
                    reject(err)
                } else {
                    let  { data, exp } = decode
                    let current = Math.floor(Date.now() / 1000)
                    if (exp >= current) {
                        resolve(data)
                    } else {
                        reject('token过期')
                    }
                }
            })
        })
    }
}
module.exports = JWT