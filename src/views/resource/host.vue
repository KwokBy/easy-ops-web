<template>
  <el-card>
    <HostDialog />
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
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
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
import { ElButton, ElTable, ElTableColumn, ElCard } from "element-plus";
import HostDialog from "/@/views/resource/dialog/hostDialog.vue";
import { getHosts } from "/@/api/host";
interface Host {
  id: number;
  host: string;
  host_name: string;
  username: string;
  name: string;
}
interface Table {
  label: string;
  prop: string;
  align: string;
}
const tableRef = ref();
const tableDataLabel: Table[] = [
  {
    label: "主机名称",
    prop: "name",
    align: "center"
  },
  {
    label: "IP地址",
    prop: "host",
    align: "center"
  },
  {
    label: "配置信息",
    prop: "info",
    align: "center"
  },
  {
    label: "状态",
    prop: "status",
    align: "center"
  }
];
// const search = ref("");
// const filterTableData = computed(() =>
//   tableData.filter(
//     data =>
//       !search.value ||
//       data.name.toLowerCase().includes(search.value.toLowerCase())
//   )
// );
const handleEdit = (index: number, row: Host) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Host) => {
  console.log(index, row);
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
    console.log(tableData);
  });
});
</script>
