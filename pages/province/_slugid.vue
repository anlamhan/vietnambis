<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>{{province.province_name}} province / city</span> </div>
    <div class="section">
    <div class="nine columns">    
      <div class="title"><h1> {{province.province_name}}</h1></div>
      <div class="info">
        <p>All businesses in : {{province.province_name}} province / city</p>
      </div>
      <div class="content">
        <business-list :businesses="businesses"></business-list>
        <vue-page :total="count" :page="page" :path="'/province/'+province.slug+'-'+province.id+'/'" model="link"></vue-page>
      </div>      
      </div>
      <div class="three columns">        
      <district-list :districts="districts"></district-list>
    </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
//import timeago from 'timeago.js'
//import hljs from 'highlight.js'
import DistrictList from '~/components/DistrictList'
import BusinessList from '~/components/BusinessList'
import VuePage from '~/components/VuePage'

// let marked = require('marked');

// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false,
//   highlight: function (code) {
//     return hljs.highlightAuto(code).value;
//   }
// });

export default {
  async asyncData({ params, error }) {    
    //const page = 0        
    var n = params.slugid.lastIndexOf("-")
    var id = params.slugid.substring(n+1,params.slugid.lenght)
    let page = parseInt(params.id) || 1
    var host = process.env.baseUrl;
    let [provinceRes, districtRes, businessRes, countRes] = await Promise.all([
      axios.get(`${host}/api/province/detail/` + id),      
      axios.get(`${host}/api/district/getbyprovince/`+ id),
      axios.get(`${host}/api/business/province/${id}/${page}?scope=1`),
      axios.get(`${host}/api/business/countby/${id}?scope=1&type=province`)]   
    ).catch(err => {
      error({ statusCode: 400, message: err })
    })
     return {      
       province: provinceRes.data.list,      
       districts: districtRes.data.list,
       businesses: businessRes.data.list,
       count: countRes.data.result,
       page
     }    
  },
  components: {
    VuePage,
    BusinessList,
    DistrictList
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'This page lists all businesses in '+this.province.province_name+' province / city. ' + this.count + ' company profiles' },
        { name: 'keywords', content: this.keywords.join(',') }
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/province/'+this.province.slug+'-'+this.province.id}
      ]
    }
  },
  computed: {
    keywords() {
      let keywords = [this.province.province_name];      
      return keywords
    },
    title()
    {
      if(this.page > 1){
        return this.province.province_name + ' province / city | Page ' + this.page
      }else
      {
        return this.province.province_name + ' province / city'
      }
    }
  }
}
</script>

<style scoped>
.page {
  box-shadow: none;
}

.post {
  box-shadow: 0 0 6px rgba(100, 100, 100, 0.4);
}

.poster {
  height: 420px;
  background: no-repeat center / cover;
}

.title {
  padding: 4px;
  font-size: 14px;
  text-align: center;
}

.info {
  display: flex;
  font-size: 16px;
  padding: 0 30px;
  color: #3084bb;
}

.info p {
  padding-right: 10px;
}

.info p:last-child {
  padding-left: 0;
}

.info p span:after {
  content: '，'
}

.info p span:last-child:after {
  content: ''
}

.content {
  padding: 20px 30px;
  line-height: 26px;
}

@media screen and (max-width: 960px) {
  .poster {
    height: 260px;
  }
  .title {
    font-size: 16px;
    padding: 10px 0
  }
  .info {
    padding: 0 10px;
    justify-content: center;
    font-size: 14px;
  }
  .content {
    padding: 15px;
  }
}

@media screen and (max-width: 640px) {
  .poster {
    height: 220px;
  }
}

@media screen and (max-width: 480px) {
  .poster {
    height: 180px;
  }
}
</style>
