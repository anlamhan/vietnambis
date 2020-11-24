import Commune from '../models/Commune'
let async = require('async')

let communeModel = new Commune();

let getCommunes = callback => {
    communeModel.list((err, districts) => {
       
        if (err) {
            return callback({ code: 404, message: err + '- no result' });
         }
        callback({ code: 404, message: 'success', list: districts });
    });
}

let getCommune = (districtId, callback) => {
    communeModel.one(districtId, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    });
}

let searchCommuneByName = (communeName, callback) => {
    communeModel.search(communeName, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    })
}

let getCommunesByDistrict = (districtId, callback) => {
    communeModel.getCommunesByDistrict(districtId, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    })
}

module.exports.getCommunes = getCommunes;
module.exports.getCommune = getCommune;
module.exports.searchCommuneByName = searchCommuneByName;
module.exports.getCommunesByDistrict = getCommunesByDistrict;
//module.exports.addTag = addTag;
