<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>Blog</span> » <span>{{post.title}}</span> </div>
    <div class="section">
      <div class="poster" v-if="post.image" :style="{backgroundImage:'url('+post.image+')'}"></div>
      <div class="title"><h1>{{post.title}}</h1></div>
      <div class="info">
        <p>Ngày cập nhật：{{new Date(post.published_at).toLocaleString('vi-VN')}} </p>        
      </div>
      <div class="content">
        <div v-html="post.html" class="md"></div>
        <p v-if="post.categories && post.categories.length > 0">
          Chuyên mục：
          <span v-for="cat in post.categories" :key="cat.id">{{cat.Title}}</span>
        </p>
      </div>      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import hljs from 'highlight.js'
//import hljs from 'highlight.js/lib/highlight.js'
let marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
   gfm: true,
   tables: true,
   breaks: false,
   pedantic: false,
   sanitize: false,
   smartLists: true,
   smartypants: false,
  //  highlight: function (code) {
  //    return hljs.highlightAuto(code).value;
  //  }
 });

export default {
  layout: 'vn',  
  asyncData({ params, error }) {  
    
    var n = params.slug == undefined ? '' : params.slug.lastIndexOf(".");
    var slug = params.slug == undefined ? '' : params.slug.substring(0,n); 
    var host = process.env.baseUrl;   
      return axios.get(`${host}/api/strapi/posts?slug=` + slug,
      ).then((res) => {      
      if (res.data.code === 404) {
        error({ statusCode: 404, message: 'Not Found This Post' });
      }      
      var post = res.data[0];                
      post.html = marked(post.content);      
      if(post.thumbnail && post.thumbnail.length > 0)
      {
        post.image_url = post.thumbnail[0].url
      }
      //post.published_ago = format(post.published_at, 'vi');   
      return { post, slug }
    }).catch((err) => {
      error({ statusCode: 404, message: err.message })
    })    
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description },
        { name: 'keywords', content: this.keywords.join(',') },
        { name: 'twitter:card', value: 'summary' },
        { name: 'twitter:url', content: 'https://vietnambis.com/vn/blog/' + this.post.slug +'.html' },
        { name: 'twitter:title', content:this.post.title},
        { name: 'twitter:description', content:this.post.description},
        { name: 'twitter:image', content:`http://cms.vietnambis.com`+this.post.image_url},
        { name: 'twitter:site', content:'@vietnambis'},
        { name: 'twitter:creator', content:'@vietnambis'},
        { property: 'og:url', content: 'https://vietnambis.com/vn/blog/' + this.post.slug +'.html' },
        { property: 'og:title', content:this.post.title},
        { property: 'og:description', content:this.post.description},        
        { property: 'og:type', content:'article'},
        { property: 'og:site_name', content:'Vietnam BIS'}
      ]
    }
  },
  computed: {
    keywords() {
      let keywords = [];
     
        this.post.categories.forEach(function (element) {
          keywords.push(element.Title)
        });
      //console.log(this.post.content);
      return keywords
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
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
.title h1 {
    font-size: 1em;
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
