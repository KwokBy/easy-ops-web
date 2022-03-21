<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="新建任务"
      width="50%"
      draggable
      @close="emit('resetVisible')"
    >
      <el-steps :active="active" finish-status="success">
        <el-step title="创建任务" />
        <el-step title="选择执行对象" />
        <el-step title="设置触发器" />
      </el-steps>
      <el-form
        ref="scheduleFormRef"
        :model="scheduleForm"
        :rules="rules"
        label-width="120px"
        class="demo-scheduleForm"
      >
        <el-form-item label="任务名称" prop="name" v-show="active === 0">
          <el-input v-model="scheduleForm.name" />
        </el-form-item>
        <el-form-item label="任务内容" v-show="active === 0">
          <el-input v-model="scheduleForm.content" type="textarea" />
        </el-form-item>
        <el-form-item label="备注信息" prop="desc" v-show="active === 0">
          <el-input v-model="scheduleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="执行对象" v-show="active === 1">
          <el-select
            v-model="scheduleForm.host_ids"
            placeholder="Activity zone"
            multiple
          >
            <el-option label="Zone one" value="1" />
            <el-option label="Zone two" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="执行规则" v-show="active === 2">
          <el-input v-model="scheduleForm.spec" />
        </el-form-item>
        <el-form-item label="生效时间" v-show="active === 2">
          <el-date-picker
            v-model="scheduleForm.start"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
        <el-form-item label="终止时间" v-show="active === 2">
          <el-date-picker
            v-model="scheduleForm.end"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
        <el-form-item v-show="active === 2">
          <el-button type="primary" @click="submitForm(scheduleFormRef)"
            >Create</el-button
          >
          <el-button @click="resetForm(scheduleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 12px" @click="pre" :disabled="active === 0"
        >Pre step</el-button
      >
      <el-button style="margin-top: 12px" @click="next" :disabled="active === 2"
        >Next step</el-button
      >
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import { Schedule } from "./types";
import {
  ElSteps,
  ElStep,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker
} from "element-plus";
const active = ref(0);

const next = () => {
  active.value++;
};
const pre = () => {
  active.value--;
};

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: () => ({})
  }
});

const dialogVisible = ref(false);

let formData = ref(null);
const emit = defineEmits(["resetVisible"]);

// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  // 深拷贝防止修改原来值
  formData.value = JSON.parse(JSON.stringify(props.editData));
});

type FormInstance = InstanceType<typeof ElForm>;
const scheduleFormRef = ref<FormInstance>();
const scheduleForm = reactive<Schedule>({} as Schedule);

const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
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

<script lang="ts">
export default {
  name: "Dialog"
};
</script>
