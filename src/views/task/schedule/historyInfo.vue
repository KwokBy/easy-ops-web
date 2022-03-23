import { getExecHistoryInfos } from "/@/api/exec_history_info";
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="任务执行记录 "
      width="50%"
      draggable
      @close="emit('resetVisible')"
    >
      <el-row :gutter="10" justify="center">
        <el-col :span="6">
          <el-row :gutter="10" justify="center"> 执行成功 </el-row>
          <el-row :gutter="10" justify="center">
            {{ historyInfo.success_count }}
          </el-row>
        </el-col>
        <el-divider direction="vertical" />
        <el-col :span="4" :offset="2">
          <el-row :gutter="10" justify="center"> 执行失败 </el-row>
          <el-row :gutter="10" justify="center">
            {{ historyInfo.fail_count }}
          </el-row></el-col
        >
        <el-divider direction="vertical" />
        <el-col :span="4" :offset="2">
          <el-row :gutter="10" justify="center"> 平均耗时 </el-row>
          <el-row :gutter="10" justify="center">
            {{ historyInfo.avg_cost }}
          </el-row></el-col
        >
      </el-row>
      <el-tabs tab-position="left" class="demo-tabs">
        <el-tab-pane
          v-for="execHistory in execHistories"
          :label="execHistory.host_name"
          :key="execHistory.id"
        >
          <template #label>
            <span class="custom-tabs-label">
              <span :style="colorMap[execHistory.status]">{{
                execHistory.host_name
              }}</span>
            </span>
          </template>
          <el-descriptions class="margin-top" :column="1">
            <el-descriptions-item label="执行时间">{{
              execHistory.created_time
            }}</el-descriptions-item>
            <el-descriptions-item label="运行耗时">{{
              execHistory.time_consume
            }}</el-descriptions-item>
            <el-descriptions-item label="执行结果">{{
              execHistory.status
            }}</el-descriptions-item>
            <el-descriptions-item label="执行输出">
              <el-input
                v-model="execHistory.content"
                :rows="2"
                type="textarea"
                placeholder="Please input"
                disabled
              />
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watchEffect } from "vue";
import {
  ElDialog,
  ElRow,
  ElCol,
  ElDescriptions,
  ElDescriptionsItem
} from "element-plus";
import { HistoryInfo, ExecHistory } from "./types";
import { getExecHistoryInfos } from "/@/api/exec_history_info";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  task_id: {
    type: Number,
    default: 0
  },
  exec_id: {
    type: Number,
    default: 0
  }
});
const colorMap = {
  0: "color: #f56c6c",
  1: ""
};
const dialogVisible = ref(false);

const emit = defineEmits(["resetVisible"]);
const historyInfo = ref<HistoryInfo>();
const execHistories = ref<ExecHistory[]>([]);
onBeforeMount(() => {});

// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  if (props.visible) {
    getExecHistoryInfos({
      task_id: props.task_id,
      exec_id: props.exec_id
    }).then((res: any) => {
      console.log(res);
      historyInfo.value = res.data;
      execHistories.value = res.data.exec_histories;
    });
  }
});
</script>

<script lang="ts">
export default {
  name: "History"
};
</script>
