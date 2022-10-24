const mysql = require('mysql')

class ConnectMysql{
    constructor(options) {
        this.Pool = null
        this.options = options
        this.options.charset = options.charset || 'utf8mb4'
        this.options.connectionLimit = options.connectionLimit || 100
        this.options.queueLimit      = options.queueLimit || 10000
        this.options.multipleStatements      = options.multipleStatements || true
        this.ConnectDB()
    }
    ConnectDB() {
        try {
            this.Pool = mysql.createPool(this.options)
        } catch (error) {
            throw new Error("connect DB error!!")
        }
    }
    exc_query(sqlString, values) {
        var self = this
        if(!self.Pool) {
            self.ConnectDB()
        }
        if(self.Pool._close) {
            throw Error("db connection Pool closed")
        }
        return new Promise((resolve, reject) => {
            self.Pool.getConnection(function(err, conn) {
                if(err) {
                    reject(err)
                    return
                }
                if(!conn) {
                    console.error("sorry connect database fail!!")
                    reject(err)
                    return
                }

                if(values && Array.isArray(values)) {
                    conn.query(sqlString, [values], (err, rows) => {
                        if(err) {
                            console.error(`${sqlString} err:`,err)
                            reject(err)
                            return
                        }
                        conn.release()
                        resolve(self.convertRows(rows))
                    })
                }else{
                    conn.query(sqlString, (err, rows) => {
                        if(err) {
                            console.error(`${sqlString} err:`,err)
                            reject(err)
                            return
                        }
                        conn.release()
                        resolve(self.convertRows(rows))
                    });
                }
            })
        })
    }
    transactions() {
        var self = this;
        if(!self.Pool) {
            self.ConnectDB();
        }
        if(self.Pool._close) {
            throw Error("db connection Pool closed");
        }
        return new Promise((resolve, reject) => {
            self.Pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err)
                    return
                }
                if(!connection) {
                    console.error("sorry connect database fail!!")
                    reject(err)
                    return
                }
                connection.beginTransaction(function(err) {
                    if (err) {
                        console.error("beginTransaction fail!!")
                        reject(err)
                    }
                    connection.exc_query = function(sql) {
                        return new Promise((resolve, reject) => {
                            connection.query(sql, (error, results, fields) => {
                                if(error) {
                                    reject(error)
                                }
                                console.log('事物结果', results)
                                resolve(self.convertRows(results))
                            })
                        })
                    }
                    resolve(connection)
                  })
            })
        })
    }
    convertRows(rows) {
        if(!(rows instanceof Array)) {
            return [rows]
        }

        if(rows[0] && (rows[rows.length -1] instanceof Array)) {
            return rows[rows.length - 1]
        }
        return rows
    }
}

module.exports = ConnectMysql
