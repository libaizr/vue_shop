<template>
  <div class="nav_top">
    <span class="logo"
      ><img src="../../../assets/img/logo/logo.png" alt=""
    /></span>
    <span class="title">
      <p>商品后台管理系统</p>
    </span>
  </div>
</template>

<script>
export default {
  name: "NavTop",
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
</style>