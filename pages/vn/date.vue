<template>
  <div id="app" class="container">
      <div class="breadcrumbs"><span><a href="https://vietnambis.com/vn">Trang chủ</a></span>  » <span>Từ khóa tìm kiếm: {{this.k}}</span> </div>    
    <div class="section">
      <search :provinces="provinces"></search>
    </div>    
  <transition-group name="list" tag="section">
     <article v-for="business in businesses" :key="business._source.full_name">   
       <a :href="`/vn/${business._source.vnslug}-${business._source.id}.html`">{{ business._source.full_name }}</a>                     
        <div class="desc">Tên tiếng Anh:{{business._source.english_name}}</div>
        <div class="desc">Mã số thuế: {{business._source.tax_id}}</div>
        <div class="desc">Địa chỉ: {{business._source.english_address}}</div>            
      </article> 
  </transition-group>
  </div>
</template>
<script>
import axios from 'axios'
import Search from '~/components/vn/Search'
// import { log } from 'util';
export default {  
    layout: 'vn',
 async asyncData({ params, error }) {       
   var keyword=''; var province=''; var index=0;
    if(params.keyword !== null && params.keyword !== '') {
        keyword= params.keyword
      }
      if(params.province !== null && params.province !== '') {
        province= params.province
      }
      if(params.id !== null && params.id !== '') {
        index= params.id
      }
    var host = process.env.baseUrl;
    let [businessRes, provinceRes] = await Promise.all([
     axios.get(`${host}/api/search/search?q=`+keyword+'&p='+province +'&index='+index),
     axios.get(`${host}/api/province/list`)
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })
    return {                 
      businesses: businessRes.data,
      provinces: provinceRes.data.list,
      k:  keyword
    }
    },    
    components: {    
    Search
  },
  head() {
    return {
       title: 'Tìm kiếm công ty, doanh nghiệp, mã số thuế',
       meta: [
         { hid: 'description', name: 'description', content: 'Tìm kiếm thông tin công ty, doanh nghiệp, mã số thuế tại Việt Nam' },
         { name: 'keywords', content: 'vietnam bis, mã số thuế, doanh nghiệp mới' }
       ]
     }
  },
  computed: {
       
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

article .poster {
    background: rgba(38, 50, 56, 0.95) no-repeat center / cover;
    height: 480px;
    width: 100%;
    transition: all ease-in 0.5s;
}

article>a {
    /* color: #333; */
    font-size: 24px;
    line-height: 36px;
    margin: 10px 20px 5px 20px;
    display: inline-block;
}

article a:hover {
    text-decoration: underline;
}

article .desc {
    padding: 0 20px 10px 20px;
    font-size: 16px;
    line-height: 24px;
    color: #555;
}

article .tags {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 0 0 0 20px;
}

article .tags a {
    margin: 20px 10px 20px 0;
    padding: 3px 10px;
    text-decoration: none;
}

.list-enter-active,
.list-leave-active {
    opacity: 0;
    transform: translateY(0);
    animation: fade-in 0.2s ease-in forwards;
    animation-delay: 0.3s;
}

.list-enter,
.list-leave-active {
    animation: fade-out 0.3s ease-in forwards;
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
    article .poster {
        height: 420px;
    }
}

@media screen and (max-width: 1200px) {
    article .poster {
        height: 360px;
    }
}

@media screen and (max-width: 960px) {
    article {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
        margin-bottom: 20px;
    }
    article .poster {
        height: 200px;
    }
    article>a {
        margin: 10px 10px 5px 10px;
        font-size: 18px;
        line-height: 26px;
        color: #3084bb;
    }
    article .desc {
        font-size: 14px;
        line-height: 20px;
        padding: 0 10px 5px 10px;
        color: #666;
    }
    article .tags {
        padding-left: 10px;
    }
    article .tags a {
        margin: 10px 10px 10px 0;
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

