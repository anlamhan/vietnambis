<template>
<div id="app" class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com/vn">Trang chủ</a></span>  » <span>Tìm doanh nghiệp</span> </div>
    <div class="section">
      <search :provinces="provinces"></search>
    </div>
    <div class="section">
        <div class="nine columns">        
        <transition-group name="list" tag="section">
     <article v-for="business in businesses" :key="business.english_name">   
       <a :href="`/vn/${business.vnslug}-${business.id}.html`">{{ business.full_name }}</a>                     
        <div class="desc">{{business.english_name}}</div>
        <div class="desc">{{business.vietnamese_address}}</div>            
      </article> 
  </transition-group>        
        <nuxt-pager
        :total="count"
        :pageSize="20"
        :currentPage="page"
        :use-a-link="true"
        first-link="/vn/doanh-nghiep"
        link="/vn/doanh-nghiep"
        linkPath="/"        
        prevPageText="Trang trước"
        nextPageText="Trang tiếp theo"
      ></nuxt-pager>
        </div>
    </div>
</div> 
</template>
<script>
import axios from 'axios'
import Search from '~/components/vn/Search'
import NuxtPager from '~/components/NuxtPager'

export default {
    layout: 'vn',
  async asyncData({ params, error }) {   
    let page = parseInt(params.id) || 1
    var host = process.env.baseUrl;    
    let [businessRes, provinceRes, countRes] = await Promise.all([
      axios.get(`${host}/api/business/getbusinessbyfeatured/${page}`),
      axios.get(`${host}/api/province/list`),      
      axios.get(`${host}/api/business/countbyfeatured`)
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })
    return {                       
      provinces: provinceRes.data.list,
      businesses: businessRes.data.list,
      count: countRes.data.result,
      page
    }
    },
    components: {    
    Search,    
    NuxtPager
  },
  head() {
    return {
       title: this.title,
       meta: [
         { hid: 'description', name: 'description', content: this.description },
         { name: 'keywords', content: 'vietnam bis, doanh nghiệp mới, mã số thuế, công ty' },
         { name: 'twitter:card', value: 'summary' },
        { name: 'twitter:url', content: 'https://vietnambis.com/vn/doanh-nghiep' },
        { name: 'twitter:title', content:this.title},
        { name: 'twitter:description', content:this.description},
        { name: 'twitter:site', content:'@vietnambis'},
        { name: 'twitter:creator', content:'@vietnambis'},
        { property: 'og:url', content: 'https://vietnambis.com/vn/doanh-nghiep' },
        { property: 'og:title', content: this.title},
        { property: 'og:description', content:this.description},
        { property: 'og:type', content:'article'},
        { property: 'og:site_name', content:'Vietnam BIS'}
       ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/vn/doanh-nghiep'}
      ]
     }
  },
  computed: {  
  title()
    {
      if(this.page > 1){
        return 'Top '+this.count +' công ty, doanh nghiệp nổi bật tại Việt Nam' + ' | Trang ' + this.page
      }else
      {
        return 'Top '+this.count +' công ty, doanh nghiệp nổi bật tại Việt Nam'
      }
    },
    description()
    {
      return this. count + ' công ty, doanh nghiệp nổi bật. Tìm kiếm mã số thuế, số giấy chứng nhận đăng ký kinh doanh tại Việt Nam'
    }
  },
  created() {
    // const path = location.pathname.split('page')[1]
    // this.currentPage = path ? Number(path) : 1
  }
}
</script>

<style scoped>
article {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(50, 50, 93, .15), 0 1px 2px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
}
article>a {    
    font-size: 20px;
    line-height: 36px;
    margin: 10px 20px 5px 20px;
    display: inline-block;
}

article a:hover {
    text-decoration: underline;
}

article .desc {
    padding: 0 20px 10px 20px;
    font-size: 14px;
    line-height: 24px;
    color: #555;
}
@keyframes fade-in {
    0% {
        display: none;
        opacity: 0;
    }
    5% {
        display: black;
        opacity: 0;
        transform: translateY(3000px)
    }
    100% {
        opacity: 1;
        transform: translateY(0)
    }
}

@keyframes fade-out {
    0% {
        display: block;
        opacity: 1;
    }
    100% {
        display: none;
        opacity: 0;
    }
}

@media screen and (max-width: 1400px) {
    /* article .poster {
        height: 420px;
    } */
}

@media screen and (max-width: 1200px) {
    /* article .poster {
        height: 360px;
    } */
}

@media screen and (max-width: 960px) {
    article {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
        margin-bottom: 20px;
    }   
    article>a {
        margin: 10px 10px 5px 10px;
        font-size: 14px;
        line-height: 26px;
        color: #3084bb;
    }
    article .desc {
        font-size: 14px;
        line-height: 20px;
        padding: 0 10px 5px 10px;
        color: #666;
    }    
}

@media screen and (max-width: 640px) {
    article .poster {
        height: 160px;
    }
}

@media screen and (max-width: 480px) {
    article .poster {
        height: 130px;
    }
}
</style>