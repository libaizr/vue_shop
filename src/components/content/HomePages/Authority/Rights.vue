<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box_card">
      <el-table :data="rightList" stripe style="width: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag v-else-if="scope.row.level === '2'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightsList } from "network/getRightsList";

import { reactive, toRefs } from "vue";

import { ElMessage } from "element-plus";

export default {
  name: "Rights",
  setup() {
    const getRightSData = () => {
      getRightsList("list")
        .then((res) => {
          if (res.data.meta.status != 200) {
            return ElMessage.error("权限列表获取失败");
          } else {
            data.rightList = res.data.data;
            console.log(data.rightList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const data = reactive({
      rightList: [],
    });
    getRightSData();

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