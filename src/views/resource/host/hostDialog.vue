<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="50%"
    draggable
    @close="emit('resetVisible')"
  >
    <HostForm @close="close()" :formData="formData" />
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: "HostDialog"
};
</script>
<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { ElDialog } from "element-plus";
import HostForm from "/@/views/resource/host/hostForm.vue";

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

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object as () => Host,
    default: () => ({})
  }
});

const dialogVisible = ref(false);

let formData = ref<Host>({} as Host);
const emit = defineEmits(["resetVisible"]);

const close = () => {
  dialogVisible.value = false;
  formData.value = {} as Host;
  emit("resetVisible");
};

// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  // 深拷贝防止修改原来值
  formData.value = JSON.parse(JSON.stringify(props.editData));
});
</script>
