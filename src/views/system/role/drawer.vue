<template>
  <el-drawer
    v-model="dialogVisible"
    title="I have a nested table inside!"
    direction="rtl"
    size="50%"
    @close="emit('resetVisible')"
  >
    <RoleTree></RoleTree>
  </el-drawer>
</template>
<script lang="ts">
export default {
  name: "drawer"
};
</script>
<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { ElDrawer } from "element-plus";
import RoleTree from "./tree.vue";

const dialogVisible = ref(false);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["resetVisible"]);
// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
});
</script>
