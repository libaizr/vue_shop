<template>
  <div class="nav_menu">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">处理中心</el-menu-item>
      <el-menu-item index="3">处理中心</el-menu-item>

      <span class="quit_btn">
        <div>
          <el-button type="primary" @click="logout">退出</el-button>
        </div>
      </span>
    </el-menu>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NavMenu",
  setup() {
    const router = useRouter();

    const data = reactive({
      activeIndex: "1",
    });

    const logout = () => {
      sessionStorage.clear();
      router.push("/login");
    };

    const refData = toRefs(data);

    return {
      ...refData,
      logout,
    };
  },
};
</script>

<style lang='less' scoped>
.nav_menu {
  width: 100%;
}
.quit_btn {
  width: 96px;
  height: 100%;
  position: absolute;
  right: 0;

  div {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>