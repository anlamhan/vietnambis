import Industry from '../models/Industry'
let async = require('async')

let industryModel = new Industry();

let getIndustries = callback => {
    industryModel.list((err, provinces) => {        
        if (err) {
            return callback({ code: 404, message: err + '- no result' });
         }
        callback({ code: 404, message: 'success', list: provinces });
    });
}

let getFeaturedIndustries = callback => {
    industryModel.listFeatured((err, industries) => {        
        if (err) {
            return callback({ code: 404, message: err + '- no result' });
         }
        callback({ code: 404, message: 'success', list: industries });
    });
}

let getIndustry = (industryId, callback) => {
    industryModel.one(industryId, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    });
}

let searchIndustryByName = (name, callback) => {
    industryModel.searchIndustry(name, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    })
}

module.exports.getIndustries = getIndustries;
module.exports.getFeaturedIndustries = getFeaturedIndustries;
module.exports.getIndustry = getIndustry;
module.exports.searchIndustryByName = searchIndustryByName;

