<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="新建角色"
      width="50%"
      draggable
      @close="emit('resetVisible')"
    >
      <el-form
        ref="roleFormRef"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name_zh" />
        </el-form-item>
        <el-form-item label="角色id">
          <el-input v-model="roleForm.role_id" type="textarea" />
        </el-form-item>
        <el-form-item label="备注信息" prop="desc">
          <el-input v-model="roleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(roleFormRef)"
            >Create</el-button
          >
          <el-button @click="resetForm(roleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref, watchEffect } from "vue";
import { Role } from "./types";
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from "element-plus";
import { addRole } from "/@/api/role";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object as () => Role,
    default: () => ({})
  }
});

const dialogVisible = ref(false);

const emit = defineEmits(["resetVisible"]);

type FormInstance = InstanceType<typeof ElForm>;
const roleFormRef = ref<FormInstance>();
const roleForm = ref<Role>({} as Role);

const rules = reactive({});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = reactive({ ...roleForm.value });
      data.role_id = Number(data.role_id);
      addRole(data).then(() => {
        emit("resetVisible");
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onBeforeMount(() => {});

// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  // 深拷贝防止修改原来值
  roleForm.value = JSON.parse(JSON.stringify(props.editData));
});
</script>

<script lang="ts">
export default {
  name: "addRole"
};
</script>
