<template>    
  <div class="container">
      <div class="section">
      <search :provinces="provinces"></search>
    </div>
    <div class="section">
    <div class="nine columns">
        <business-list :businesses="businesses"></business-list>
         <nuxt-pager
        :total="count"
        :pageSize="20"
        :currentPage="page"
        :use-a-link="true"
        first-link="/page/1"
        link="/page"
        linkPath="/"                
      ></nuxt-pager>
    </div>
    <div class="three columns">
      <province-list :provinces="provinces"></province-list>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import BusinessList from '~/components/BusinessList'
import ProvinceList from '~/components/ProvinceList'
import Search from '~/components/Search'
import NuxtPager from '~/components/NuxtPager'

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
        NuxtPager,
        BusinessList,
        ProvinceList,
        Search
    },
    head() {
    return {
      htmlAttrs: {
      lang: 'en'
      },
      title: this.count + ' companies, businesses in Vietnam '+ '| Page ' + this.page,
      meta: [
        { hid: 'description', name: 'description', content: this.description },        
         { property: 'og:url', content: 'https://vietnambis.com/page/' + this.page },
         { property: 'og:title', content: 'Find company information, tax code, business directory | ' + this.count + ' company records' + ' | page ' + this.page},
         { property: 'og:description', content:'Find company information, tax code, business directory | '+ this.count + ' company records' + ' | page ' + this.page},
         { property: 'og:type', content:'article'},
         { property: 'og:site_name', content:'Vietnam BIS'},
        { name: 'twitter:card', value: 'summary' },
        { name: 'twitter:url', content: 'https://vietnambis.com/page/'+ this.page },
        { name: 'twitter:title', content:this.count + ' companies, businesses in Vietnam '+ '| Page ' + this.page},
        { name: 'twitter:description', content:this.description},
        { name: 'twitter:site', content:'@vietnambis'},
        { name: 'twitter:creator', content:'@vietnambis'},
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/page/'+ this.page}
      ]
    }
  },
  computed: {
    
    description() {
      let des = this.count +' company, business profiles in our database. Find your businesses in Vietnam | Page ' + this.page;     
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

