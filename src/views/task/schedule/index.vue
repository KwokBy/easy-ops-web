<template>
  <el-card>
    <el-row :gutter="10" style="margin-bottom: 10px" justify="end">
      <el-col :span="2">
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true"
          >新建
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部" />
          <el-radio-button label="已激活" />
          <el-radio-button label="未激活" />
        </el-radio-group>
      </el-col>
    </el-row>
    <Dialog :visible="dialogVisible" @resetVisible="resetVisible()"></Dialog>
    <Dialog
      :visible="editVisible"
      @resetVisible="resetVisible()"
      :editData="editData"
    ></Dialog>
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
        label="状态"
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
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleExec(scope.$index, scope.row)"
            >执行一次测试</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleHistory(scope.$index, scope.row)"
            >执行历史</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleActive(scope.$index, scope.row)"
            >激活</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleStop(scope.$index, scope.row)"
            >禁用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <History
      :visible="historyVisible"
      :id="taskID"
      @resetVisible="resetVisible()"
    ></History>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "schedule"
};
</script>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElCard,
  ElRadioGroup,
  ElRadioButton,
  ElMessage
} from "element-plus";
import Dialog from "/@/views/task/schedule/dialog.vue";
import History from "/@/views/task/schedule/history.vue";
import { Plus } from "@element-plus/icons-vue";
import { activeTask, execTest, getTasks, stopTask } from "../../../api/task";
import { Schedule } from "./types";

interface Table {
  label: string;
  prop: string;
  align: string;
}
const statusMap = {
  0: "未激活",
  1: "待调度",
  2: "执行中",
  3: "已完成",
  4: "已取消",
  5: "已失败"
};
const tagMap = {
  0: "info",
  1: "",
  2: "",
  3: "success",
  4: "warning",
  5: "danger"
};
const dialogVisible = ref(false);
const editVisible = ref(false);
const historyVisible = ref(false);
const tableRef = ref();
const tableDataLabel: Table[] = [
  {
    label: "任务名称",
    prop: "name",
    align: "center"
  },
  {
    label: "描述",
    prop: "desc",
    align: "center"
  },
  {
    label: "更新时间",
    prop: "updated_time",
    align: "center"
  }
];

let editData = ref<Schedule>({} as Schedule);

const handleEdit = (index: number, row: Schedule) => {
  editData.value = row;
  editVisible.value = true;
};
const handleDelete = (index: number, row: Schedule) => {};

let tableData = ref<Schedule[]>([]);
interface response {
  code: number;
  data: Schedule[];
  msg: string;
}

onBeforeMount(() => {
  getTasks({
    owner: "doubleguo"
  }).then((res: response) => {
    tableData.value = res.data;
  });
});

const resetVisible = () => {
  dialogVisible.value = false;
  editVisible.value = false;
  historyVisible.value = false;
};
const handleExec = (index: number, row: Schedule) => {
  execTest(row).then((res: response) => {
    ElMessage.success({
      message: "执行成功",
      type: "success",
      center: true
    });
  });
};
const handleActive = (index: number, row: Schedule) => {
  activeTask(row).then((res: response) => {
    if (res.code === 0) {
      tableData.value[index].status = 1;
    }
  });
};
const handleStop = (index: number, row: Schedule) => {
  stopTask({
    task_id: row.id
  }).then((res: response) => {
    if (res.code === 0) {
      tableData.value[index].status = 0;
    }
  });
};
let taskID = ref<number>(0);
const handleHistory = (index: number, row: Schedule) => {
  historyVisible.value = true;
  taskID.value = row.id;
};
const radio1 = ref("全部");
</script>
