<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box_card">
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="rolesList" stripe style="width: 100%" border>
        <el-table-column type="expand"></el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRolesList } from "network/getRolesList";
import { ElMessage } from "element-plus";
import { reactive, toRefs } from "vue";

export default {
  name: "Roles",
  setup() {
    const data = reactive({
      rolesList: [],
    });

    getRolesList()
      .then((res) => {
        if (res.data.meta.status != 200) {
          return ElMessage.error("获取角色列表失败");
        } else {
          console.log(res);
          data.rolesList = res.data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
</script>

<style lang='less' scope>
.breadcrumb {
  padding: 15px;
}
.box_card {
  width: 85%;
  position: relative;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
}
</style>