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
    <el-form-item label="连接地址" prop="desc">
      <el-col :span="7"
        ><el-input placeholder="用户名" v-model="hostForm.desc"
          ><template #prepend>ssh</template></el-input
        ></el-col
      >
      <el-col :span="10"
        ><el-input placeholder="主机名/IP" v-model="hostForm.desc"
          ><template #prepend>@</template></el-input
        ></el-col
      >
      <el-col :span="7"
        ><el-input placeholder="端口" v-model="hostForm.desc"
          ><template #prepend>-p</template></el-input
        ></el-col
      >
    </el-form-item>
    <el-form-item label="主机密码" prop="name">
      <el-input v-model="hostForm.name" />
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
import { reactive, ref } from "vue";
import { ElForm, ElFormItem, ElButton, ElInput } from "element-plus";

type FormInstance = InstanceType<typeof ElForm>;
const hostFormRef = ref<FormInstance>();
const hostForm = reactive({
  name: "",
  desc: ""
});

const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
