<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com/vn">Trang chủ</a></span>  » <span>{{industry.industry_name}}</span></div>
    <div class="section">
    <div class="nine columns">      
      <div class="title"><h1>Ngành nghề: {{industry.code}} - {{industry.industry_name}}</h1></div>
      <div class="info">
        <p>Tên ngành nghề kinh doanh: {{industry.industry_name}}. Có {{this.count}} hồ sơ công ty, doanh nghiệp</p>
      </div>
      <div class="content">
        <business-list :businesses="businesses"></business-list>        
         <nuxt-pager
        :total="count"
        :pageSize="20"
        :currentPage="page"
        :use-a-link="true"
        :first-link="'/vn/nganh/'+industry.vnslug+'-'+industry.id"
        :link="'/vn/nganh/'+industry.vnslug+'-'+industry.id"
        linkPath="/"
        prevPageText="Trang trước"
        nextPageText="Trang tiếp theo"
      ></nuxt-pager>
      </div>    
      </div>
      <div class="three columns">      
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
    let [industryRes, businessRes, countRes] = await Promise.all([
      axios.get(`${host}/api/industry/detail/` + id),            
      axios.get(`${host}/api/business/industry/${id}/${page}`),
      axios.get(`${host}/api/business/countby/${id}?type=industry`),
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })

    return {
      industry: industryRes.data.list,            
      businesses: businessRes.data.list,
      count: countRes.data.result,
      page
    }    
  },
  components: {
    NuxtPager,
    BusinessList    
  },
  head() {
    return {
      htmlAttrs: {
      lang: 'vi'
      },
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
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
        {rel:'canonical', href:this.fullurl}
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
        return this.count +' doanh nghiệp ' +this.industry.industry_name +' - '+ this.industry.code +' | Trang ' + this.page
      }else
      {
        return this.count +' doanh nghiệp ' +this.industry.industry_name +' - '+ this.industry.code
      }
    },
    description()
    {
      return 'Tất cả công ty và doanh nghiệp thuộc ngành: ' + this.industry.code + ' - '+this.industry.industry_name
    },
    fullurl()
    {
      if(this.page > 1){
        return 'https://vietnambis.com/vn/nganh/'+this.industry.vnslug+'-'+this.industry.id +'/' + this.page
      }else
      {
        return 'https://vietnambis.com/vn/nganh/'+this.industry.vnslug+'-'+this.industry.id
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
