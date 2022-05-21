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
  <!-- <el-row justify="end" style="margin-top: 10px">
    <el-button type="primary" @click="getCheckedKeys">确定</el-button>
  </el-row> -->
</template>

<script lang="ts">
export default {
  name: "RoleTree"
};
</script>

<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import { ElTree, ElInput } from "element-plus";
import { Api } from "./types";
import { getApi, getPermission } from "/@/api/role";
// import { Role } from "../account/types";
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
const props = defineProps({
  roleID: {
    type: Number,
    default: 888
  }
});
let data = ref([] as Tree[]);
let apiTreeIds = ref([]);
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
  const permission: any = await getPermission({
    role_id: props.roleID
  });
  apiTreeIds.value = [];
  console.log(permission);
  console.log(apiTreeIds.value);
  for (const item of permission.data.apis) {
    apiTreeIds.value.push(item.v1);
  }
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
  // apiTreeIds.value = ["/api/v1/host/get", "/api/v1/host/add"];
};

// const getCheckedKeys = () => {
//   console.log(treeRef.value!.getCheckedNodes(true));
//   const casbin: Casbin = {
//     role_id: "888",
//     casbin_info: []
//   };
//   treeRef.value!.getCheckedNodes(true).forEach(node => {
//     casbin.casbin_info.push({
//       path: node.name,
//       method: node.method
//     });
//   });
//   console.log(casbin);
// };
watchEffect(async () => {
  console.log(props.roleID);
  init();
});
</script>
