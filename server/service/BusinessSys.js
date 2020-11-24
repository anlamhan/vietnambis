import Business from '../models/Business';
import Commune from '../models/Commune';
let async = require('async');

let businessModel = new Business();
let communeModel = new Commune();
let list = (params, callback) => {
businessModel.list(params, (err, businesses) => {        
        if (err) {
                    return callback({ code: 404, message: err + '- no result' });
                 }
                callback({ code: 404, message: 'success', list: businesses });
    });
}

let search = (params, callback) => {
    businessModel.search(params, (err, businesses) => {        
            if (err) {
                        return callback({ code: 404, message: err + '- no result' });
                     }
                    callback({ code: 404, message: 'success', list: businesses });
        });
    }

let getBusinessesBy = (params, callback) => {
    businessModel.getBusinessesBy(params, (err, businesses) => {           
            if (err) {
                        return callback({ code: 404, message: err + '- no result' });
                     }
                    callback({ code: 404, message: 'success', list: businesses });
        });
    }
    let getDayBusinessbyDistrict = (params, callback) => {
        businessModel.getDayBusinessbyDistrict(params, (err, businesses) => {           
                if (err) {
                            return callback({ code: 404, message: err + '- no result' });
                         }
                        callback({ code: 404, message: 'success', list: businesses });
            });
        }
    let getBusinessInfo = (businessId, callback) => {
        businessModel.one(businessId, (err, result) => {
            if (err) {
                return callback({ code: 404, message: 'no result' });
            }
            callback({ code: 200, message: 'success', list: result });
        });
        }

    let getUrls = (params, callback) => {
        businessModel.getUrls(params, (err, businesses) => {           
                if (err) {
                            return callback({ code: 404, message: err + '- no result' });
                         }
                        callback({ code: 404, message: 'success', businesses });
            });
        }

let getBusinessById = (params, callback) => {
    async.waterfall([
        oneCallback => {
            businessModel.one(params.id, (err, business) => {
                if (err) {
                    return oneCallback(err);
                }
                if (business.length == 0) {
                    return oneCallback('not found this business');
                }
                oneCallback(null, business);
            });
        },
        (arg1, industryCallback) => {
            businessModel.getBusinessesByIndustry(arg1[0].industry_id, params, (err, businesses) => {
                if (err) {
                    return industryCallback(err);
                }
                arg1[0].businesses = businesses;
                industryCallback(null, arg1);
            });
        },
        (arg1, branchCallback) => {
            businessModel.getBranchesByBusiness(arg1[0].id, params, (err, branches) => {
                if (err) {
                    return branchCallback(err);
                }
                arg1[0].branches = branches;
                branchCallback(null, arg1);
            });
        },
        (arg1, communeCallback) => {
            communeModel.getCommunesByDistrict(arg1[0].district_id, (err, communes) => {                
                if (err) {
                    return communeCallback(err);
                }
                arg1[0].communes = communes;
                communeCallback(null, arg1);
            });
        },
        (arg1, industriesCallback) => {
            businessModel.getIndustriesByBusiness(arg1[0].business_id, (err, industries) => {                           
                if (err) {
                    return industriesCallback(err);
                }
                arg1[0].industries = industries;
                industriesCallback(null, arg1);
            });
        },
        (arg1, parentCallback) => {                                      
             businessModel.getParentBusiness(arg1[0].parent_id, (err, parent) => {                           
                 if (err) {
                     return parentCallback(err);
                 }
                     arg1[0].parent = parent;
                     parentCallback(null, arg1);
                 });
             }
         
    ], (err, newBusiness) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
       return callback({ code: 200, message: 'success', list: newBusiness });
    });
}

let getBusinessCount = (scope, callback) => {
    businessModel.count(scope, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', result: result });
    });
}
let getBusinessCountBy = (params, callback) => {
    businessModel.countby(params, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', result: result });
    });
}
let getCountByFeatured = (callback) => {
    businessModel.countbyfeatured((err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', result: result });
    });
}
let getBusinessByFeatured = (params, callback) => {
    businessModel.getbyfeatured(params, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    });
}
let getBusinessByDate = (params, callback) => {
    businessModel.getBusinessByDate(params, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    });
}
let countBusinessByDate = (params, callback) => {
    businessModel.countBusinessByDate(params, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', result: result });
    });
}

let getBusinessByName = (params, callback) => {
    businessModel.getBusinessByName(params, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', list: result });
    });
}
let countBusinessByName = (params, callback) => {
    businessModel.countBusinessByName(params, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', result: result });
    });
}
let countDayBusinessbyDistrict = (params, callback) => {
    businessModel.countDayBusinessbyDistrict(params, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        callback({ code: 200, message: 'success', result: result });
    });
}
let addBiz = (biz, callback) => {    
    businessModel.insert(biz, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'insert fail' });
        }
        return callback({ code: 200, message: 'success', insertId: result });
        //console.log(result)
    })
}
let updateCapital = (params, callback) => {    
    businessModel.updateCapital(params.id, params.capital, (err, result) => {
        if (err) {
            return callback({ code: 404, message: 'no result' });
        }
        return callback({ code: 200, message: 'success', result: result });
    });
}
let updateBusiness = (business, callback) => {
     businessModel.update(business, (err, result) => {
          if (err) {
              return callback({ code: 404, message: 'no result' });
          }
        return callback({ code: 200, message: 'success', changedRows: result });
      });
    //console.log(business)
}
module.exports.list = list;
module.exports.getBusinessById = getBusinessById;
module.exports.getBusinessesBy = getBusinessesBy;
module.exports.getBusinessCountBy = getBusinessCountBy;
module.exports.getBusinessCount = getBusinessCount;
module.exports.getUrls = getUrls;
module.exports.addBiz = addBiz;
module.exports.getCountByFeatured = getCountByFeatured;
module.exports.countBusinessByDate = countBusinessByDate;
module.exports.getBusinessByFeatured = getBusinessByFeatured;
module.exports.getBusinessByDate = getBusinessByDate;
module.exports.getBusinessByName = getBusinessByName;
module.exports.countBusinessByName = countBusinessByName;
module.exports.updateCapital = updateCapital;
module.exports.updateBusiness = updateBusiness;
module.exports.getBusinessInfo=getBusinessInfo;
module.exports.search=search;
module.exports.getDayBusinessbyDistrict=getDayBusinessbyDistrict;
module.exports.countDayBusinessbyDistrict = countDayBusinessbyDistrict;
