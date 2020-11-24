<template>
<div id="app" class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>Find a Business</span> </div>
    <div class="section">
      <search :provinces="provinces"></search>
    </div>
    <div class="section">
        <div class="nine columns">
        <!-- <business-list :businesses="businesses"></business-list> -->
        <transition-group name="list" tag="section">
     <article v-for="business in businesses" :key="business.english_name">   
       <a :href="`https://vietnambis.com/${business.slug}-${business.id}.html`">{{ business.english_name }}</a>                    
        <div class="desc"><a :href="`https://vietnambis.com/vn/${business.vnslug}-${business.id}.html`">{{business.full_name}}</a></div>
        <div class="desc">{{business.english_address}}</div>            
      </article> 
  </transition-group>

        <vue-page :total="count" :page="page" path="/business/" model="link"></vue-page>
        </div>
    </div>
</div> 
</template>
<script>
import axios from 'axios'
import Search from '~/components/Search'
import VuePage from '~/components/VuePage'
import BusinessList from '~/components/BusinessList'

export default {  
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
    VuePage,
    BusinessList
  },
  head() {
    return {
       title: this.title,
       meta: [
         { hid: 'description', name: 'description', content: 'Search Vietnam businesses on Vietnambis.com. Find the business listings information with tax, address, email and more.' },
         { name: 'keywords', content: 'vietnam bis, vietnam business' }
       ],       
      link:[
        {rel:'canonical', href:'https://vietnambis.com/business'}
      ]
     }
  },
  computed: {  
  title()
    {
      if(this.page > 1){
        return 'Find a Business, Taxcode' + ' | Page ' + this.page
      }else
      {
        return 'Find a Business, Taxcode'
      }
    }  
   
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