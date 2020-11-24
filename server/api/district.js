let express = require('express');
let router = express.Router();

//services
let districtSys = require('../service/DistrictSys');

router.get('/list', (req, res, next) => {
  try {
    districtSys.getDistricts(result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/detail/:id', (req, res, next) => {
  try {
    districtSys.getDistrict(req.params.id, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/search/:districtName', (req, res, next) => {
  try {
    districtSys.searchDistrictByName(req.params.districtName, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/getbyprovince/:id', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    try {
        districtSys.getDistrictsByProvince(req.params.id, result => res.json(result))
    } catch (error) {
      res.json({ code: 500, message: 'Program error！' })
    }
  });

module.exports = router;
