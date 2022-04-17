<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="新建镜像"
      width="50%"
      draggable
      @close="emit('resetVisible')"
    >
      <el-form
        ref="imageFormRef"
        :model="imageForm"
        :rules="rules"
        label-width="120px"
        class="demo-imageForm"
      >
        <el-form-item label="镜像名称" prop="name">
          <el-input v-model="imageForm.name" />
        </el-form-item>
        <el-form-item label="镜像内容">
          <el-input v-model="imageForm.dockerfile" type="textarea" />
        </el-form-item>
        <el-form-item label="备注信息" prop="desc">
          <el-input v-model="imageForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(imageFormRef)"
            >确认</el-button
          >
          <el-button type="primary" @click="submitForm(imageFormRef)"
            >调试</el-button
          >
          <el-button @click="resetForm(imageFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import { Image } from "./types";
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from "element-plus";
import { addImage } from "/@/api/image";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object as () => Image,
    default: () => ({})
  }
});

const dialogVisible = ref(false);

const emit = defineEmits(["resetVisible"]);

type FormInstance = InstanceType<typeof ElForm>;
const imageFormRef = ref<FormInstance>();
const imageForm = ref<Image>({} as Image);

const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = reactive({ ...imageForm.value });
      console.log(imageForm.value);
      addImage(data).then(res => {
        dialogVisible.value = false;
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

// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  // 深拷贝防止修改原来值
  imageForm.value = JSON.parse(JSON.stringify(props.editData));
  imageForm.value.id = null;
  console.log(imageForm.value);
});
</script>

<script lang="ts">
export default {
  name: "Dialog"
};
</script>
