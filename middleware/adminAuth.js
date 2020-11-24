import { isLogin } from '../util/assist'
const needAuth = require('../util/api.config').needAuth

export default function ({ isClient, isServer, route, req, res, redirect }) {
    //On the server to determine whether you need to log in
    if (isServer) {
        let cookies = req.cookies
        let path = req.originalUrl;

        if (path.indexOf('admin') > 0 && !cookies.token) {
            redirect('/login')
        }
    }
    //Read on the client whether you need to log in
    if (isClient) {
        if (route.path.indexOf('admin') > 0 && !isLogin()) {
            redirect('login')
        }
    }
}