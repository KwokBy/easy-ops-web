<template>
  <el-card>
    <el-button type="primary" :icon="Plus" @click="dialogVisible = true"
      >新建
    </el-button>
    <HostDialog :visible="dialogVisible" @resetVisible="resetVisible()" />
    <HostDialog
      :visible="editVisible"
      @resetVisible="resetVisible()"
      :editData="editData"
    />
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
            @click="handleCheck(scope.$index, scope.row)"
            >验证</el-button
          >
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
  name: "host"
};
</script>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElCard,
  ElMessage
} from "element-plus";
import HostDialog from "/@/views/resource/host/hostDialog.vue";
import { delHost, getHosts, verifyHost } from "/@/api/host";
import { Plus } from "@element-plus/icons-vue";
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
  0: "未验证",
  1: "已验证"
};
const tagMap = {
  0: "danger",
  1: "success"
};
const dialogVisible = ref(false);
const editVisible = ref(false);
const tableRef = ref();
const tableDataLabel: Table[] = [
  {
    label: "主机名称",
    prop: "name",
    align: "center"
  },
  {
    label: "IP地址",
    prop: "host_name",
    align: "center"
  },
  {
    label: "描述",
    prop: "desc",
    align: "center"
  },
  {
    label: "配置信息",
    prop: "info",
    align: "center"
  }
];

let editData = ref<Host>({} as Host);

const handleEdit = (index: number, row: Host) => {
  editData.value = row;
  editVisible.value = true;
};
const handleDelete = (index: number, row: Host) => {
  delHost({
    host_id: row.id
  }).then((res: response) => {
    if (res.code === 0) {
      ElMessage.success({
        message: "删除成功",
        type: "success",
        center: true
      });
    } else {
      ElMessage.error({
        message: "删除失败",
        type: "error",
        center: true
      });
    }
  });
};

const handleCheck = (index: number, row: Host) => {
  verifyHost(row).then((res: response) => {
    if (res.code === 0) {
      ElMessage.success({
        message: "验证成功",
        type: "success",
        center: true
      });
    } else {
      ElMessage.error({
        message: "验证失败",
        type: "error",
        center: true
      });
    }
  });
};

let tableData = ref<Host[]>([]);
interface response {
  code: number;
  data: Host[];
  msg: string;
}

onBeforeMount(() => {
  getHosts({
    owner: "doubleguo"
  }).then((res: response) => {
    tableData.value = res.data;
  });
});

const resetVisible = () => {
  dialogVisible.value = false;
  editVisible.value = false;
  editData.value = {} as Host;
  getHosts({
    owner: "doubleguo"
  }).then((res: response) => {
    tableData.value = res.data;
    tableData.value.splice(1, 0);
  });
};
</script>
