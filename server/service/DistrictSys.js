import District from '../models/District'
let async = require('async')

let districtModel = new District();

let getDistricts = callback => {
    districtModel.list((err, districts) => {        
        if (err) {
            return callback({ code: 404, message: err + '- no result' });
         }
        callback({ code: 200, message: 'success', list: districts });
    });
}

let getDistrict = (districtId, callback) => {
    districtModel.one(districtId, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    });
}

let searchDistrictByName = (districtName, callback) => {
    districtModel.search(districtName, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    })
}

let getDistrictsByProvince = (provinceId, callback) => {
    districtModel.getByProvince(provinceId, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    })
}

module.exports.getDistricts = getDistricts;
module.exports.getDistrict = getDistrict;
module.exports.searchDistrictByName = searchDistrictByName;
module.exports.getDistrictsByProvince = getDistrictsByProvince;
//module.exports.addTag = addTag;
