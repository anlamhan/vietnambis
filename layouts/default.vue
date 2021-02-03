<template>
  <div class="app">
    <my-header></my-header>    
    <nuxt></nuxt>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'

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
