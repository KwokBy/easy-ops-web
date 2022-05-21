<template>
  <el-card>
    <el-row :gutter="10" style="margin-bottom: 10px" justify="end">
      <el-col :span="2">
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true"
          >新建
        </el-button>
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
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            size="small"
            type="text"
            @click="setRole(scope.$index, scope.row)"
            >设置权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Drawer
      :visible="roleVisible"
      @resetVisible="resetVisible()"
      :row="treeData"
    ></Drawer>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "role"
};
</script>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { ElButton, ElTable, ElTableColumn, ElCard } from "element-plus";
import Dialog from "/@/views/system/role/dialog.vue";
import { Plus } from "@element-plus/icons-vue";
import { Role } from "./types";
import Drawer from "/@/views/system/role/drawer.vue";
import { getRoles } from "/@/api/role";
interface Table {
  label: string;
  prop: string;
  align: string;
}
const dialogVisible = ref(false);
const editVisible = ref(false);
const roleVisible = ref(false);
const tableRef = ref();
const tableDataLabel: Table[] = [
  {
    label: "角色ID",
    prop: "role_id",
    align: "center"
  },
  {
    label: "角色名称",
    prop: "name_zh",
    align: "center"
  }
];

let editData = ref<Role>({} as Role);
let treeData = ref<Role>({} as Role);

const setRole = (index: number, row: Role) => {
  treeData.value = row;
  roleVisible.value = true;
};
let tableData = ref<Role[]>([]);

onBeforeMount(() => {
  getRoles().then((res: any) => {
    tableData.value = res.data;
  });
});

const resetVisible = () => {
  dialogVisible.value = false;
  editVisible.value = false;
  roleVisible.value = false;
};
</script>
