<template>
<div id="app" class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com/vn">Trang chủ</a></span>  » <span>Blog</span> </div>
    <div class="section">
      <search :provinces="provinces"></search>
    </div>
    <div class="section">
        <div class="nine columns">
        <transition-group name="list" tag="section">
          <article v-for="post in api_posts" :key="post.title">   
       <a :href="`/vn/blog/${post.slug}.html`">{{ post.title }}</a>                     
        <div class="desc">{{post.description}}</div>        
      </article>     
  </transition-group>
        <!-- <vue-page :total="count" :page="page" path="/vn/blog/" model="link"></vue-page> -->
        </div>
    </div>
</div> 
</template>
<script>
import axios from 'axios'
import Search from '~/components/vn/Search'
import VuePage from '~/components/vn/VuePage'

export default {
    layout: 'vn',
  async asyncData({ params, error }) {   
    let page = parseInt(params.id) || 0
    var host = process.env.baseUrl;    
    let [apiRes, provinceRes] = await Promise.all([
      axios.get(`${host}/api/strapi/posts`),      
      axios.get(`${host}/api/province/list`)      
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })
    return {                       
      provinces: provinceRes.data.list,      
      api_posts: apiRes.data,
      page      
    }
    },
    components: {    
    Search,
    VuePage,
    // BusinessList
  },
  head() {
    return {
       title: this.title,
       meta: [
         { hid: 'description', name: 'description', content: 'Tổng hợp các bài viết về doanh nghiệp nhằm giúp độc giả hiểu thêm về đăng ký kinh doanh, tra cứu mã số thuế' },
         { name: 'keywords', content: 'vietnam bis, tra cứu mã số thuế doanh nghiệp, mã số thuế, công ty' }
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
        return 'Blogs: Các bài viết về doanh nghiệp' + ' | Trang ' + this.page
      }else
      {
        return 'Blogs: Các bài viết về doanh nghiệp'
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