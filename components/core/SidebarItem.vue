<template>
  <div v-if="!item.hidden">
    <el-menu-item
      :index="item.name"
      :route="{ path: item.path }"
      v-if="!item.children"
      :key="item.name"
    >
      <i
        v-if="item.meta && item.meta.icon"
        :class="`el-icon-` + item.meta.icon"
        class="icon"
      ></i>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>

    <el-submenu :index="item.name" v-else>
      <template slot="title">
        <i
          v-if="item.meta && item.meta.icon"
          :class="`el-icon-` + item.meta.icon"
          class="icon"
        ></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <el-menu-item
        v-for="subMenu in item.children"
        :index="subMenu.name"
        :route="{ path: subMenu.path }"
        :key="subMenu.name"
      >
        <span>{{ subMenu.meta.title }}</span>
      </el-menu-item>
    </el-submenu>
  </div>
  <!-- <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :unique-opened="true"> -->
    
      <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item one</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-submenu>
    </el-submenu> -->
    <!-- <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span>Navigator Two</span>
    </el-menu-item> -->
    <!-- <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span>Navigator Four</span>
    </el-menu-item> -->
      <!-- <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <!-- <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
    
</template>
<script>
export default {
  // eslint-disable
   props: {
     item: {
       type: Object,
       required: true
     }
   }  
}
</script>
<style lang="scss" scoped>
.icon {
  font-size: 20px;
}
.menu-vertical:not(.el-menu--collapse) {
  width: 256px;
}
.el-menu--collapse {
  width: 80px;
  .collapse-text-center {
    text-align: center;
  }
}
</style>
