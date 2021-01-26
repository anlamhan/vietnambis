<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>{{industry.english_name}}</span></div>
    <div class="section">
    <div class="nine columns">      
      <div class="title"><h1> {{industry.code}} - {{industry.english_name}}</h1></div>
      <div class="info">
        <p>VietnamBis has {{this.count}} companies under {{industry.english_name}}</p>
      </div>
      <div class="content">
        <business-list :businesses="businesses"></business-list>        
        <nuxt-pager
        :total="count"
        :pageSize="20"
        :currentPage="page"
        :use-a-link="true"
        :first-link="'/industry/'+industry.slug+'-'+industry.id"
        :link="'/industry/'+industry.slug+'-'+industry.id"
        linkPath="/"        
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
import CommuneList from '~/components/CommuneList'
import BusinessList from '~/components/BusinessList'
import NuxtPager from '~/components/NuxtPager'

export default {

  async asyncData({ params, error }) {        
    var n = params.slugid.lastIndexOf("-");
    var id = params.slugid.substring(n+1,params.slugid.lenght);      
    let page = parseInt(params.id) || 1  
    var host = process.env.baseUrl;
    let [industryRes, businessRes, countRes] = await Promise.all([
      axios.get(`${host}/api/industry/detail/` + id),            
      axios.get(`${host}/api/business/industry/${id}/${page}?scope=1`),
      axios.get(`${host}/api/business/countby/${id}?scope=1&type=industry`),
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
      lang: 'en'
      },
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description},
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
        {rel:'canonical', href:'https://vietnambis.com/industry/'+this.industry.slug+'-'+this.industry.id}
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
        return this.industry.code + ' - ' +this.industry.english_name + ' | Page ' + this.page
      }else
      {
        return this.industry.code + ' - ' +this.industry.english_name
      }
    },    
    description()
    {
      return 'VietnamBis has '+ this.count +' companies under: ' + this.industry.code + ' - '+this.industry.english_name + ' in Vietnam'
    },
    fullurl()
    {
      if(this.page > 1){
        return 'https://vietnambis.com/industry/'+this.industry.slug+'-'+this.industry.id +'/' + this.page
      }else
      {
        return 'https://vietnambis.com/industry/'+this.industry.slug+'-'+this.industry.id
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
