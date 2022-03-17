<template>
  <el-form
    ref="hostFormRef"
    :model="hostForm"
    :rules="rules"
    label-width="120px"
    class="demo-hostForm"
  >
    <el-form-item label="主机名称" prop="name">
      <el-input v-model="hostForm.name" />
    </el-form-item>
    <el-form-item label="连接地址" prop="address">
      <el-col :span="7"
        ><el-input placeholder="用户名" v-model="hostForm.user"
          ><template #prepend>ssh</template></el-input
        ></el-col
      >
      <el-col :span="10"
        ><el-input placeholder="主机名/IP" v-model="hostForm.host_name"
          ><template #prepend>@</template></el-input
        ></el-col
      >
      <el-col :span="7"
        ><el-input placeholder="端口" v-model="hostForm.port"
          ><template #prepend>-p</template></el-input
        ></el-col
      >
    </el-form-item>
    <el-form-item label="主机密码" prop="password">
      <el-input v-model="hostForm.password" />
    </el-form-item>
    <el-form-item label="备注信息" prop="desc">
      <el-input v-model="hostForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(hostFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(hostFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
export default {
  name: "HostForm"
};
</script>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import { ElForm, ElFormItem, ElButton, ElInput } from "element-plus";
import { addHost, updateHost } from "../../../api/host";
type FormInstance = InstanceType<typeof ElForm>;
const hostFormRef = ref<FormInstance>();
interface Host {
  id: number;
  host: string;
  host_name: string;
  password: string;
  desc: string;
  user: string;
  name: string;
  owner: string;
  port: number;
  updated_time: string;
}
// let hostForm = ref<Host>({} as Host);
let hostForm = reactive<Host>({} as Host);
const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ]
});

const props = defineProps({
  formData: {
    type: Object as () => Host,
    default: () => ({} as Host)
  }
});
const emitsDialog = defineEmits<{
  (e: "close"): void;
}>();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 更新存在id
      if (hostForm.id > 0) {
        console.log(hostForm);
        updateHost(hostForm).then(res => {
          emitsDialog("close");
          hostForm = {} as Host;
        });
        // 新增无id
      } else {
        console.log(hostForm);
        addHost(hostForm).then(res => {
          emitsDialog("close");
          hostForm = {} as Host;
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 监听父组件的visible属性
watchEffect(() => {
  hostForm = props.formData;
});
</script>
