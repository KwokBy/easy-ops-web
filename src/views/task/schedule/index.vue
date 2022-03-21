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
        </template>
      </el-table-column>
    </el-table>
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
  ElRadioButton
} from "element-plus";
import Dialog from "/@/views/task/schedule/dialog.vue";
import { Plus } from "@element-plus/icons-vue";
import { getTasks } from "../../../api/task";
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

let editData = ref<Host>({} as Host);

const handleEdit = (index: number, row: Host) => {
  editData.value = row;
  editVisible.value = true;
};
const handleDelete = (index: number, row: Host) => {};

let tableData = ref<Host[]>([]);
interface response {
  code: number;
  data: Host[];
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
};

const radio1 = ref("全部");
</script>
