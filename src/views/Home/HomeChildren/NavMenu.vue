<template>
  <div class="nav_menu">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#409eff"
      :router="true"
    >
      <el-submenu
        :index="item.id + ''"
        v-for="(item, id) in listMenus"
        :key="id"
      >
        <!-- <template #title>{{ item.authName }}</template> -->
        <template #title>
          <i :class="iconList[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>

        <el-menu-item
          :index="'/' + subItem.path"
          v-for="(subItem, id) in item.children"
          :key="id"
        >
          {{ subItem.authName }}
        </el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template #title>我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template #title>我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

import { getMenus } from "network/getmenu";

export default {
  name: "NavMenu",
  setup() {
    getMenus()
      .then((res) => {
        // console.log(res.data);
        if (res.data.meta.status !== 200) return console.log(res.data.meta.msg);
        return (data.listMenus = res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const data = reactive({
      activeIndex: "1",
      listMenus: [],
      iconList: {
        125: "el-icon-tickets",
        103: "el-icon-lock",
        101: "el-icon-orange",
        102: "el-icon-truck",
        145: "el-icon-postcard",
      },
    });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
</script>

<style lang='less' scoped>
.nav_menu {
  width: 100%;
}
</style>