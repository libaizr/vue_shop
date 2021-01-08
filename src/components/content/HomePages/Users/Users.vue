<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <template #header>
        <div class="clearfix">
          <span>用户列表</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
      </template>
      <div v-for="(item, id) in userList" :key="id" class="text item">
        {{ item.role_name }}
      </div>
      {{ userList }}
    </el-card>
  </div>
</template>

<script>
import { getUsersList } from "network/getUsersList";
import { reactive, toRefs } from "vue";

export default {
  name: "Users",
  setup() {
    getUsersList(1, 10)
      .then((res) => {
        console.log(res.data);
        if (res.data.meta.status !== 200) return console.log(res.data.meta.msg);
        return (data.userList = res.data.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

    const data = reactive({
      userList: [],
      pagenum: "",
    });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
</script>

<style lang='less' scoped>
.breadcrumb {
  padding: 15px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 70%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 10%);
}
</style>