import { getExecHistories } from "/@/api/exec_history";
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="任务执行记录 "
      width="50%"
      draggable
      @close="emit('resetVisible')"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :header-cell-style="{ background: '#FAFAFA' }"
        :ref="tableRef"
      >
        <el-table-column
          v-for="(item, index) in tableDataLabel"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="status"
          label="执行状态"
        >
          <template v-slot="scope">
            <el-tag
              :type="tagMap[scope.row.status]"
              :key="scope.row.id"
              :style="{ marginRight: '10px' }"
            >
              {{ statusMap[scope.row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="text"
              @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <HistoryInfo
      :visible="historyInfoVisible"
      @resetVisible="resetVisible()"
      :task_id="taskID"
      :exec_id="execID"
    ></HistoryInfo>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watchEffect } from "vue";
import { ElDialog, ElTable, ElTableColumn } from "element-plus";
import { Table, History } from "./types";
import HistoryInfo from "/@/views/task/schedule/historyInfo.vue";
import { getExecHistories } from "/@/api/exec_history";
const historyInfoVisible = ref(false);
const statusMap = {
  0: "失败",
  1: "成功"
};
const tagMap = {
  0: "danger",
  1: "success"
};
const tableRef = ref();

const tableDataLabel: Table[] = [
  {
    label: "执行时间",
    prop: "exec_time",
    align: "center"
  }
];
let tableData = ref<History[]>([]);
let taskID = ref<number>(0);
let execID = ref<number>(0);
const handleDetail = (index: number, row: History) => {
  historyInfoVisible.value = true;
  execID.value = row.exec_id;
  taskID.value = row.task_id;
};
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: 0
  }
});

const dialogVisible = ref(false);

const emit = defineEmits(["resetVisible"]);

onBeforeMount(() => {});
const resetVisible = () => {
  historyInfoVisible.value = false;
};
// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
  getExecHistories({
    task_id: props.id
  }).then((res: any) => {
    if (res.code === 0) {
      tableData.value = res.data;
    }
  });
});
</script>

<script lang="ts">
export default {
  name: "History"
};
</script>
