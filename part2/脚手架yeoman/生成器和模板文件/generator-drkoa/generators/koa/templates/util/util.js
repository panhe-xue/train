const fs = require('fs')
let logs = require('./log')
const crypto = require('crypto')
const xml2js = require('xml2js')

/**
 * 生成字符md5加密数据
 * @param {加密字符串} str
 */
function genMD5(str) {
    let md5sum = crypto.createHash('md5')
    md5sum.update(str)
    str = md5sum.digest('hex')
    return str
}

/**
 * 随机生成多少位[1-9a-zA-Z]值
 */
function genCookieVal () {
    let conArr = [
        1,2,3,4,5,6,7,8,9,0,
        'a','b','c','d','e','f','g','h','j','k','l','m','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','J','K','L','M','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ]
    let res = []
    for (let index = 0; index < 15; index++) {
        const i = Math.round(genRandom(0, conArr.length))
        const element = conArr[i]
        res.push(element)
    }
    return res.join('')
}

/**
 * 随机生成2者间的数据
 * @param {开始数据} beginNum
 * @param {结束数据} endNum
 */
function genRandom(beginNum, endNum) {
    return Math.random()*(endNum - beginNum) + beginNum
}
function isObject(obj) {
    return '[object Object]' === Object.prototype.toString.call(obj)
}
function isUnlink(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                throw err
                reject(err)
                return
            };
            resolve(true)
            logs.info(filePath, '文件已删除');
          });
    })
}
function isFunction(obj) {
    return '[object Function]' === Object.prototype.toString.call(obj)
}
function isArray(obj) {
    return '[object Array]' === Object.prototype.toString.call(obj)
}

/**
 * 递归循环(直到有数据,闭包不用)
 */
function recursion (callback, rule, arg1, arg2, arg3) {
    var res = null;
    if(Object.prototype.toString(callback) === "[object AsyncFunction]") {
        return async () => {
            res = await callback(args1, args2, arg3)
            if(!res || (Array.isArray(res) && res.length ===0 ) || res === undefined || res === null)
            {
                var { arg1, arg2, arg3 } = rule(arg1, arg2, arg3)
                recursion(callback, rule, arg1, arg2, arg3)()
            } else {
                return res
            }
        }
    } else {
        return () => {
            res = callback(args1, args2, arg3)
            if(!res || (Array.isArray(res) && res.length ===0 ) || res === undefined || res === null)
            {
                var { arg1, arg2, arg3 } = rule(arg1, arg2, arg3)
                recursion(callback, rule, arg1, arg2, arg3)()
            } else {
                return res
            }
        }
    }
}

function get_nonce_str (num) {
    var str_list = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    var result = ''
    while(num--) {
        var rand = Math.random()
        var n = Math.round(100000 * rand) % 36
        result += str_list[n]
    }

    return result
}
function generate_weixin_sign(obj, cp_key) {
    var sorted_keys = Object.keys(obj).sort()
    var plaintext = ''
    for(var i in sorted_keys) {
        var key = sorted_keys[i]

        if(key != 'sign' && obj[key] != '') {
            plaintext += key + '=' + obj[key] + '&'
        }
    }

    plaintext += 'key=' + cp_key
    var ciphertext = genMD5(plaintext).toUpperCase()
    return {
        plaintext  : plaintext,
        ciphertext : ciphertext
    }
}

const TOOL = {
    isUnlink,
    isFunction,
    isArray,
    isObject,
    genMD5,
    genCookieVal,
    genRandom,
    recursion,
    get_nonce_str,
    generate_weixin_sign
}

module.exports = TOOL