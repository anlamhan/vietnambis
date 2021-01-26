<template>
  <div>
  <div class="container">
    <div class="section">
      <div class="search-form">
        <search :provinces="provinces"></search>
      </div>
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
  <div class="row">
      <div class="row color-blue">
      <div class="container">
        <div class="category">
          <h2>Vietnam Companies by Category</h2>
          <ul class="main-category">
            <li v-for="ind in industries" :key="ind.id"><a :href="`/industry/${ind.slug}-${ind.id}`">{{ind.english_name}}</a></li>
          </ul>
        </div>
      </div>
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
  async asyncData({ error }) {
    const page = 0;    
    const hostname = process.env.baseUrl;
    let [pageRes, countRes, provinceRes, industryRes] = await Promise.all([
      axios.get(`${hostname}/api/business/page/${page}?scope=1`),
      axios.get(`${hostname}/api/business/count/1`),
      axios.get(`${hostname}/api/province/list`),
      axios.get(`${hostname}/api/industry/featured`),
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })

    return {
      businesses: pageRes.data.list,
      count: countRes.data.result,
      provinces: provinceRes.data.list,
      industries: industryRes.data.list,
      page:page
    }
  },
  components: {
    BusinessList,
    ProvinceList,
    Search,
    NuxtPager
  },
  head() {
    return {    
      htmlAttrs: {
      lang: 'en'
      },
      title: 'Vietnam Bis: Vietnam Business Information System',       
      meta: [
        { hid: 'description', name: 'description', content: this.description},
       { name: 'twitter:card', value: 'summary' },
       { name:'twitter:url', content:'https://vietnambis.com'},
       { name:'twitter:title', content:'Vietnam Bis, Vietnam Business Directory'},
       {name:'twitter:site', content:'@vietnambis'},
       {name:'twitter:description', content:'@vietnambis'},
       {name:'twitter:creator', content:'@vietnambis'},
       { property: 'og:url', content: 'https://vietnambis.com' },
        { property: 'og:title', content:'Vietnam Bis, Vietnam Business Directory'},
        { property: 'og:description', content:this.description},
        { property: 'og:type', content:'article'},
        { property: 'og:site_name', content:'Vietnam BIS'}
      ]
      ,
      link:[
        {rel:'canonical', href:'https://vietnambis.com/en'}
      ]
    }
  },
  computed: {
    description() {
      return 'Look up information about businesses, new companies, business lines and tax codes in Vietnam with '+this.count+' records in the database.'
    }
  }
}
</script>

<style scoped>
.page {
  box-shadow: none;
}

.more {
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.26);
  margin-bottom: 40px;
  display: block;
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  transition: all ease-in 0.2s;
}
.search-form
{
  margin: 40px 0;
}
.more:hover {
  background: #f2f2f2;
}

@media screen and (max-width: 960px) {
  .more {
    margin: 0 10px;
  }
}
</style>
