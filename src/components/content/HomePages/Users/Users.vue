<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="query" placeholder="请输入关键字"></el-input>
            <span class="user_search">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="getList"
              ></el-button
            ></span>
            <span class="user_add"
              ><el-button type="primary" @click="showAddDialog = true"
                >添加用户</el-button
              >
            </span>
          </el-col>
        </el-row>
      </div>

      <!-- 用户列表 -->
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
                  @click="userInfoEdit(scope)"
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
                  @click="userDeleteDialog(scope)"
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
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="roleAssign"
                >
                </el-button>
              </el-tooltip>
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

    <!-- 添加用户会话框 -->
    <el-dialog
      title="添加用户"
      v-model="showAddDialog"
      width="40%"
      :close-on-click-modal="false"
      @close="addDialogClosed"
    >
      <span>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="userAddForm"
          :rules="addFormRules"
          ref="addFormRef"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userAddForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <!-- <el-input
              type="password"
              v-model="userAddForm.password"
              autocomplete="off"
            ></el-input> -->
            <el-input v-model="userAddForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userAddForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="userAddForm.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="addUser">添 加</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改用户信息 -->
    <user-edit-dialog
      :showEditDialog="showEditDialog"
      @editDialogClosed="editDialogClosed"
      @editCommit="editCommit"
    >
      <span>
        <el-form
          label-position="right"
          label-width="80px"
          :model="userEditForm"
          :rules="editFromRules"
          ref="editFormRef"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userEditForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="userEditForm.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
    </user-edit-dialog>
  </div>
</template>

<script>
import { getUsersList } from "network/getUsersList";
import { putUserState } from "network/putUserState";
import { addUserToData } from "network/addUserToData";
import { putUserIfon } from "network/putUserIfon";
import { userDelete } from "network/userDelete";

import { reactive, toRefs, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";

import UserEditDialog from "./UserChildren/UserEditDialog";

export default {
  name: "Users",
  setup() {
    const instance = getCurrentInstance();
    // console.log(instance);
    // 获取列表信息方法
    const getList = () => {
      getUsersList(data.query, data.pagenum, data.pagesize)
        .then((res) => {
          // console.log(res.data);
          if (res.data.meta.status !== 200)
            return console.log(res.data.meta.msg);
          data.total = res.data.data.total;
          data.userList = res.data.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const state = reactive({
      labelPosition: "right",
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
      },
      userAddForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      oprationIndex: "",
      userEditForm: {
        email: "",
        mobile: "",
      },
      editFromRules: {
        email: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
        mobile: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    });

    const data = reactive({
      showEditDialog: false,
      showAddDialog: false,
      total: 0,
      userList: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
    });
    getList();

    //添加操作操作对话框关闭同时重置输入数据
    const addDialogClosed = () => {
      state.userAddForm.username = "";
      state.userAddForm.password = "";
      state.userAddForm.email = "";
      state.userAddForm.mobile = "";
    };

    //添加按钮事件
    const addUser = () => {
      // console.log(instance);
      //预验证
      instance.refs.addFormRef.validate((valid) => {
        if (!valid) return;
        addUserToData(state.userAddForm)
          .then((res) => {
            console.log(res);
            if (res.data.meta.status != 201) {
              return ElMessage.error("创建失败," + res.data.meta.msg);
            } else {
              data.showAddDialog = false;
              return ElMessage.success("创建成功");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

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

    // 修改用户状态
    const userStateChange = (userInfo) => {
      // console.log(userInfo);
      putUserState(userInfo.id, userInfo.mg_state).then((res) => {
        if (res.data.meta.status != 200) {
          userInfo.mg_state = !userInfo.mg_state;
          // console.log(res);
          return ElMessage.error("更新用户状态失败");
        } else {
          ElMessage.success("更新用户状态成功");
        }
      });
    };

    //子组件关闭时重置会话框状态
    const editDialogClosed = (index) => {
      data.showEditDialog = index;
      state.oprationIndex = "";
      state.userEditForm.email = "";
      state.userEditForm.mobile = "";
    };

    //会话框开启
    const userInfoEdit = (item) => {
      // console.log(item);
      data.showEditDialog = true;
      state.oprationIndex = item.row.id;
    };

    //编辑按钮提交
    const editCommit = () => {
      // console.log(state.oprationIndex);
      putUserIfon(state.oprationIndex, state.userEditForm)
        .then((res) => {
          data.showEditDialog = false;
          // console.log(res.data);
          if (res.data.meta.status != 200) {
            return ElMessage.error("更新用户信息失败");
          } else {
            getList();
            ElMessage.success("更新用户信息成功");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //删除按钮
    const userDeleteDialog = (scope) => {
      let res = confirm("此操作将永久删除该用户, 是否继续?");
      if (res == true) {
        userDelete(scope.row.id)
          .then((res) => {
            if (res.data.meta.status != 200) {
              return ElMessage.error("删除失败");
            } else {
              getList();
              ElMessage.success("删除成功");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return ElMessage("取消删除");
      }
    };

    //分配角色按钮
    const roleAssign = () => {
      console.log(1);
    };

    const refData = toRefs(data);
    const refState = toRefs(state);

    return {
      ...refData,
      ...refState,
      userInfoEdit,
      handleSizeChange,
      handleCurrentChange,
      userStateChange,
      getList,
      addDialogClosed,
      addUser,
      editDialogClosed,
      editCommit,
      userDeleteDialog,
      roleAssign,
    };
  },
  components: {
    UserEditDialog,
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

  .user_search {
    position: absolute;
    margin-left: 5px;
  }

  .user_add {
    position: absolute;
    margin-left: 70px;
  }
}
</style>