const elasticsearch = require('elasticsearch');
const fs = require('fs');
//let businessSys = require('../service/BusinessSys');

const client = new elasticsearch.Client({
    hosts: [ 'http://192.168.1.3:9200']
    //hosts: [ 'http://localhost:9200']
});

 client.indices.create({
     index: 'vietnambusinesses'
 }, function(error, response, status) {
     if (error) {
         console.log(error);
     } else {
         console.log("created a new index", response);
     }
 });

const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
  
    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type
        }
      });
      bulkBody.push(item);
    });
  
client.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
         out of ${data.length} items`
      );
    })
    .catch(console.err);
  };

async function indexData() {    

    var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bongyeu@123",
  database: "vnbiz"
});

con.connect(function(err) {
  if (err) throw err;
  
    // con.query("SELECT id, slug, english_name, vietnamese_name, full_name, tax_id, english_address, province_id, district_id, commune_id, registration_number FROM businesses where id >=1400000 and id <1500000", function (err, result, fields) {
    //   if (err) throw err;    
    //   bulkIndex('vietnambis', 'characters_list', result);
    // });
    //1. backup database ve local
    //2. dem so luong total bussiness
    //3. chia cho 1000 duoc bao nhieu thay cho duoi day
    //4. chay len node elasticsearch.js
    var pre=1; var post = 1;
    for(var i = 1; i<=2156; i++)
    {
     post=1000*i;
     pre = post - 1000;
    con.query("SELECT id, slug, vnslug, english_name, vietnamese_name, full_name, tax_id, english_address, province_id, district_id, commune_id, registration_number, legal_representative, vn_legal_representative FROM businesses where id >="+pre+ " and id <" + post, function (err, result, fields) {
       if (err) throw err;    
       bulkIndex('vietnambusinesses', 'characters_list', result);
    });
  }
});
    // const articlesRaw = await fs.readFileSync('./data.json');
    // const articles = JSON.parse(articlesRaw);
    // console.log(`${articles.length} items parsed from data file`);
    
    //const listBiz = businessSys.list(params, result => res.json(result))
    //console.log(listBiz)
    
  }

  indexData();