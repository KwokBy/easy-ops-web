<template>
  <div>
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
            @click="handleDebug(scope.$index, scope.row)"
            >调试</el-button
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
  </div>
</template>

<script lang="ts">
export default {
  name: "imageIndex"
};
</script>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { Table } from "/@/views/type";
import { Image } from "./types";
import { deleteImage, getImages } from "/@/api/image";
import { ElTable, ElTableColumn, ElButton, ElTag } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import Dialog from "/@/views/image/dialog.vue";
import { useRouter, useRoute } from "vue-router";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
const statusMap = {
  0: "未发布",
  1: "已发布"
};
const tagMap = {
  0: "info",
  1: "success"
};
const tableRef = ref();
const tableDataLabel: Table[] = [
  {
    label: "镜像名",
    prop: "name",
    align: "center"
  },
  {
    label: "版本",
    prop: "version",
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
let tableData = ref<Image[]>([]);
let editData = ref<Image>();
const handleEdit = (index: number, row: Image) => {
  editData.value = row;
  editVisible.value = true;
};
const handleDelete = (index: number, row: Image) => {
  deleteImage({
    name: row.name,
    version: row.version
  });
};
const dialogVisible = ref(false);
const editVisible = ref(false);
const terminalVisible = ref(false);
onBeforeMount(() => {
  getImages({
    owner: "doubleguo"
  }).then((res: any) => {
    if (res.code === 0) {
      tableData.value = res.data;
    }
  });
});
const resetVisible = () => {
  dialogVisible.value = false;
  editVisible.value = false;
  terminalVisible.value = false;
};

const router = useRouter();
const route = useRoute();
function handleDebug(index: number, image: Image) {
  useMultiTagsStoreHook().handleTags("push", {
    path: `/image/index/terminal`,
    parentPath: route.matched[0].path,
    name: "imageTerminal",
    query: { id: image.id },
    meta: {
      title: { zh: image.name, en: image.name },
      showLink: false,
      i18n: false,
      dynamicLevel: 3,
      keepAlive: true
    }
  });
  router.push({ name: "imageTerminal", query: { id: image.id } });
}
</script>
