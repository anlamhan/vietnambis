import Province from '../models/Province'
//import PostTag from '../models/PostTag'
let async = require('async')

let provinceModel = new Province();
//let postTagModel = new PostTag();

let getProvinces = callback => {
    provinceModel.list((err, provinces) => {
        // if (err) {
        //     return callback({ code: 404, message: 'no result' });
        // }

        // async.eachSeries(tags, (tag, countCallback) => {
        //     postTagModel.postCountByTagId(tag.id, (err, count) => {
        //         if (err) {
        //             return countCallback(err)
        //         }
        //         tag.postNum = count;
        //         countCallback()
        //     });
        // }, (err) => {
        //     if (err) {
        //         return callback({ code: 404, message: 'no result' });
        //     }
        //     callback({ code: 404, message: 'success', list: tags });
        // });
        if (err) {
            return callback({ code: 404, message: err + '- no result' });
         }
        callback({ code: 404, message: 'success', list: provinces });
    });
}

let getProvince = (provinceId, callback) => {
    provinceModel.one(provinceId, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    });
}

let searchProvinceByName = (provinceName, callback) => {
    provinceModel.searchProvince(provinceName, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    })
}

// let addTag = (tagName, callback) => {
//     tagModel.addTag(tagName, (err, result) => {
//         if (err) {
//             return callback({ code: 404, message: 'insert fail' });
//         }
//         callback({ code: 200, message: 'success', insertId: result });
//     })
// }

module.exports.getProvinces = getProvinces;
module.exports.getProvince = getProvince;
module.exports.searchProvinceByName = searchProvinceByName;
//module.exports.addTag = addTag;
