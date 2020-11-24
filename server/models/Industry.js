let db = require('../util/DBUtil');

export default class Industry {    
    list(callback) {
        let sql = "SELECT id, code, english_name, industry_name, slug, vnslug FROM industries where slug is not null order by is_featured";
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }

    listFeatured(callback) {
        let sql = "SELECT id, code, english_name, industry_name, slug, vnslug FROM industries where slug is not null order by is_featured limit 30";
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    
    one(industryId, callback) {
        let sql = "SELECT id, code, english_name,industry_name, slug, vnslug FROM industries where id = ?";
        db.query(sql, [industryId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0]);
        });
    }
    
    searchIndustry(name, callback) {
        let sql = "SELECT id, english_name,industry_name, slug, vnslug FROM industries where english_name like ? LIMIT 6";
        db.query(sql, ['%' + name + '%'], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }    

}
