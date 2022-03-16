<template>
  <el-button type="primary" :icon="Plus" @click="dialogVisible = true"
    >新建
  </el-button>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <HostForm />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: "HostDialog"
};
</script>
<script lang="ts" setup>
import { ref } from "vue";
import { ElDialog } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import HostForm from "/@/views/resource/form/hostForm.vue";
const dialogVisible = ref(false);
</script>
