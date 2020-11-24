<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span><a :href="'https://vietnambis.com/province/'+district.province_slug + '-' + district.province_id">{{district.province_name}}</a></span>  » <span>{{district.district_name}} district / town</span> </div>
    <div class="section">
    <div class="nine columns">      
      <div class="title"><h1> {{district.full_district_name}}, {{district.province_name}}</h1></div>
      <div class="info">
        <p>District name: {{district.full_district_name}}</p>
      </div>
      <div class="content">
        <business-list :businesses="businesses"></business-list>
        <vue-page :total="count" :page="page" :path="'/district/'+district.slug+'-'+district.id+'/'" model="link"></vue-page>
      </div>    
      </div>
      <div class="three columns">
      <commune-list :communes="communes"></commune-list>
    </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
//import timeago from 'timeago.js'
//import hljs from 'highlight.js'
import CommuneList from '~/components/CommuneList'
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
//   validate({ params }) {
//     return /^\d+$/.test(params.id)
//   },

  async asyncData({ params, error }) {        
    var n = params.slugid.lastIndexOf("-");
    var id = params.slugid.substring(n+1,params.slugid.lenght);  
    let page = parseInt(params.id) || 1  
    var host = process.env.baseUrl;
    let [districtRes, communeRes, businessRes, countRes] = await Promise.all([
      axios.get(`${host}/api/district/detail/` + id),      
      axios.get(`${host}/api/commune/getbydistrict/`+ id),
      axios.get(`${host}/api/business/district/${id}/${page}?scope=1`),
      axios.get(`${host}/api/business/countby/${id}?scope=1&type=district`),
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })

    return {
      district: districtRes.data.list,      
      communes: communeRes.data.list,
      businesses: businessRes.data.list,
      count: countRes.data.result,
      page
    }    
  },
  components: {
    VuePage,
    BusinessList,
    CommuneList
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'This page lists all businesses in '+this.district.full_district_name+ ', ' +this.district.province_name+ '. ' + + this.count + ' company profiles' },
        { name: 'keywords', content: this.keywords.join(',') }
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/district/'+this.district.slug+'-'+this.district.id}
      ]
    }
  },
  computed: {
    keywords() {
      let keywords = [];     
      return keywords
    },
    title()
    {
      if(this.page > 1){
        return this.district.full_district_name + ' | Page ' + this.page
      }else
      {
        return this.district.full_district_name + ' '
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
    font-size: 14px;
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
