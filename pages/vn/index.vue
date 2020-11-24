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
    <nuxt-link class="more" to="/vn/trang/1">Xem thêm</nuxt-link>
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
          <h2>Doanh nghiệp theo ngành nghề kinh doanh</h2>
          <ul class="main-category">
            <li v-for="ind in industries" :key="ind.id"><a :href="`/vn/nganh/${ind.vnslug}-${ind.id}`">{{ind.industry_name}}</a></li>
          </ul>
        </div>
      </div>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios'
import BusinessList from '~/components/vn/BusinessList'
import ProvinceList from '~/components/vn/ProvinceList'
import Search from '~/components/vn/Search'
export default {
  layout: 'vn',
  async asyncData({ error }) {
    const page = 0;    
    const hostname = process.env.baseUrl    
    let [pageRes, countRes, provinceRes, industryRes] = await Promise.all([
      axios.get(`${hostname}/api/business/page/${page}`),
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
      industries: industryRes.data.list
    }
  },
  components: {
    BusinessList,
    ProvinceList,
    Search
  },
  head() {
    return { 
      title: 'Thông tin doanh nghiệp, mã số thuế',     
      meta: [         
       { hid: 'description', name: 'description', content: 'Tra cứu mã số thuế, thông tin doanh nghiệp tại Việt Nam với gần 2 triệu dữ liệu và luôn được cập nhật liên tục'},
       { name: 'twitter:card', value: 'summary' },
       { name:'twitter:url', content:'https://vietnambis.com/vn'},
       { name:'twitter:title', content:'Thông tin doanh nghiệp, mã số thuế, doanh nghiệp mới'},
       {name:'twitter:site', content:'@vietnambis'},
       {name:'twitter:creator', content:'@vietnambis'},
       { property: 'og:url', content: 'https://vietnambis.com/vn' },
        { property: 'og:title', content:'Thông tin doanh nghiệp, mã số thuế, doanh nghiệp mới'},
        { property: 'og:description', content:'Tra cứu thông tin doanh nghiệp, công ty mới, ngành nghề kinh doanh và mã số thuế'},
        { property: 'og:type', content:'article'}
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/vn'}
      ]
    }
  },
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
