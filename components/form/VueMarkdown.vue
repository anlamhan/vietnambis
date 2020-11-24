<template>
    <div class="markdown">
        <div class="md" v-html="markdownHtml"></div>
    </div>
</template>

<script>

 import hljs from 'highlight.js'

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
     highlight: function (code) {
       return hljs.highlightAuto(code).value;
     }
 });

export default {
     props: ['markdown'],
     data() {
         return {
             markdownHtml:marked(this.markdown),
         }
     },
     watch:{
         markdown(val){
             this.markdownHtml = marked(this.markdown)
         }
     }
 }
</script>