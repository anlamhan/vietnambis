<template>
  <div class="container">    
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>{{business.english_name}}</span> </div>
    <div class="section">
      <div class="nine columns">
        <quick-search></quick-search>
      <div class="row">
    <div class="business-info">      
      <div class="title"><h1>{{business.tax_id}} - {{business.english_name}}</h1></div>      
      <div class="content">
        <h3>English name: {{business.english_name}}</h3>
        <p>Vietnamese name：<a :href="`https://vietnambis.com/vn/${business.vnslug}-${business.id}.html`">{{business.full_name}}</a></p>
        <p>Tax ID：{{business.tax_id}}</p>
        <p>Registration No.：{{business.registration_number}}</p>      
        <p v-if="business.tel">Phone No.：{{business.tel}}</p>
        <p v-if="business.fax">Fax No.：{{business.fax}}</p>
        <p>Address：{{business.english_address}}</p>
        <p v-if="business.legal_representative">Representative: <a :href="`/business/representative/${business.vn_legal_representative}/1`">{{business.legal_representative}}</a></p>
        <p v-if="business.established_date">Date of license：<a :href="`/business/${business.established_date}/1`">{{business.established_date}}</a></p>
        <p v-if="business.registered_date">Start date of activity：{{business.registered_date}}</p>
        <p>Last updated at：{{business.last_updated}}</p>
        <p v-if="business.parent.length">Parent：<a :href="`https://vietnambis.com/${business.parent[0].slug}-${business.parent[0].id}.html`">{{business.parent[0].english_name}}</a></p>
      </div>
    </div>
    </div>
    <div class="clear"></div>
    <div class="row">
      <div class="note-info">
        <p>
         <i> Note: The above information is for reference only</i>
        </p>
        <p>
          Please contact directly with {{business.english_name}}, located at {{business.english_address}} to get the most accurate information for the tax code {{business.tax_id}}.
        </p>
      </div>
    </div> 
    <div class="section"> 
    <div class="row" v-if="business.industries.length">
      <div class="title-header"><h3>Registered Categories</h3></div>
      <div class="row">
            <div class="two columns"><b>Category Code</b></div>
            <div class="eight columns"><b>Description</b></div>
            <div class="two columns"><b>Main</b></div>
            </div>
      <transition-group name="list" tag="section">            
         <div class="row" v-for="ind in business.industries" :key="ind.id">
            <div class="two columns">{{ ind.code }}</div>
            <div class="eight columns"><a :href="`https://vietnambis.com/industry/${ind.slug}-${ind.id}`">{{ ind.english_name }}</a></div>
            <div class="two columns">{{ ind.is_main }}</div>
          </div>
      </transition-group>
    </div>
    </div>
    <div class="section"> 
    <div class="row" v-if="business.branches.length">
      <div class="title-header"><h3>Branches</h3></div>
      <transition-group name="list" tag="section">
        <article v-for="biz in business.branches" :key="biz.id">            
            <a :href="`https://vietnambis.com/${biz.slug}-${biz.id}.html`">{{ biz.english_name }}</a>
            <div class="desc">{{biz.english_address}}</div>
        </article>        
      </transition-group>
    </div>  
    </div>
    <div class="section" v-if="business.businesses.length"> 
    <div class="row">
      <div class="title-header"><h3>Other businesses in the same category</h3></div>
    <transition-group name="list" tag="section">
        <article v-for="biz in business.businesses" :key="biz.id">            
            <a :href="`https://vietnambis.com/${biz.slug}-${biz.id}.html`">{{ biz.english_name }}</a>
            <div class="desc">{{biz.english_address}}</div>
        </article>
    </transition-group>
    </div>
    </div>
    <div class="section" v-if="businesses.length"> 
    <div class="row">
      <div class="title-header"><h3>New businesses</h3></div>
    <transition-group name="list" tag="section">
        <article v-for="biz in businesses" :key="biz.id">            
            <a :href="`https://vietnambis.com/${biz.slug}-${biz.id}.html`">{{ biz.english_name }}</a>
            <div class="desc">{{biz.english_address}}</div>
        </article>
    </transition-group>
    </div>
    </div>
      </div>
      <div class="three columns">
        <div v-if="this.communeCount > 0" class="title-header"><h3>Communes/ wards</h3></div>        
        <commune-list :communes="business.communes"></commune-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import CommuneList from '~/components/CommuneList'
import QuickSearch from '~/components/QuickSearch'

export default {  
  async asyncData({params, error }) {        
    var n = params.slugid.lastIndexOf("-");
    var id = params.slugid.substring(n+1,params.slugid.lenght);
    var slug = params.slugid.substring(0,n);    
     let [businessRes, newBiz] = await Promise.all([
      axios.get(`${process.env.baseUrl}/api/business/getbusiness/` + id+'/1'),
      axios.get(`${process.env.baseUrl}/api/business/page/1`),      
      ]   
    ).catch(err => {
      error({ statusCode: 400, message: err })
    })
     return {      
       business: businessRes.data.list[0],             
       businesses: newBiz.data.list       
     }  
  },
  components: {    
    CommuneList,
    QuickSearch
  },
  head() {
    return {
       htmlAttrs: {
      lang: 'en'
      },
      title: this.business.tax_id +' - ' + this.business.english_name,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { name: 'keywords', content: this.keywords.join(',') },
        { name: 'twitter:card', value: 'summary' },
        { name: 'twitter:url', content: 'https://vietnambis.com/' + this.business.slug + '-'+this.business.id+'.html' },
        { name: 'twitter:title', content:this.business.english_name +' - ' + this.business.tax_id},
        { name: 'twitter:description', content:this.description},
        { name: 'twitter:site', content:'@vietnambis'},
        { name: 'twitter:creator', content:'@vietnambis'},
        { property: 'og:url', content: 'https://vietnambis.com/' + this.business.slug + '-'+this.business.id+'.html' },
        { property: 'og:title', content:this.business.english_name +' - ' + this.business.tax_id},
        { property: 'og:description', content:this.description},
        { property: 'og:type', content:'article'},
        { property: 'og:site_name', content:'Vietnam BIS'}
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/' + this.business.slug + '-'+this.business.id+'.html'}
      ]
    }
  },
  computed: {
    keywords() {
      let keywords = [this.business.tax_id, this.business.english_name];      
      return keywords
    },
    description() {
      let des = this.business.english_name;
      if(this.business.tax_id !== null && this.business.tax_id !== '') {
        des+= ', Tax ID: ' + this.business.tax_id
      }
      if(this.business.english_address !== null && this.business.english_address !== '') {
        des+= ', Address: ' + this.business.english_address
      }
      return des
    },
    address()
    {
      return this.business.english_address;          
    },
    communeCount()
    {
      return this.business.communes.length
    },
    // established_date()
    // {
    //   if(this.business.established_date !== null && this.business.established_date !== '')
    //   {
    //     var date = new Date(this.business.established_date)
    //     return date.toISOString().slice(0,10);
    //   }
    //   return null;
    // },
    // registered_date()
    // {
    //   if(this.business.registered_date !== null && this.business.registered_date !== '')
    //   {
    //     var date = new Date(this.business.registered_date)
    //     return date.toISOString().slice(0,10);
    //   }
    //   return null;
    // }
  }
}
</script>

<style scoped>
.page {
  box-shadow: none;
}
article
{
  margin: 0 0 10px 0;
}
.business-info {
  padding: .2rem .5rem;
    margin: 0 .2rem;
    font-size: 90%;        
    border-radius: 4px;    
}
.note-info {
  padding: .2rem .5rem;
    margin: 0 .2rem;
    font-size: 90%;    
    background: #F1F1F1;
    border: 1px solid #E1E1E1;
    border-radius: 4px;    
}

.poster {
  height: 420px;
  background: no-repeat center / cover;
}

.title {
  padding: 0px 5px;
  font-size: 20px;
  border-bottom: 2px solid red;
  margin: 0 0 10px 0;
}
.title h1{
  font-size: 1em;
}
.info {
  display: flex;
  font-size: 16px;
  padding: 0 10px;  
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
.title-header h3{
  margin: 10px 0 10px 0;
  font-size: 1.6em;
  border-bottom: 2px solid red;
  margin: 0 0 10px 0;
}
.content {
  padding: 10px;
  line-height: 20px;
}
.content p
{
  display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin: 10px 0;
    border-bottom: 1px solid #ececec;
    padding: 0px 0px 10px 0px;
}
.content h3{ font-size: 1em}
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
