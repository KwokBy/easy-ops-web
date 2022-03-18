<template>
  <el-card>
    <el-col
      :span="8"
      v-for="host in hosts"
      :key="host.id"
      @click="toDetail(host.id)"
      style="margin: 10px"
    >
      <el-card shadow="always"> {{ host.name }} </el-card>
    </el-col>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import { ElCard, ElCol } from "element-plus";
import { onBeforeMount, ref } from "vue";
import { getHosts } from "/@/api/host";
const router = useRouter();
const route = useRoute();

function toDetail(index: number) {
  useMultiTagsStoreHook().handleTags("push", {
    path: `/tabs/detail`,
    parentPath: route.matched[0].path,
    name: "tabDetail",
    query: { id: String(index) },
    meta: {
      title: { zh: `No.${index} - 详情信息`, en: `No.${index} - DetailInfo` },
      showLink: false,
      i18n: false,
      dynamicLevel: 3
    }
  });
  router.push({ name: "tabDetail", query: { id: String(index) } });
}
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
let hosts = ref<Host[]>([]);
interface response {
  code: number;
  data: Host[];
  msg: string;
}
onBeforeMount(() => {
  getHosts({
    owner: "doubleguo"
  }).then((res: response) => {
    hosts.value = res.data;
  });
});
</script>

<style>
.infinite-list {
  height: 500px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
