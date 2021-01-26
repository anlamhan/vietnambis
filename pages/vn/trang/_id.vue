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
        first-link="/vn/trang"
        link="/vn/trang"
        linkPath="/"                
        prevPageText="Trang trước"
        nextPageText="Trang tiếp theo"
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
import BusinessList from '~/components/vn/BusinessList'
import ProvinceList from '~/components/vn/ProvinceList'
import Search from '~/components/vn/Search'
import NuxtPager from '~/components/NuxtPager'

export default {
    layout: 'vn',    
    async asyncData({ params, error }) {      
        let page = parseInt(params.id) || 1;
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
        BusinessList,
        ProvinceList,
        Search,
        NuxtPager
    },
    head() {
    return {
      htmlAttrs: {
      lang: 'vi'
      },
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },        
         { property: 'og:url', content: this.fullurl },
         { property: 'og:title', content: this.count + ' công ty, doanh nghiệp đang hoạt đông tại Việt Nam' + ' | trang ' + this.page},
         { property: 'og:description', content:'Tìm thông tin doanh nghiệp, mã số thuế. '+ this.count + ' hồ sơ doanh nghiệp' + ' | trang ' + this.page},
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
    title(){
      if(this.page > 1){
      return this.count + ' công ty, doanh nghiệp, mã số thuế tại Việt Nam | trang ' + this.page
      }
      else{
       return this.count + ' công ty, doanh nghiệp, mã số thuế tại Việt Nam'
      }

    },
    fullurl()
    {
      return 'https://vietnambis.com/vn/trang/'+ this.page
    },
    description() {
      let des = 'Tìm kiếm thông tin doanh nghiệp, mã số thuế tại Việt Nam trong tổng số '+ this.count +' hồ sơ | trang ' + this.page;     
      return des
    }
  },  
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

