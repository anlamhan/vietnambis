let db = require('../util/DBUtil');

export default class District {    
    list(callback) {
        let sql = "SELECT id,district_name, full_district_name, vietnamese_name, slug FROM districts where is_active=1";
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    
    one(districtId, callback) {
        let sql = "SELECT d.id, d.district_name, d.vietnamese_name, d.slug, d.province_id, d.full_district_name, p.province_name, p.slug as province_slug, p.vietnamese_name as vietnamese_province_name FROM districts d join provinces p on d.province_id = p.id where d.id = ?";
        db.query(sql, [districtId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0]);
        });
    }
    
    search(name, callback) {
        let sql = "SELECT id, district_name, full_district_name, slug FROM districts where is_active=1 and district_name like ? LIMIT 6";
        db.query(sql, ['%' + name + '%'], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } 

    getByProvince(provinceId, callback) {
        let sql = "SELECT id, district_name, full_district_name, vietnamese_name, slug FROM districts where is_active=1 and province_id = ?";
        db.query(sql, [provinceId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }      
}
