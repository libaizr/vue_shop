<template>
  <div class="nav_top">
    <span class="logo"><img src="~assets/img/logo/logo.png" alt="" /></span>
    <span class="title">
      <p>商品后台管理系统</p>
    </span>
    <span class="quit_btn">
      <div>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </span>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "NavTop",
  setup() {
    const router = useRouter();

    const logout = () => {
      sessionStorage.clear();
      router.push("/login");
    };

    return {
      logout,
    };
  },
};
</script>

<style lang='less' scoped>
.nav_top {
  width: 100%;
  height: 60px;
  background-color: #0097fc;
  display: flex;

  .logo {
    width: 40px;
    flex: 1;

    img {
      width: 40px;
      height: 40px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .title {
    flex: 11;

    p {
      line-height: 60px;
      font-family: "幼圆";
      font-size: 24px;
      float: left;
      font-weight: bold;
      position: relative;
      top: 10%;
      transform: translateY(-50%);
    }
  }
}
.quit_btn {
  width: 96px;  
  height: 100%;
  position: relative;

  .el-button--primary {
    background-color: #5f3ac257;
    border-color: #1862ae;
  }

  div {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>