<template>
  <div class="login_input">
    <!-- 头像 -->
    <avatar></avatar>
    <!-- 登陆表单 -->
    <!-- 用户名 -->
    <el-form
      ref="loginFromRef"
      :model="LoginForm"
      :rules="loginFormRules"
      label-width="80px"
      class="login_form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="LoginForm.username"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="LoginForm.password"
          prefix-icon="el-icon-view"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btns">
<<<<<<< HEAD
        <el-button type="primary">登录</el-button>
=======
        <el-button type="primary" @click="login">登录</el-button>
>>>>>>> login
        <el-button type="info" @click="resetLoginForm">重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Avatar from "./Avatar";

import { reactive, toRefs, getCurrentInstance } from "vue";
<<<<<<< HEAD
=======
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

import { getData } from "../../../network/login";
>>>>>>> login

export default {
  name: "LoginInput",
  components: {
    Avatar,
  },
  setup() {
<<<<<<< HEAD
    const instance = getCurrentInstance();
=======
    //获取页面实例
    const instance = getCurrentInstance();
    const router = useRouter();
>>>>>>> login

    const data = reactive({
      // 登录表单数据绑定对象
      LoginForm: {
        username: "admin",
        password: "123456",
      },

      // 表单验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },

      // 表单验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    });

<<<<<<< HEAD
=======
    //表单重置
>>>>>>> login
    const resetLoginForm = () => {
      console.log(instance);
      instance.refs.loginFromRef.resetFields();
    };

<<<<<<< HEAD
=======
    //表单预验证
    const login = () => {
      instance.refs.loginFromRef.validate((valid) => {
        // console.log(valid);
        if (!valid) return;

        // axios请求验证
        getData(instance.ctx.LoginForm)
          .then((res) => {
            console.log(res);
            if (res.data.meta.status !== 200)
              return ElMessage.error("登陆失败，密码错误用户名不存在");
            // 页面Message组件
            ElMessage.success({
              message: "登陆成功",
              type: "success",
            });
            //设置页面token并跳转路由
            sessionStorage.setItem("token", res.data.data.token);
            router.push("/home");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

>>>>>>> login
    const refData = toRefs(data);

    return {
      ...refData,
      resetLoginForm,
<<<<<<< HEAD
=======
      login,
      getData,
>>>>>>> login
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