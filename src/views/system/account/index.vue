<template>
  <el-card>
    <el-row :gutter="10" style="margin-bottom: 10px" justify="end">
      <el-col :span="2">
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true"
          >新建
        </el-button>
      </el-col>
    </el-row>
    <Dialog
      :visible="dialogVisible"
      @resetVisible="resetVisible()"
      :roleList="roles"
    ></Dialog>
    <Dialog
      :visible="editVisible"
      @resetVisible="resetVisible()"
      :editData="editData"
      :roleList="roles"
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
      <el-table-column label="角色" align="center">
        <template #default="scope">
          <el-select
            v-model="scope.row.role_id"
            placeholder="Select"
            style="width: 240px"
            disabled
          >
            <el-option
              v-for="item in roles"
              :key="item.role_id"
              :label="item.name_zh"
              :value="item.role_id"
            />
          </el-select>
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
            @click="handleDelete(scope.$index, scope.row)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "account"
};
</script>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElCard,
  ElSelect,
  ElOption
} from "element-plus";
import Dialog from "/@/views/system/account/dialog.vue";
import { Plus } from "@element-plus/icons-vue";
import { Role, User } from "./types";
interface Table {
  label: string;
  prop: string;
  align: string;
}
const dialogVisible = ref(false);
const editVisible = ref(false);
const tableRef = ref();
const tableDataLabel: Table[] = [
  {
    label: "ID",
    prop: "id",
    align: "center"
  },
  {
    label: "用户名",
    prop: "username",
    align: "center"
  },
  {
    label: "昵称",
    prop: "nickname",
    align: "center"
  },
  {
    label: "角色",
    prop: "role_id",
    align: "center"
  }
];
const roles: Role[] = [
  {
    id: 1,
    role_id: 888,
    name_zh: "管理员"
  },
  {
    id: 2,
    role_id: 777,
    name_zh: "普通用户"
  }
];
let editData = ref<User>({} as User);

const handleEdit = (index: number, row: User) => {
  editData.value = row;
  editVisible.value = true;
};
const handleDelete = (index: number, row: User) => {};
let tableData = ref<User[]>([]);

onBeforeMount(() => {
  tableData.value = [
    {
      id: 1,
      role_id: 888,
      username: "doubleguo",
      nickname: "管理员",
      last_ip: "127.0.0.0"
    },
    {
      id: 2,
      role_id: 777,
      username: "admin",
      nickname: "管理员",
      last_ip: "127.0.0.0"
    }
  ];
});

const resetVisible = () => {
  dialogVisible.value = false;
  editVisible.value = false;
};
</script>
