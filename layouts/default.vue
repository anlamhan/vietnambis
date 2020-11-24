<template>
  <div class="app">
    <my-header></my-header>
    <side-nav></side-nav>    
    <nuxt></nuxt>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'
import SideNav from '~/components/SideNav.vue'

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
