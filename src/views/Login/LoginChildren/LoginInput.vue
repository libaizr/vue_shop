<template>
  <div class="login_input">
    <!-- 头像 -->
    <avatar></avatar>
    <!-- 登陆表单 -->
    <!-- 用户名 -->
    <el-form :model="LoginForm" label-width="80px" class="login_form">
      <el-form-item label="用户名">
        <el-input
          v-model="LoginForm.username"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码">
        <el-input
          v-model="LoginForm.password"
          prefix-icon="el-icon-view"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btns">
        <el-button type="primary">登录</el-button>
        <el-button type="info">重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Avatar from "./Avatar";

import { reactive, toRefs } from "vue";

export default {
  name: "LoginInput",
  components: {
    Avatar,
  },
  setup() {
    const data = reactive({
      // 登录表单数据绑定对象
      LoginForm: {
        username: "",
        password: "",
      },
    });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
</script>

<style scoped>
.login_input {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>