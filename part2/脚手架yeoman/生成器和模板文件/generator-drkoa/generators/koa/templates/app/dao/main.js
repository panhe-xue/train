
const Dao = require('.')
/**
 * 登陆类
 */
class MainDao extends Dao {

    constructor(app) {
        super(app)
    }
    /**
     * test
     */
    async test() {
        let sql = `
            select * from ${MainDao.TABLE_NAME};
        `
        sql = this.mysql.format(sql)
        this.app.logs.info("test from db sql:", sql)

        try {
            let rows = await this.app.mysql['test'].exc_query(sql)
            return rows || []
        } catch (error) {
            this.app.logs.error(sql , "error: ", error)
            throw new Error(error)
        }
    }
}

MainDao.TABLE_NAME = "test"

module.exports = MainDao