let express = require('express');
let router = express.Router();

//services
let provinceSys = require('../service/ProvinceSys');

router.get('/list', (req, res, next) => {
  try {
    provinceSys.getProvinces(result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/detail/:id', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  try {
    provinceSys.getProvince(req.params.id, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/search/:provinceName', (req, res, next) => {
  try {
    provinceSys.searchProvinceByName(req.params.provinceName, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

module.exports = router;
