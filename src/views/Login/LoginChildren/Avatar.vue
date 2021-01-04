<template>
  <div class="avatar_box">
    <img src="../../../assets/img/img4.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: "Avatar",
};
</script>

<style lang='less' scoped>
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #dddddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}
</style>