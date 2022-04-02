<template>
  <el-input v-model="filterText" placeholder="Filter keyword" />

  <el-tree
    ref="treeRef"
    class="filter-tree"
    :data="data"
    :props="defaultProps"
    default-expand-all
    show-checkbox
    node-key="id"
    :filter-node-method="filterNode"
  />
  <el-row justify="end" style="margin-top: 10px">
    <el-button type="primary" @click="getCheckedKeys">确定</el-button>
  </el-row>
</template>

<script lang="ts">
export default {
  name: "RoleTree"
};
</script>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElTree, ElInput } from "element-plus";

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "label"
};

watch(filterText, val => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

const data: Tree[] = [
  {
    id: 1,
    label: "资源管理",
    children: [
      {
        id: 1,
        label: "获取主机列表"
      },
      {
        id: 2,
        label: "获取主机列表"
      }
    ]
  },
  {
    id: 2,
    label: "任务调度",
    children: [
      {
        id: 5,
        label: "Level two 2-1"
      },
      {
        id: 6,
        label: "Level two 2-2"
      }
    ]
  },
  {
    id: 3,
    label: "镜像管理",
    children: [
      {
        id: 7,
        label: "Level two 3-1"
      },
      {
        id: 8,
        label: "Level two 3-2"
      }
    ]
  }
];
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(false));
};
</script>
