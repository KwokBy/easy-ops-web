<template>
  <div>
    <el-card>
      <el-col
        :span="8"
        v-for="host in hosts"
        :key="host.id"
        @click="toDetail(host.id, host.name)"
        style="margin: 10px"
      >
        <el-card shadow="always" justify="center">
          <el-row :gutter="10">
            <el-icon :color="colorMap[host.status]" :size="100">
              <Monitor></Monitor
            ></el-icon>
          </el-row>
          <el-row :gutter="10" justify="center">
            {{ host.name }}
          </el-row>
        </el-card>
      </el-col>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import { ElCard, ElCol } from "element-plus";
import { onBeforeMount, ref } from "vue";
import { getHosts } from "/@/api/host";
import { Monitor } from "@element-plus/icons-vue";
const router = useRouter();
const route = useRoute();
function toDetail(index: number, name: string) {
  useMultiTagsStoreHook().handleTags("push", {
    path: `/resource/terminal/detail`,
    parentPath: route.matched[0].path,
    name: "detail",
    query: { id: index },
    meta: {
      title: { zh: name, en: name },
      showLink: false,
      i18n: false,
      dynamicLevel: 3,
      keepAlive: true
    }
  });
  router.push({ name: "detail", query: { id: String(index) } });
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
  status: number;
}
let hosts = ref<Host[]>([]);
const colorMap = {
  0: "#F56C6C",
  1: "#409EFF"
};
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
