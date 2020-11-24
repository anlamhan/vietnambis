let express = require('express');
let router = express.Router();

//services
let postSys = require('../service/PostSys');

router.get('/page/:pageNo', function (req, res, next) {
  var params = {
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0
  }
  try {    
    postSys.list(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Lỗi chương trình！' })
  }
});

router.get('/detail/:id', (req, res, next) => {
  try {
    postSys.getPostById(req.params.id, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Lỗi chương trình！' })
  }
});
router.get('/detailBySlug/:slug', (req, res, next) => {
  try {    
    postSys.getPostBySlug(req.params.slug, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Lỗi chương trình！' })
  }
});

router.get('/list/:tagId', (req, res, next) => {
  try {
    postSys.getPostsByTagId(req.params.tagId, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Lỗi chương trình！' })
  }
});

router.get('/count/:scope', (req, res, next) => {
  let scope = req.params.scope || '';
  try {
    postSys.getPostCount(scope, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Lỗi chương trình！' })
  }
});

router.post('/add', (req, res, next) => {
  try {
    postSys.addPost(req.body.post, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Lỗi chương trình！' })
  }
});

router.post('/update', (req, res, next) => {
  try {
    postSys.updatePost(req.body.post, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Lỗi chương trình！' })
  }
});

module.exports = router;
