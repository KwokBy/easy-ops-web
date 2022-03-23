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
    ></HistoryInfo>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watchEffect } from "vue";
import { ElDialog, ElTable, ElTableColumn } from "element-plus";
import { Table, History } from "./types";
import HistoryInfo from "/@/views/task/schedule/historyInfo.vue";
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
const handleDetail = (index: number, row: History) => {
  historyInfoVisible.value = true;
};
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const dialogVisible = ref(false);

const emit = defineEmits(["resetVisible"]);

onBeforeMount(() => {
  tableData.value = [
    {
      task_id: 1,
      status: 1,
      exec_time: "2020-05-05 12:12:12",
      exec_id: 1
    },
    {
      task_id: 2,
      status: 0,
      exec_time: "2020-05-05 12:12:12",
      exec_id: 1
    }
  ];
});
const resetVisible = () => {
  historyInfoVisible.value = false;
};
// 监听父组件的visible属性
watchEffect(() => {
  dialogVisible.value = props.visible;
});
</script>

<script lang="ts">
export default {
  name: "History"
};
</script>
