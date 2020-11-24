let express = require('express');
let router = express.Router();

//services
let industrySys = require('../service/IndustrySys');

router.get('/list', (req, res, next) => {
  try {
    industrySys.getIndustries(result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});
router.get('/featured', (req, res, next) => {
  try {
    industrySys.getFeaturedIndustries(result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/detail/:id', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  try {
    industrySys.getIndustry(req.params.id, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/industry/:industryName', (req, res, next) => {
  try {
    industrySys.searchIndustryByName(req.params.industryName, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

module.exports = router;
