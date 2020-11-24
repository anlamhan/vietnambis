<template>    
  <div class="container">
      <div class="section">
      <search :provinces="provinces"></search>
    </div>
    <div class="section">
    <div class="nine columns">
        <business-list :businesses="businesses"></business-list>
        <vue-page :total="count" :page="page" path="/vn/trang/" model="link"></vue-page>
    </div>
    <div class="three columns">
      <province-list :provinces="provinces"></province-list>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import VuePage from '~/components/vn/VuePage'
import BusinessList from '~/components/vn/BusinessList'
import ProvinceList from '~/components/vn/ProvinceList'
import Search from '~/components/vn/Search'

export default {
    layout: 'vn',    
    async asyncData({ params, error }) {
        let page = parseInt(params.id);
        let [pageRes, countRes, provinceRes] = await Promise.all([
            axios.get(`${process.env.baseUrl}/api/business/page/${page}`),
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
      title: 'Tìm thông tin doanh nghiệp, mã số thuế '+ '| trang ' + this.page,
      meta: [
        { hid: 'description', name: 'description', content: this.description },        
         { property: 'og:url', content: 'https://vietnambis.com/vn/trang/' + this.page },
         { property: 'og:title', content: 'Tìm thông tin doanh nghiệp, mã số thuế | ' + this.count + ' hồ sơ doanh nghiệp' + ' | trang ' + this.page},
         { property: 'og:description', content:'Tìm thông tin doanh nghiệp, mã số thuế | '+ this.count + ' hồ sơ doanh nghiệp' + ' | trang ' + this.page},
         { property: 'og:type', content:'article'}
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/vn/trang/1'}
      ]
    }
  },
  computed: {
    
    description() {
      let des = 'Tìm kiếm thông tin doanh nghiệp, mã số thuế trong tổng số '+ this.count +' hồ sơ | trang ' + this.page;     
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

