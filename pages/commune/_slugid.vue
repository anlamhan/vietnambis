<template>
 <div class="container">
   <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span> » 
   <span><a :href="'https://vietnambis.com/province/'+commune.province_slug + '-' + commune.province_id">{{commune.province_name}}</a></span> » <span><a :href="'https://vietnambis.com/district/'+commune.district_slug + '-' + commune.district_id">{{commune.district_name}} district </a></span>  » <span>{{commune.commune_name}} commune</span> </div>
    <div class="section">
    <div class="nine columns">      
      <div class="title"><h1>{{commune.commune_name}} {{this.category}}, {{this.commune.full_district_name}}, {{this.commune.province_name}} province/city </h1></div> 
      <div class="info">
        <p>VietnamBis has {{this.count}} companies in : {{commune.commune_name}} {{this.category}}, {{this.commune.full_district_name}}, {{this.commune.province_name}} province/city</p>
      </div>
      <div class="content">
        <business-list :businesses="businesses"></business-list>        
        <nuxt-pager
        :total="count"
        :pageSize="20"
        :currentPage="page"
        :use-a-link="true"
        :first-link="'/commune/'+commune.slug+'-'+commune.id"
        :link="'/commune/'+commune.slug+'-'+commune.id"
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
import BusinessList from '~/components/BusinessList'
import NuxtPager from '~/components/NuxtPager'

export default {
  async asyncData({ params, error }) {
    var n = params.slugid.lastIndexOf("-");
    var id = params.slugid.substring(n+1,params.slugid.lenght);
    let page = parseInt(params.id) || 0
    var host = process.env.baseUrl;
    let [communeRes, businessRes, countRes] = await Promise.all([
      axios.get(`${host}/api/commune/detail/` + id),            
      axios.get(`${host}/api/business/commune/${id}/${page}?scope=1`),
      axios.get(`${host}/api/business/countby/${id}?scope=1&type=commune`)
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })    
    return {
      commune: communeRes.data.list,            
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
        { hid: 'description', name: 'description', content: this.description },
        { name: 'keywords', content: this.keywords.join(',') },
        { property: 'og:url', content: this.fullurl },
        { property: 'og:title', content: this.title},
        { property: 'og:description', content:this.description},
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
    keywords() {
      let keywords = [this.commune.commune_name];     
      return keywords
    },
    description(){
      if(this.page > 1){
      return 'VietnamBis has '+ this.count + ' company, enterprise profiles in ' + this.commune.commune_name +' ' + this.category + ', ' + this.commune.full_district_name + ', ' + this.commune.province_name + ' province/city. Find your businesses in Vietnam | page ' + this.page
      }
      else
      return 'VietnamBis has '+ this.count + ' company, enterprise profiles in ' + this.commune.commune_name +' ' + this.category + ', ' + this.commune.full_district_name + ', ' + this.commune.province_name +' province/city. Find your businesses in Vietnam'
    },
    category(){
    let type = this.commune.category; 
    switch(type) {
  case 1:
    return 'Ward'
    break;
  case 2:
    return 'Commune'
    break;
    case 3:
    return 'District'    
    break;
    case 4:
    return 'Town'    
    break;
    case 5:
    return 'District'    
    break;
  default:
    return 'Commune'
}
  }
  ,
  title()
    {
      if(this.page > 1){
        return this.count +' companies in ' + this.commune.commune_name +' ' + this.category + ', ' + this.commune.full_district_name + ', ' + this.commune.province_name + ' | Page ' + this.page
      }else
      {
        return this.count +' companies in ' + this.commune.commune_name +' ' + this.category + ', ' + this.commune.full_district_name + ', ' + this.commune.province_name
      }
    },
    fullurl()
    {
      if(this.page > 1)
      {
        return 'https://vietnambis.com/commune/'+this.commune.slug+'-'+this.commune.id+'/'+this.page
      }
      else
      {
        return 'https://vietnambis.com/commune/'+this.commune.slug+'-'+this.commune.id
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
    font-size: 24px;
    padding: 15px 0
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
