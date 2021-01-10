<template>
  <div>
    <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      @close="editDialogClosed(dialogVisible)"
    >
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCommit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, watch, getCurrentInstance } from "vue";
export default {
  name: "UserEditDialog",
  setup(props, ctx) {
    const instance = getCurrentInstance();

    const data = reactive({
      dialogVisible: false,
    });

    // console.log(instance);

    watch(
      () => {
        return instance.parent.ctx.showEditDialog;
      },
      (value) => {
        data.dialogVisible = value;
      }
    );

    const editDialogClosed = (index) => {
      ctx.emit("editDialogClosed", index);
    };

    const editCommit = () => {
      ctx.emit("editCommit");
    };
    const refData = toRefs(data);

    return {
      ...refData,
      editDialogClosed,
      editCommit,
    };
  },
};
</script>

<style>
</style>