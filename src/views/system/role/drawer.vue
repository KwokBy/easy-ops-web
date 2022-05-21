<template>
  <el-drawer
    v-model="dialogVisible"
    title="I have a nested table inside!"
    direction="rtl"
    size="50%"
    @close="emit('resetVisible')"
  >
    <RoleTree :roleID="roleID"></RoleTree>
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
import { Role } from "./types";

const dialogVisible = ref(false);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  row: {
    type: Object as () => Role,
    default: () => ({})
  }
});
let roleID = ref(888);
const emit = defineEmits(["resetVisible"]);
// 监听父组件的visible属性
watchEffect(() => {
  roleID.value = props.row.role_id;
  dialogVisible.value = props.visible;
});
</script>
