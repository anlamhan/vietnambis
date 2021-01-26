<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com/vn">Trang chủ</a></span>  » <span><a :href="'https://vietnambis.com/vn/tinh-thanh/'+ this.district.province_slug + '-' + district.province_id">{{district.vietnamese_province_name}}</a></span>  » <span>{{district.vietnamese_name}}</span> </div>
    <div class="section">
    <div class="nine columns">      
      <div class="title"><h1> Công ty, doanh nghiệp tại {{district.vietnamese_name}}, {{district.vietnamese_province_name}} | Trang {{this.page}}</h1></div>
      <div class="info">
        <p>Tất cả doanh nghiệp, công ty thuộc quận/ huyện: {{district.vietnamese_name}}</p>
      </div>
      <div class="content">
        <business-list :businesses="businesses"></business-list>        
        <nuxt-pager
        :total="count"
        :pageSize="20"
        :currentPage="page"
        :use-a-link="true"
        :first-link="'/vn/huyen/'+district.slug+'-'+district.id"
        :link="'/vn/huyen/'+district.slug+'-'+district.id"
        linkPath="/"
        prevPageText="Trang trước"
        nextPageText="Trang tiếp theo"
      ></nuxt-pager>
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
import CommuneList from '~/components/vn/CommuneList'
import BusinessList from '~/components/vn/BusinessList'
import NuxtPager from '~/components/NuxtPager'
export default {
  layout: 'vn',
  async asyncData({ params, error }) {        
    var n = params.slugid.lastIndexOf("-");
    var id = params.slugid.substring(n+1,params.slugid.lenght);  
    let page = parseInt(params.id) || 1  
    var host = process.env.baseUrl;
    let [districtRes, communeRes, businessRes, countRes] = await Promise.all([
      axios.get(`${host}/api/district/detail/` + id),      
      axios.get(`${host}/api/commune/getbydistrict/`+ id),
      axios.get(`${host}/api/business/district/${id}/${page}`),
      axios.get(`${host}/api/business/countby/${id}?type=district`),
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
    NuxtPager,
    BusinessList,
    CommuneList
  },
  head() {
    return {
      htmlAttrs: {
      lang: 'vi'
      },
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Tất cả doanh nghiệp, công ty thuộc '+this.district.vietnamese_name+ ', '+ this.district.vietnamese_province_name +'. Có ' + this.count + ' hồ sơ'},
        { name: 'keywords', content: this.keywords.join(',') },
        { name: 'twitter:card', value: 'summary' },
        { name: 'twitter:url', content: this.fullurl },
        { name: 'twitter:title', content:this.title},
        { name: 'twitter:description', content:this.description},
        { name: 'twitter:site', content:'@vietnambis'},
        { name: 'twitter:creator', content:'@vietnambis'},
        { property: 'og:url', content: this.fullurl },
        { property: 'og:title', content: this.title},
        { property: 'og:description', content:this.description},
        { property: 'og:type', content:'article'},
        { property: 'og:site_name', content:'Vietnam BIS'}
      ],
      link:[
        {rel:'canonical', href: this.fullurl}
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
        return this.count + ' công ty, doanh nghiệp tại ' + this.district.vietnamese_name +', ' + this.district.vietnamese_province_name + ' | Trang ' + this.page
      }else
      {
        return this.count + ' công ty, doanh nghiệp tại ' + this.district.vietnamese_name + ', ' + this.district.vietnamese_province_name
      }
    },
    description(){
      return 'Tất cả doanh nghiệp, công ty thuộc '+this.district.vietnamese_name+ ', '+ this.district.vietnamese_province_name +'. Có ' + this.count + ' hồ sơ'
    },
    fullurl()
    {
      if(this.page > 1){
        return 'https://vietnambis.com/vn/huyen/'+this.district.slug+'-'+this.district.id +'/' + this.page
      }else
      {
        return 'https://vietnambis.com/vn/huyen/'+this.district.slug+'-'+this.district.id
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
