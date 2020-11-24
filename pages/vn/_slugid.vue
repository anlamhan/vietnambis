<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com/vn">Trang chủ</a></span>  » <span>{{business.full_name}}</span> </div>
    <div class="section">
      <div class="nine columns">
        <quick-search></quick-search>
      <div class="row">
    <div class="business-info">      
      <div class="title"><h1> {{business.full_name}} - {{business.tax_id}}</h1></div>      
      <div class="content">
        <h3 v-if="business.slug">Tên tiếng Anh:<a :href="`https://vietnambis.com/${business.slug}-${business.id}.html`"> {{business.english_name}}</a></h3>
        <p>Tên tiếng Việt：{{business.full_name}}</p>
	<p>Địa chỉ hoạt động của doanh nghiệp：{{business.vietnamese_address}}</p>
        <p>Mã số thuế：{{business.tax_id}}</p>
        <p v-if="business.registration_number">Số đăng ký.：{{business.registration_number}}</p>
	<p v-if="business.vn_established_date">Ngày đăng ký kinh doanh：<a :href="`/vn/doanh-nghiep/${business.established_date}/1`">{{business.vn_established_date}}</a></p>
        <p v-if="business.vn_registered_date">Ngày bắt đầu hoạt động：{{business.vn_registered_date}}</p>
        <p v-if="business.tel">Số điện thoại.：{{business.tel}}</p>
        <p v-if="business.fax">Số fax.：{{business.fax}}</p>        
	<p v-if="business.vn_legal_representative">Người đại diện cho doanh nghiệp: <a :href="`/vn/doanh-nghiep/ten/${business.vn_legal_representative}/1`"> {{business.vn_legal_representative}}</a></p>
        <p>Ngày cập nhật：{{business.last_updated}}</p>
        <p v-if="business.parent.length">Công ty mẹ: <a :href="`https://vietnambis.com/vn/${business.parent[0].vnslug}-${business.parent[0].id}.html`">{{business.parent[0].full_name}}</a></p>
      </div>
    </div>
    </div>
    <div class="clear"></div>
    <div class="row">
      <div class="note-info">
        <p>
         <i> Chú ý: Thông tin này chỉ mang tính chất tham khảo</i>
        </p>
        <p>
          Hãy liên hệ trực tiếp với {{business.vietnamese_name}} có mã số thuế {{business.tax_id}}, tại địa chỉ {{business.vietnamese_address}} để có thông tin chính xác hơn.
        </p>
      </div>
    </div> 
    <div class="row">
      <div class="tag-info">        
        <p>
          Tags: <a :href="`https://vietnambis.com/vn/${business.vnslug}-${business.id}.html`">{{business.vietnamese_name}}</a>, <a :href="`https://vietnambis.com/vn/${business.vnslug}-${business.id}.html`">{{business.tax_id}}</a>, <a v-if="business.commune_id" :href="`https://vietnambis.com/vn/xa/${business.commune_slug}-${business.commune_id}`">{{business.commune_vietnamese_name}}</a>,
          <a v-if="business.district_id" :href="`https://vietnambis.com/vn/huyen/${business.district_slug}-${business.district_id}`">{{business.district_vietnamese_name}}</a>,
           <a v-if="business.province_id" :href="`https://vietnambis.com/vn/tinh/${business.province_slug}-${business.province_id}`">{{business.province_vietnamese_name}}</a>,
           <a v-if="business.district_id" :href="`https://vietnambis.com/vn/doanh-nghiep/quan-huyen/${business.district_id}-${business.district_slug}/ngay${business.established_date}/1`">{{business.district_vietnamese_name}} ngày {{business.vn_established_date}}</a>,
        </p>
      </div>
    </div> 
    <div class="section"> 
    <div class="row" v-if="business.industries.length">
      <div class="title-header"><h3>Ngành nghề đã đăng ký</h3></div>
      <div class="row">
            <div class="two columns"><b>Mã ngành</b></div>
            <div class="eight columns"><b>Mô tả</b></div>
            <div class="two columns"><b>Ngành chính</b></div>
            </div>
      <transition-group name="list" tag="section">            
         <div class="row" v-for="ind in business.industries" :key="ind.id">
            <div class="two columns">{{ ind.code }}</div>
            <div class="eight columns"><a :href="`https://vietnambis.com/vn/nganh/${ind.vnslug}-${ind.id}`">{{ ind.industry_name }}</a></div>
            <div class="two columns">{{ ind.is_main }}</div>
          </div>
      </transition-group>
    </div>
    </div>
    <div class="section"> 
    <div class="row" v-if="business.branches.length">
      <div class="title-header"><h3>Chi nhánh</h3></div>
      <transition-group name="list" tag="section">
        <article v-for="biz in business.branches" :key="biz.id">            
            <a :href="`https://vietnambis.com/vn/${biz.vnslug}-${biz.id}.html`">{{ biz.full_name }}</a>
            <div class="desc">{{biz.vietnamese_address}}</div>
        </article>        
      </transition-group>
    </div>  
    </div>
    <div class="section" v-if="business.businesses.length"> 
    <div class="row">
      <div class="title-header"><h3>Công ty/ doanh nghiệp cùng ngành</h3></div>
    <transition-group name="list" tag="section">
        <article v-for="biz in business.businesses" :key="biz.id">            
            <a :href="`https://vietnambis.com/vn/${biz.vnslug}-${biz.id}.html`">{{ biz.full_name }}</a>
            <div class="desc">{{biz.vietnamese_address}}</div>
        </article>
    </transition-group>
    </div>
    </div>
    <div class="section" v-if="businesses.length"> 
    <div class="row">
      <div class="title-header"><h3>Doanh nghiệp mới thành lập</h3></div>
    <transition-group name="list" tag="section">
        <article v-for="biz in businesses" :key="biz.id">            
            <a :href="`https://vietnambis.com/vn/${biz.vnslug}-${biz.id}.html`">{{ biz.full_name }}</a>
            <div class="desc">{{biz.vietnamese_address}}</div>
        </article>
    </transition-group>
    </div>
    </div>
      </div>
      <div class="three columns">
        <div v-if="this.communeCount > 0" class="title-header"><h3>Xã/ Phường</h3></div>        
        <commune-list :communes="business.communes"></commune-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import CommuneList from '~/components/vn/CommuneList'
import QuickSearch from '~/components/vn/QuickSearch'

export default {
  layout: 'vn',
  async asyncData({ params, error }) {        
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
      title: this.business.full_name +' - '+ this.business.tax_id,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { name: 'keywords', content: this.keywords.join(',') },
        { name: 'twitter:card', value: 'summary' },
        { name: 'twitter:url', content: 'https://vietnambis.com/vn/' + this.business.vnslug + '-'+this.business.id+'.html' },
        { name: 'twitter:title', content:this.business.english_name +' - ' + this.business.tax_id},
        { name: 'twitter:site', content:'@vietnambis'},
        { name: 'twitter:creator', content:'@vietnambis'},
        { property: 'og:url', content: 'https://vietnambis.com/vn/' + this.business.vnslug + '-'+this.business.id+'.html' },
        { property: 'og:title', content:this.business.full_name +' - ' + this.business.tax_id},
        { property: 'og:description', content:this.description},
        { property: 'og:type', content:'article'}
      ],
      link:[
        {rel:'canonical', href:'https://vietnambis.com/vn/' + this.business.vnslug + '-'+this.business.id+'.html'}
      ]
    }
  },
  computed: {
    keywords() {
      let keywords = [this.business.tax_id];      
      return keywords
    },
    description() {
      let des = this.business.full_name;
      if(this.business.tax_id !== null && this.business.tax_id !== '') {
        des+= ', Mã số thuế: ' + this.business.tax_id
      }
      if(this.business.vietnamese_address !== null && this.business.vietnamese_address !== '') {
        des+= ', Địa chị tại: ' + this.business.vietnamese_address
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
.tag-info {
    padding: .2rem .5rem;
    margin: 1rem .2rem;
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
