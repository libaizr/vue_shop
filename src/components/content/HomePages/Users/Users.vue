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
        </div>
      </template>
      <div>
        <el-table :data="userList" stripe style="width: 100%">
          <el-table-column type="index" width="50" label="#"> </el-table-column>
          <el-table-column prop="role_name" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="手机"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#eeee98"
                @change="userStateChange(scope.row)"
              >
              </el-switch>
              <!-- {{scope.row.mg_state}} -->
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <template v-slot="scope">
              <!-- 修改按钮 -->
              <el-tooltip
                class="item"
                effect="light"
                content="修改"
                placement="bottom"
                :enterable="false"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="changeuser"
                ></el-button>
              </el-tooltip>

              <!-- 删除按钮 -->
              <el-tooltip
                class="item"
                effect="light"
                content="删除"
                placement="bottom"
                :enterable="false"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-tooltip>

              <!-- 分配角色按钮 -->
              <el-tooltip
                class="item"
                effect="light"
                content="分配角色"
                placement="bottom"
                :enterable="false"
              >
                <el-button type="warning" icon="el-icon-setting" size="mini">
                </el-button>
              </el-tooltip>
              {{ scope.row.id }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- {{ userList }} -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 4]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUsersList } from "network/getUsersList";
import { putUserState } from "network/putUserState";
import { reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";

export default {
  name: "Users",
  setup() {
    const getList = () => {
      getUsersList(data.pagenum, data.pagesize)
        .then((res) => {
          console.log(res.data);
          if (res.data.meta.status !== 200)
            return console.log(res.data.meta.msg);
          data.total = res.data.data.total;
          data.userList = res.data.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const data = reactive({
      total: 0,
      userList: [],
      pagenum: 1,
      pagesize: 2,
    });
    getList();

    // 设置单页显示条数
    const handleSizeChange = (newSize) => {
      // console.log(newSize);
      data.pagesize = newSize;
      getList();
    };

    // 设置当前页码
    const handleCurrentChange = (newPage) => {
      // console.log(newPage);
      data.pagenum = newPage;
      getList();
    };

    const userStateChange = (userInfo) => {
      console.log(userInfo);
      putUserState(userInfo.id, userInfo.mg_state).then((res) => {
        if (res.data.meta.status != 200) {
          userInfo.mg_state = !userInfo.mg_state;
          console.log(res);
          return ElMessage.error("更新用户状态失败");
        } else {
          ElMessage.success("更新用户状态成功");
        }
      });
    };

    const changeuser = (item) => {
      console.log(item);
    };

    const refData = toRefs(data);

    return {
      ...refData,
      changeuser,
      handleSizeChange,
      handleCurrentChange,
      userStateChange,
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
  width: 75%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 10%);
}
</style>