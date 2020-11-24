<template>
  <div id="app">
    <div :class="classObj" class="app-wrapper">
      <div
        v-if="device === 'mobile' && sidebar.opened"
        @click="handleClickOutside"
        class="drawer-bg"
      />
      <core-drawer class="sidebar-container" />
      <div class="main-container">
        <div :class="{ 'fixed-header': fixedHeader }">
          <core-header />
        </div>
        <core-main />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import ResizeHandler from '@/util/mixins/ResizeHandler'
import CoreHeader from '~/components/core/Header.vue'
import CoreDrawer from '~/components/core/Drawer.vue'
import CoreMain from '~/components/core/Main.vue'
import elementUI from  'element-ui'  // all of the components of the UI Element- 

import 'normalize.css/normalize.css'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })

Vue.use ( elementUI )

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('@/components', true, /\.vue$/)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

export default {
  // eslint-disable
  name: 'Admin',
  mixins: [ResizeHandler],
  components: {
    CoreHeader,
    CoreDrawer,
    CoreMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  script: [
      { src: '~/plugins/element-ui.js' },
      { src: '~/plugins/components.js' }
    ]
}
</script>
 <style lang="css" src='element-ui/lib/theme-chalk/index.css'>
     /* global styles */
 </style> 
<style lang="scss" scoped>
@import '~/assets/element-ui/index.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
</style>
