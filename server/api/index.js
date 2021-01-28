//let jwtAuth = require('../middleware/jwtAuth')

module.exports = app => {

    //chan dang nhap
    //app.use('/api', jwtAuth)

    app.get('/api', (req, res) => {
        res.json({ message: 'Welcome to our APIs！' });
    })
    app.use('/api/user', require('./user'))
    app.use('/api/post', require('./post'))
    app.use('/api/tag', require('./tag'))
    app.use('/api/post/tag', require('./postTag'))
    app.use('/api/business', require('./business'))
    app.use('/api/province', require('./province'))
    app.use('/api/district', require('./district'))
    app.use('/api/commune', require('./commune'))
    app.use('/api/search', require('./search'))
    app.use('/api/industry', require('./industry'))
}