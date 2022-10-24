const mysql = require('mysql')
class Dao {
    constructor(app) {
        this.app = app
        this.mysql = mysql
    }

}
module.exports = Dao