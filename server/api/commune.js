let express = require('express');
let router = express.Router();

//services
let communeSys = require('../service/CommuneSys');

router.get('/list', (req, res, next) => {
  try {
    communeSys.getCommunes(result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/detail/:id', (req, res, next) => {
  try {
    communeSys.getCommune(req.params.id, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/search/:communeName', (req, res, next) => {
  try {
    communeSys.searchCommuneByName(req.params.districtName, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/getbydistrict/:id', (req, res, next) => {
    try {
        communeSys.getCommunesByDistrict(req.params.id, result => res.json(result))
    } catch (error) {
      res.json({ code: 500, message: 'Program error！' })
    }
  });

module.exports = router;
