let db = require('../util/DBUtil');

export default class Province {    
    list(callback) {
        let sql = "SELECT id,province_name,vietnamese_name, slug FROM provinces WHERE is_active=1";
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    
    one(provinceId, callback) {
        let sql = "SELECT id, province_name, vietnamese_name, slug FROM provinces where id = ?";
        db.query(sql, [provinceId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0]);
        });
    }
    
    searchProvince(name, callback) {
        let sql = "SELECT id, province_name, vietnamese_name, slug FROM provinces where province_name like ? LIMIT 6";
        db.query(sql, ['%' + name + '%'], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    // addTag(tageName, callback) {
    //     let sql = 'INSERT INTO tags (name) VALUES (?)'
    //     db.query(sql, [tageName], (err, result) => {
    //         if (err) {
    //             return callback(true);
    //         }
    //         callback(false, result.insertId);
    //     });
    // }

}
