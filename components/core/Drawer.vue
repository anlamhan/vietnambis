<template>
  <div :class="{ 'has-logo': showLogo }">
    <core-logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu @open="handleOpen" @close="handleClose"
        :default-active="activeRoute"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        router
      >
      <core-SidebarItem
          v-for="route in routes"
          :key="route.key"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CoreSidebarItem from '~/components/core/SidebarItem.vue'
import CoreLogo from '~/components/core/Logo.vue'
import variables from '@/assets/element-ui/variables.scss'
import menus from '~/config/menus.js';
var result = [];
export default {
  components: {
    CoreSidebarItem,
    CoreLogo  
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {      
      return menus.routeItems
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {      
      return !this.sidebar.opened      
    },
    activeRoute() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },  
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/element-ui/variables.scss';
@import '~@/assets/element-ui/sidebar.scss';
</style>
