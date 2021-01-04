<template>
  <div class="login_container">
    <login-input></login-input>
  </div>
</template>

<script>
import LoginInput from "./LoginChildren/LoginInput.vue";

export default {
  name: "Login",
  components: {
    LoginInput,
  },
};
</script>

<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
</style>