<template>
  <el-input v-model="filterText" placeholder="Filter keyword" />

  <el-tree
    ref="treeRef"
    class="filter-tree"
    :data="data"
    :props="defaultProps"
    default-expand-all
    :default-checked-keys="apiTreeIds"
    show-checkbox
    node-key="name"
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
import { Api, Casbin } from "./types";
import { getApi } from "/@/api/role";

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "desc"
};

watch(filterText, val => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

let data = ref([] as Tree[]);
const apiTreeIds = ref([]);
// const apiTreeData = ref([]);
let apis: Api[] = [
  // {
  //   id: 1,
  //   models_name: "资源管理",
  //   name: "/api/v1/host/get",
  //   method: "POST",
  //   desc: "获取主机列表"
  // },
  // {
  //   id: 2,
  //   models_name: "资源管理",
  //   name: "/api/v1/host/add",
  //   method: "POST",
  //   desc: "添加主机"
  // },
  // {
  //   id: 3,
  //   models_name: "镜像管理",
  //   name: "/api/v1/image/get",
  //   method: "POST",
  //   desc: "获取镜像列表"
  // }
];
const init = async () => {
  const res: any = await getApi();
  apis = res.data;
  buildApiTree(apis);
};

init();
const buildApiTree = (apis: Api[]) => {
  const apiObj = {};
  apis.forEach(api => {
    if (Object.prototype.hasOwnProperty.call(apiObj, api.models_name)) {
      apiObj[api.models_name].push(api);
    } else {
      apiObj[api.models_name] = [api];
    }
  });
  const apiTree = [];
  for (const key in apiObj) {
    if (Object.prototype.hasOwnProperty.call(apiObj, key)) {
      const treeNode = {
        ID: key,
        desc: key,
        children: apiObj[key]
      };
      apiTree.push(treeNode);
    }
  }
  data.value = apiTree;
  apiTreeIds.value = ["/api/v1/host/get", "/api/v1/host/add"];
};

const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedNodes(true));
  const casbin: Casbin = {
    role_id: "888",
    casbin_info: []
  };
  treeRef.value!.getCheckedNodes(true).forEach(node => {
    casbin.casbin_info.push({
      path: node.name,
      method: node.method
    });
  });
  console.log(casbin);
};
</script>
