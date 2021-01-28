let express = require('express');
let router = express.Router();


//const express = require('express');
//const app = express();
const elasticsearch = require('elasticsearch');
//const cors = require('cors');
//const bodyParser = require('body-parser');

//app.set('port', process.env.PORT || 5000 );
//app.use(cors());
//app.use(bodyParser.json());

const client = new elasticsearch.Client({
    host: '27.72.104.59:9200',
    //host: 'localhost:9200',
    log: 'error'
 });

client.ping({ requestTimeout: 30000 }, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

router.get('/search', function (req, res, next) {       
    try {
      //console.log(req.query['q'])
        if(req.query['p'] != 'all'){
        let body = {
            size: 20,
            from: req.query['index'] * 20 || 0,
            query: {
              bool:{
                should:{
                  multi_match: {
                    query:    req.query['q'],
                    fields: [ 'tax_id', 'full_name','english_name' ],
                    type:     'cross_fields',
                    analyzer: 'standard'
                   }
                  
                  //  match: {
                  //    english_name: {
                  //        query: req.query['q'],
                  //        //fuzziness: 1
                  //     }                       
                  //  },                  
                //    match: {
                //      tax_id: {
                //          query: req.query['q'],
                //          //fuzziness: 1
                //       }                       
                //  }
              // multi_match:{
              //   query: req.query['q'],
              //   fields:['full_name','english_name','tax_id'],
              //   operator:   'or'
              // }
              },
                filter: {                  
                  term: { province_id : req.query['p'] }                  
                }
              }            
              }
          }
         console.log(body)
          client.search({index:'vietnambis', body:body, type:'characters_list'})
          .then(results => {
                  res.send(results.hits.hits);
              
          })
          .catch(err=>{
            console.log(err)
            res.send([]);
          });
        }
        else
        {
          let body = {
            size: 20,
            from: req.query['index'] * 20 || 0,//index phai = 0 truoc 
            query: {
                bool:{
                  should:{
                   multi_match: {
                     query:    req.query['q'],
                     fields: [ 'tax_id', 'full_name','english_name' ],
                     type:     'cross_fields',
                     analyzer: 'standard'
                    }
                    }                   
                  } 
              // bool:{ 
              //   should:{                  
              //    match:{
              //     english_name: {query: req.query['q']} 
              //     },
              //     match:{
              //       full_name: {query: req.query['q']} 
              //       },
              //       match:{
              //         tax_id: {query: req.query['q']}
              //         },
              //   }
              // }
              }
          }
          //console.log()
         
          client.search({index:'vietnambis', body, type:'characters_list'})
          .then(results => {
                  res.send(results.hits.hits);
              
          })
          .catch(err=>{
            console.log(err)
            res.send([]);
          });
        }

    } catch (error) {
      res.json({ code: 500, message: 'Program error！' })
    }
  });

  module.exports = router;