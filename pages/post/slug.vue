<template>
  <div class="container">
    <div class="breadcrumbs"><span><a href="https://vietnambis.com">Home</a></span>  » <span>Blog</span> » <span>{{post.title}}</span> </div>
    <div class="section">
      <div class="poster" v-if="post.image" :style="{backgroundImage:'url('+post.image+')'}"></div>
      <div class="title"><h1>{{post.title}}</h1></div>
      <div class="info">
        <p>Ngày cập nhật：{{post.updated_at}}</p>
        <p v-if="post.tags && post.tags.length > 0">
          Tags：
          <span v-for="tag in post.tags" :key="tag.tagId">{{tag.name}}</span>
        </p>
      </div>
      <div class="content">
        <div v-html="post.html" class="md"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import timeago from 'timeago.js'
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
    //console.log(params.slug);
    var n = params.slug == undefined ? '' : params.slug.lastIndexOf(".");
    var slug = params.slug == undefined ? '' : params.slug.substring(0,n);
    if(slug=='tra-cuu-ma-so-thue-ca-nhan-tncn'|| slug=='cach-tra-cuu-ma-so-thue-doanh-nghiep')
    {
    var host = process.env.baseUrl;        
    return axios.get(`${host}/api/post/detailBySlug/` + slug).then((res) => {
      
      if (res.data.code === 404) {
        error({ statusCode: 404, message: 'Not Found This Post' });
      }
      
      var post = res.data.list[0];      
      console.log(post)
      post.html = marked(post.markdown);      
      return { post, slug }
    }).catch((err) => {
      error({ statusCode: 404, message: err.message })
    })
    }
    else
    {
      return axios.get(`http://localhost:1337/posts?slug=` + slug).then((res) => {
      
      if (res.data.code === 404) {
        error({ statusCode: 404, message: 'Not Found This Post' });
      }
      
      var post = res.data[0];      
      post.html = marked(post.content);
      return { post, slug }
    }).catch((err) => {
      error({ statusCode: 404, message: err.message })
    })
    
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.meta_description },
        { name: 'keywords', content: this.keywords.join(',') }
      ]
    }
  },
  computed: {
    keywords() {
      let keywords = [];
       if(this.slug=='tra-cuu-ma-so-thue-ca-nhan-tncn'|| this.slug=='cach-tra-cuu-ma-so-thue-doanh-nghiep')
     {
       this.post.tags.forEach(function (element) {
         keywords.push(element.name)
       });
     }
     else
     {
      //  this.post.categories.forEach(function (element) {
      //    keywords.push(element.name)
      //  });
      console.log(this.post.content);
      return keywords
     }
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
