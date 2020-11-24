<template>    
  <div class="container">
      <div class="section">
      <search :provinces="provinces"></search>
    </div>
    <div class="section">
    <div class="nine columns">
        <business-list :businesses="businesses"></business-list>
        <vue-page :total="count" :page="page" path="/page/" model="link"></vue-page>
    </div>
    <div class="three columns">
      <province-list :provinces="provinces"></province-list>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import VuePage from '~/components/VuePage'
import BusinessList from '~/components/BusinessList'
import ProvinceList from '~/components/ProvinceList'
import Search from '~/components/Search'

export default {    
    async asyncData({ params, error }) {
        let page = parseInt(params.id);
        let [pageRes, countRes, provinceRes] = await Promise.all([
            axios.get(`${process.env.baseUrl}/api/business/page/${page}?scope=1`),
            axios.get(`${process.env.baseUrl}/api/business/count/1`),
            axios.get(`${process.env.baseUrl}/api/province/list`),
        ]).catch(err => {
            error({ statusCode: 400, message: err })
        })
        
        return {
            businesses: pageRes.data.list,
            count: countRes.data.result,
            provinces: provinceRes.data.list,
            page
        }
    },
    components: {
        VuePage,
        BusinessList,
        ProvinceList,
        Search
    },
    head() {
    return {
      title: 'Find business information '+ '| Page ' + this.page,
      meta: [
        { hid: 'description', name: 'description', content: this.description },        
         { property: 'og:url', content: 'https://vietnambis.com/page/' + this.page },
         { property: 'og:title', content: 'Find company information, tax code, business directory | ' + this.count + ' company records' + ' | page ' + this.page},
         { property: 'og:description', content:'Find company information, tax code, business directory | '+ this.count + ' company records' + ' | page ' + this.page},
         { property: 'og:type', content:'article'}
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/page/1'}
      ]
    }
  },
  computed: {
    
    description() {
      let des = 'Find businesses in '+ this.count +' company profiles | page ' + this.page;     
      return des
    }
  }
}
</script>

<style scoped>
.index {
    width: 1000px;
    margin: 50px auto;
}

@media screen and (max-width: 960px) {
    .index {
        width: 100%;
        margin: 20px 0;
    }
    .more {
        margin: 0 10px;
    }
}
</style>

