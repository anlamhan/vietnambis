let db = require('../util/DBUtil');

export default class Commune {    
    list(callback) {
        let sql = "SELECT id,commune_name, full_commune_name, vietnamese_name, slug FROM communes WHERE is_active=1";
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }
    
    one(districtId, callback) {
        let sql = "SELECT c.id, c.commune_name, c.full_commune_name, c.vietnamese_name, c.slug, c.category, c.district_id, d.district_name, d.full_district_name, d.vietnamese_name as vietnamese_district_name, d.slug as district_slug, c.province_id, p.province_name, p.vietnamese_name as vietnamese_province_name, p.slug as province_slug FROM communes c join districts d on c.district_id = d.id join provinces p on c.province_id = p.id where c.id = ?";
        db.query(sql, [districtId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result[0]);
        });
    }
    
    search(name, callback) {
        let sql = "SELECT id, commune_name, full_commune_name, vietnamese_name slug FROM communes where is_active=1 and commune_name like ? LIMIT 6";
        db.query(sql, ['%' + name + '%'], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    } 

    getCommunesByDistrict(districtId, callback) {
        let sql = "SELECT id, commune_name, full_commune_name,vietnamese_name, slug FROM communes where is_active=1 and district_id = ?";
        db.query(sql, [districtId], (err, result) => {
            if (err) {
                return callback(true);
            }
            callback(false, result);
        });
    }      
}
