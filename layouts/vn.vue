<template>
  <div class="app">
    <my-header></my-header>
    <side-nav></side-nav>    
    <nuxt></nuxt>    
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '~/components/vn/Header.vue'
import MyFooter from '~/components/vn/Footer.vue'
import SideNav from '~/components/vn/SideNav.vue'

export default {
  components: {
    MyHeader,
    MyFooter,
    SideNav
  },
  mounted(){    
    //seo()
  }
}
</script>
