<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="50%"
      draggable
      @close="emit('resetVisible')"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userForm.nickname" />
        </el-form-item>
        <el-form-item label="密码" prop="desc">
          <el-input v-model="userForm.password" />
        </el-form-item>
        <el-form-item label="头像" prop="desc">
          <el-input v-model="userForm.avatar" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="userForm.role_id"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in roles"
              :key="item.role_id"
              :label="item.name_zh"
              :value="item.role_id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(userFormRef)"
            >Create</el-button
          >
          <el-button @click="resetForm(userFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref, watchEffect } from "vue";
import { Role, User } from "./types";
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption
} from "element-plus";
import { addTask } from "/@/api/task";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object as () => User,
    default: () => ({})
  },
  roleList: {
    type: Array as () => Role[],
    default: () => []
  }
});

const dialogVisible = ref(false);

const emit = defineEmits(["resetVisible"]);

type FormInstance = InstanceType<typeof ElForm>;
const userFormRef = ref<FormInstance>();
const userForm = ref<User>({} as User);

const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = reactive({ ...userForm.value });
      addTask(data).then(res => {
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
let roles = ref<Role[]>([]);
// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  // 深拷贝防止修改原来值
  userForm.value = JSON.parse(JSON.stringify(props.editData));
  roles.value = props.roleList;
});
</script>

<script lang="ts">
export default {
  name: "userDialog"
};
</script>
