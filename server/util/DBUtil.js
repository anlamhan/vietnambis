let mysql = require('mysql');
const mysqlCfg = require('./server.config').db

let pool = mysql.createPool(mysqlCfg);

let query = function (sql, params, callback) {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err)
                return callback(true);
            }            
            connection.query(sql, params, (err, result) => {                
                connection.release();
                if (err) {
                    console.error('db error17:' + err)
                    return callback(true);
                }
                callback(false, result);
            });
        });
    } catch (err) {
        console.error('db error24:' + err)
        return callback(true);
    }
}

module.exports.query = query;

