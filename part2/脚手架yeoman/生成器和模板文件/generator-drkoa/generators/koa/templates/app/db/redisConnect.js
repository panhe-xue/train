const redis = require('redis')
const ms = require('../../ms')
const options = require('./redisOptions')
const option = process.env.NODE_ENV === 'development' ? options.dev : options.pro
/**
 * redis类，操作redis常用封装
 */
class _redis {
    constructor() {
        try {
            this.init()
            .then(()=> {
                ms.logs.info('connect redis ready:', option)
            })
            .catch((error) => {
                ms.logs.error('connect redis happened error', error)
            })
        } catch (error) {
            ms.logs.error(error)
        }
    }
    init() {
        const self = this
        return new Promise((resolve, reject) => {
            this.redisClient = redis.createClient(option.port, option.host, {
                password: option.password
            })
            this.redisClient.on('error', function(error) {
                self.redisClient = null
                reject(error)
            })
            this.redisClient.on('ready', function() {
                resolve(true)
            })
        })
    }
    _set(method, key, value) {
        const self = this
        return new Promise((resolve, reject) => {
            if(!self.redisClient) {
                this.init()
                .then(()=> {
                    ms.logs.info('connect redis ready:')
                })
                .catch((error) => {
                    ms.logs.error('connect redis happened error', error)
                    reject(error)
                })
            }
            self.redisClient[method](key, value, function(error, result) {
                if(error) {
                    reject(error)
                } else{
                    resolve(result)
                }
            })
        })
    }
    _get(method, key) {
        const self = this
        return new Promise((resolve, reject) => {
            if(!self.redisClient) {
                this.init()
                .then(()=> {
                    ms.logs.info('connect redis ready:')
                })
                .catch((error) => {
                    ms.logs.error('connect redis happened error', error)
                    reject(error)
                })
            }
            self.redisClient[method](key, function(error, result) {
                if(error) {
                    reject(error)
                } else{
                    resolve(result)
                }
            })
        })
    }
    multi(steps) {
        const self = this
        return new Promise((resolve, reject) => {
            if(!self.redisClient) {
                this.init()
                .then(()=> {
                    ms.logs.info('connect redis ready:')
                })
                .catch((error) => {
                    ms.logs.error('connect redis happened error', error)
                    reject(error)
                })
            }
            self.redisClient.multi(steps)
            .exec(function(error, result) {
                if(error) {
                    reject(error)
                    ms.logs.error('redis 的事物执行错误')
                } else{
                    resolve(result)
                }
                ms.logs.info('redis 的事物执行完成')
            })
        })
    }
    setex(key, time, value) {
        const self = this
        return new Promise((resolve, reject) => {
            if(!self.redisClient) {
                this.init()
                .then(()=> {
                    ms.logs.info('connect redis ready:')
                })
                .catch((error) => {
                    ms.logs.error('connect redis happened error', error)
                    reject(error)
                })
            }
            self.redisClient.setex(key, time, value, function(error, result) {
                if(error) {
                    reject(error)
                } else{
                    resolve(result)
                }
            })
        })
    }
    // 上锁 timeout s
    async lock(key, time) {
        const self = this
        try {
            const currentTime = parseInt(new Date().getTime())
            const lock = await self._set('setnx', key, time)
            if(lock) {
                return 1
            }
            // 过期
            const currentValue = await self._get('get', key)
            if( currentValue < currentTime) {
                const oldValue = await self._set('getset', key, time)
                if(oldValue == currentValue) {
                    return 1
                }
            }
        } catch (error) {
            console.log(error)
            return 0
        }
        return 0
    }
    // 解锁
    async unlock(key, time) {
        const currentValue = await this._get('get', key)
        if(currentValue == time) {
            await this._get('del', key)
        }
    }
}
module.exports = _redis