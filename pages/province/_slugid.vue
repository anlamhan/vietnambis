<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>{{province.province_name}} province / city</span> </div>
    <div class="section">
    <div class="nine columns">    
      <div class="title"><h1>{{this.count}} Companies and Enterprises in {{province.province_name}}</h1></div>
      <div class="info">
        <p>All businesses in : {{province.province_name}} province / city</p>
      </div>
      <div class="content">
        <business-list :businesses="businesses"></business-list>
        <nuxt-pager
        :total="count"
        :pageSize="20"
        :currentPage="page"
        :use-a-link="true"
        :first-link="'/province/'+province.slug+'-'+province.id"
        :link="'/province/'+province.slug+'-'+province.id"
        linkPath="/"        
      ></nuxt-pager>
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
import DistrictList from '~/components/DistrictList'
import BusinessList from '~/components/BusinessList'
import NuxtPager from '~/components/NuxtPager'

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
    NuxtPager,
    BusinessList,
    DistrictList
  },
  head() {
    return {
      htmlAttrs: {
      lang: 'en'
      },
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { name: 'keywords', content: this.keywords.join(',') },
        { property: 'og:url', content: this.fullurl },
        { property: 'og:title', content: this.title},
        { property: 'og:description', content: this.description},
        { property: 'og:type', content:'article'},
        { property: 'og:site_name', content:'Vietnam BIS'},
        { name: 'twitter:card', value: 'summary' },
        { name: 'twitter:url', content: this.fullurl },
        { name: 'twitter:title', content:this.title},
        { name: 'twitter:description', content:this.description},
        { name: 'twitter:site', content:'@vietnambis'},
        { name: 'twitter:creator', content:'@vietnambis'},
      ],
      link:[
        {rel:'canonical', href:this.fullurl}
      ]
    }
  },
  computed: {
    keywords() {
      let keywords = [this.province.province_name];      
      return keywords
    },
    description()
    {
      if(this.page > 1)
      {
        return 'Find your company, business information on our '+ this.count + ' profiles in ' + this.province.province_name +' province / city | page ' + this.page
      }
      else
      {
        return 'Find your company, business information on our '+ this.count + ' profiles in ' + this.province.province_name +' province / city'
      }
    },
    title()
    {
      if(this.page > 1){
        return this.count + ' Companies, Businesses in '+ this.province.province_name + ' province / city | Page ' + this.page
      }else
      {
        return this.count + ' Companies, Businesses in '+ this.province.province_name + ' province / city'
      }
    },
    fullurl()
    {
      if(this.page > 1){
        return 'https://vietnambis.com/province/'+this.province.slug+'-'+this.province.id +'/' + this.page
      }else
      {
        return 'https://vietnambis.com/province/'+this.province.slug+'-'+this.province.id
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
