<template>
  <div class="app">
    <my-header></my-header>    
    <nuxt></nuxt>    
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '~/components/vn/Header.vue'
import MyFooter from '~/components/vn/Footer.vue'

export default {
  components: {
    MyHeader,
    MyFooter    
  },
  mounted(){    
    //seo()
  }
}
</script>
