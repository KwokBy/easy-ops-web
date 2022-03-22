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
            value-key="id"
          >
            <el-option
              v-for="host in hosts"
              :key="host.id"
              :label="host.name"
              :value="host.id"
            />
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
import { onBeforeMount, reactive, ref, watchEffect } from "vue";
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
import { addTask } from "/@/api/task";
import { getHosts } from "/@/api/host";
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
    type: Object as () => Schedule,
    default: () => ({})
  }
});

const dialogVisible = ref(false);

const emit = defineEmits(["resetVisible"]);

type FormInstance = InstanceType<typeof ElForm>;
const scheduleFormRef = ref<FormInstance>();
const scheduleForm = ref<Schedule>({} as Schedule);

const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = reactive({ ...scheduleForm.value });
      console.log(scheduleForm.value);
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

interface Host {
  id: number;
  host: string;
  host_name: string;
  user: string;
  name: string;
  owner: string;
  password: string;
  desc: string;
  port: number;
  updated_time: string;
}
interface response {
  code: number;
  data: Host[];
  msg: string;
}
let hosts = ref<Host[]>([]);
onBeforeMount(() => {
  getHosts({
    owner: "doubleguo"
  }).then((res: response) => {
    hosts.value = res.data;
  });
});

// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  // 深拷贝防止修改原来值
  scheduleForm.value = JSON.parse(JSON.stringify(props.editData));
  console.log(scheduleForm.value);
});
</script>

<script lang="ts">
export default {
  name: "Dialog"
};
</script>
