let jwt = require('jwt-simple')
let moment = require('moment')
let jwtSecret = require('../util/server.config').jwtSecret

import User from '../models/User'

let userModel = new User();

let auth = (user, callback) => {
    if (user.account.trim() == '') {
        return callback({ code: 403, message: 'Tên đăng nhập không chính xác' });
    }
    if (user.password.trim() == '') {
        return callback({ code: 403, message: 'Mật khẩu không đúng' });
    }
    userModel.auth(user, (err, user) => {
        if (err) {
            return callback({ code: 404, message: 'Đăng nhập thất bại' });
        }
        if (user.length === 1) {            
            let expires = moment().add(7, 'days').valueOf();

            let token = jwt.encode({
                uid: user[0].id,
                exp: expires
            }, jwtSecret)

            return callback({ code: 200, message: 'success', token: token });
        }
        callback({ code: 404, message: '登陆失败' });
    });
}

module.exports.auth = auth;
