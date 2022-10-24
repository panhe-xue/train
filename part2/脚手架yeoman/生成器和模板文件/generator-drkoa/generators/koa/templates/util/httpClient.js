const request = require('request')
const util = require('./util')
const logs = require('./log')


const header = {
    "Content-type": 'application/json'
}
/**
 * options : {
 *   method: ''(*),
 *   url: ''(*),
 *   data: '',
 *   header: {},
 *   timeout: 10000
 * }
 * 请求类:get post-->josn post--> form 其他的类型需要另外封装
 */
class httpClient {
    constructor() {}
    async postWithInfo(requestInfo) {
        const options = this.setOptions(requestInfo)
        logs.info('http request options', options)
        let res = await this.req(options)
        return res
    }
    /**
     * 组装请求参数、待完善
     */
    setOptions (requestInfo) {
        let options = {
            method: requestInfo.method,
            url: requestInfo.url,
            dataType: requestInfo.dataType || 'json',
            headers: requestInfo.headers || header,
            timeout: httpClient.DEFAULT_TIMEOUT,
            agent: false,
            pool: {maxSockets: 200},
            forever: true
        }
        if (requestInfo.method.toString().toUpperCase() ===  'POST') {
            if(options.dataType.toString().toUpperCase() === 'JSON') {
                options.body = JSON.stringify(requestInfo.data) || null
            } else {
                options.form = requestInfo.data || null
            }
        } else {
            options.qs = requestInfo.data || null
        }
        return options
    }
    /**
     * 发送请求
     */
    req(options) {
        if (util.isFunction(httpClient.REQUEST_INTERCEPTOR)) {
            options = httpClient.REQUEST_INTERCEPTOR(options)
        } else if (util.isObject(httpClient.REQUEST_GLOBAL_OPTIONS)) {
            options = util.merge(httpClient.REQUEST_GLOBAL_OPTIONS, options)
        }
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                logs.info('http request result:', error, body)
                if(!error && response.statusCode === 200) {
                    try {
                        body = JSON.parse(body)
                        resolve(body)
                    } catch (error) {
                        resolve(body)
                    }
                } else {
                    reject(error)
                }
            })
        })
    }
    /**
     * request结合pipe保存文件
     * @param options options
     */
    httpSaveFile(options, path, encoding) {
        const header = {
            "cache-control": "no-cache",
            "Content-type": "application/json"
        }
        if (util.isFunction(httpClient.REQUEST_INTERCEPTOR)) {
            options = httpClient.REQUEST_INTERCEPTOR(options)
        } else if (util.isObject(httpClient.REQUEST_GLOBAL_OPTIONS)) {
            options = util.merge(httpClient.REQUEST_GLOBAL_OPTIONS, options)
        }
        logs.info('each http POST arg:', "url", options.url, '.data:', options.data);
        return new Promise((resolve, reject) => {
            request({
                timeout: 5000, //超时时间
                method: 'POST',
                url: options.url,
                json: true,
                forever: true,
                headers: options.header ? options.header : header,
                form: options.data ? JSON.stringify(options.data) : null
            })
            .on("response", function(response) {
                logs.info("request 保存文件httpSaveFile result from request module::", response.headers, response.statusCode)
                if (response.statusCode === 200) {
                    resolve(true)
                }
            })
            .on("error", function(error) {
                if(error) {
                    reject(error);
                }
            })
            .pipe(ms.fs.createWriteStream(path), { encoding: encoding || "utf8" })
        })
    }
}
httpClient.DEFAULT_TIMEOUT = 10000
httpClient.REQUEST_GLOBAL_OPTIONS = null
httpClient.REQUEST_INTERCEPTOR = null
module.exports = httpClient