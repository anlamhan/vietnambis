let express = require('express');
let router = express.Router();
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

//services
let businessSys = require('../service/BusinessSys');

router.get('/page/:pageNo', function (req, res, next) {
  var params = {
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0
  }
  try {
    businessSys.list(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/search/:keyword', function (req, res, next) {
  var params = {
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0,
    keyword: req.params.keyword || ''
  }
  try {
    businessSys.search(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/province/:id/:pageNo', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  var params = {
    id: req.params.id || 0,
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0,
    type: 'province',
  }
  try {
    //console.log(req.query.id)
    businessSys.getBusinessesBy(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/district/:id/:pageNo', function (req, res, next) {
  var params = {
    id: req.params.id || 0,
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0,
    type: 'district',
  }
  try {
    //console.log(req.query.id)
    businessSys.getBusinessesBy(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/getdaybusinessbydistrict/:id/:date/:page', function (req, res, next) {
  var params = {
    id: req.params.id || 0,
    date: req.params.date || 0,
    scope: req.query.scope || '1',
    pageNo: req.params.page - 1 || 0
  }
  try {
    console.log(req.query.id)
    businessSys.getDayBusinessbyDistrict(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/commune/:id/:pageNo', function (req, res, next) {
  var params = {
    id: req.params.id || 0,
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0,
    type: 'commune',
  }
  try {
    //console.log(req.query.id)
    businessSys.getBusinessesBy(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});
router.get('/industry/:id/:pageNo', function (req, res, next) {
  var params = {
    id: req.params.id || 0,
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0,
    type: 'industry',
  }
  try {
    //console.log(req.query.id)
    businessSys.getBusinessesBy(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/getbusiness/:id/:pageNo', function (req, res, next) {  
  var params = {
    id: req.params.id.replace('.html','') || 0,
    scope: req.query.scope || '',
    pageNo: req.params.pageNo || 0,
    type: 'industry',
  }
  try {    
     //console.log(req.params.id)
  //businessSys.getBusinessById(params, result => res.json(result))
     client.get(params.id, function (error, data) { 
       if (error) {
           console.log(error);
           throw error;
       }
       if (data) {
         res.send(data); //return cached data
       } else {
        //businessSys.getBusinessById(params, data => res.json(data))
        businessSys.getBusinessById(params, function(data){          
          res.json(data)
          client.setex (params.id, 3600, JSON.stringify(data))//set cached
        })        
       }      
   });
    
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/detail/:id', (req, res, next) => {
  try {        
    businessSys.getBusinessInfo(req.params.id, result => res.json(result))    
  } catch (error) {
    res.json({ code: 500, message: error+ '-Program error！' })
  }
});

router.get('/count/:scope', (req, res, next) => {
  let scope = req.params.scope || '';
  try {
    businessSys.getBusinessCount(scope, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: error + 'Program error！' })
  }
});
router.get('/geturls/:scope', (req, res, next) => {
  let scope = req.params.scope || '';
  try {
    businessSys.getUrls(scope, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: error + 'Program error！' })
  }
});

router.get('/countby/:id/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  var params = {
    id: req.params.id || 0,
    scope: req.query.scope || '',
    type: req.query.type || 'province'  
  }
  try {
    businessSys.getBusinessCountBy(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: error + 'Program error！' })
  }
});
router.get('/countbyfeatured/', (req, res, next) => {   
  try {
    businessSys.getCountByFeatured(result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: error + 'Program error！' })
  }
});

router.get('/getbusinessbyfeatured/:pageNo', function (req, res, next) {
  var params = {    
    pageNo: req.params.pageNo || 0    
  }
  try {
    //console.log(req.query.id)
    businessSys.getBusinessByFeatured(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/getbusinessbydate/:date/:pageNo', function (req, res, next) {
  var params = {    
    date: req.params.date || getdate(),
    pageNo: (req.params.pageNo-1) || 0    
  }
  try {
    //console.log(req.query.id)
    businessSys.getBusinessByDate(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/getbusinessbyname/', function (req, res, next) {
  
  var params = {    
    name: req.query['name'] || '',
    pageNo: req.query['page'] || 0    
  }
  try {
    //console.log(req.params.name)
    businessSys.getBusinessByName(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: 'Program error！' })
  }
});

router.get('/countbusinessbydate/:date', (req, res, next) => {   
  var params = {    
    date: req.params.date || 0    
  }
  try {
    businessSys.countBusinessByDate(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: error + 'Program error！' })
  }
});

router.get('/countbusinessbyname/:name', (req, res, next) => {   
  var params = {    
    name: req.params.name || 0    
  }
  try {
    businessSys.countBusinessByName(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: error + 'Program error！' })
  }
});

router.get('/countdaybusinessbydistrict/:id/:date', (req, res, next) => {   
  var params = {    
    id: req.params.id || 0,
    date: req.params.date || '',
    scope: req.query.scope || '1',
  }
  try {
    businessSys.countDayBusinessbyDistrict(params, result => res.json(result))
  } catch (error) {
    res.json({ code: 500, message: error + 'Program error！' })
  }
});

router.post('/add', (req, res, next) => {
   try {
    //console.log(req.body)
     return businessSys.addBiz(req.body, result => res.json(result))
     //console.log(result)     
   } catch (error) {
    return res.json({ code: 500, message: 'Program error！' })
   }
});

router.post('/updatecapital/:id/:capital', (req, res, next) => {
  try {
    var params = {
      id: req.params.id || 0,
      capital: req.params.capital || 0,      
    }
    // console.log(params.capital)
    // console.log(params.id)     
    return businessSys.updateCapital(params, result => res.json(result))
    //console.log(result)     
  } catch (error) {
   return res.json({ code: 500, message: 'Program error！' })
  }
});

router.post('/update', (req, res, next) => {
   try {          
     return businessSys.updateBusiness(req.body.business, result => res.json(result))
   } catch (error) {   
    console.error(res.data.message) 
     return res.json({ code: 500, message: 'Program error！' })
   }
 });

module.exports = router;
