<template>
  <div>
    <el-row :gutter="20" justify="center" class="padding">
      <el-col :span="6">
        <el-card shadow="hover">
          <el-row :gutter="10" justify="start">
            <p>主机</p>
          </el-row>
          <el-row :gutter="10" justify="start">
            <p>3</p>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-row :gutter="10" justify="start">
            <p>任务</p>
          </el-row>
          <el-row :gutter="10" justify="start">
            <p>3</p>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-row :gutter="10" justify="start">
            <p>镜像</p>
          </el-row>
          <el-row :gutter="10" justify="start">
            <p>3</p>
          </el-row></el-card
        >
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-row :gutter="10" justify="start">
            <p>用户</p>
          </el-row>
          <el-row :gutter="10" justify="start">
            <p>3</p>
          </el-row></el-card
        >
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"></el-col>
    </el-row>
    <el-card class="padding">
      <template #header>
        <div class="card-header">
          <span>快捷入口</span>
        </div>
      </template>
      <el-row :gutter="20" justify="center">
        <el-col
          :span="4"
          v-for="(card, key) in toolCards"
          :key="key"
          :xs="8"
          :offset="1"
        >
          <el-card
            @click="toTarget(card.name)"
            :style="{ backgroundColor: card.bg }"
            shadow="hover"
          >
            <el-row :gutter="10" justify="center">
              <el-icon :size="80">
                <component :is="card.icon" :style="{ color: card.color }" />
              </el-icon>
            </el-row>
            <el-row :gutter="10" justify="center">
              <p>{{ card.label }}</p>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="15" class="padding" style="padding_top: 10px">
      <el-col :span="12">
        <el-card class="card_item">
          <template #header>
            <div>Runtime</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">os:</el-col>
              <el-col :span="12" v-text="state.os.goos" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">cpu nums:</el-col>
              <el-col :span="12" v-text="state.os.numCpu" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">compiler:</el-col>
              <el-col :span="12" v-text="state.os.compiler" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">go version:</el-col>
              <el-col :span="12" v-text="state.os.goVersion" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">goroutine nums:</el-col>
              <el-col :span="12" v-text="state.os.numGoroutine" />
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.disk" class="card_item">
          <template #header>
            <div>Disk</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">total (MB)</el-col>
                  <el-col :span="12" v-text="state.disk.total_mb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">used (MB)</el-col>
                  <el-col :span="12" v-text="state.disk.used_mb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">total (GB)</el-col>
                  <el-col :span="12" v-text="state.disk.total_gb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">used (GB)</el-col>
                  <el-col :span="12" v-text="state.disk.used_gb" />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="state.disk.used_percent"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="padding">
      <el-col :span="12">
        <el-card v-if="state.cpu" class="card_item">
          <template #header>
            <div>CPU</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">physical number of cores:</el-col>
              <el-col :span="12" v-text="state.cpu.cores" />
            </el-row>
            <el-row
              v-for="(item, index) in state.cpu.cpus"
              :key="index"
              :gutter="10"
            >
              <el-col :span="12">core {{ index }}:</el-col>
              <el-col :span="12"
                ><el-progress
                  type="line"
                  :percentage="+item.percentage.toFixed(0)"
                  :color="colors"
              /></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.ram" class="card_item">
          <template #header>
            <div>Ram</div>
          </template>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">total (MB)</el-col>
                  <el-col :span="12" v-text="state.ram.total_mb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">used (MB)</el-col>
                  <el-col :span="12" v-text="state.ram.used_mb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">total (GB)</el-col>
                  <el-col :span="12" v-text="state.ram.total_gb / 1024" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">used (GB)</el-col>
                  <el-col
                    :span="12"
                    v-text="(state.ram.used_gb / 1024).toFixed(2)"
                  />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="state.ram.used_percent"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ElCard, ElIcon, ElRow, ElCol, ElProgress } from "element-plus";
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { State } from "./type";

const toolCards = ref([
  {
    label: "主机管理",
    icon: "monitor",
    name: "host",
    color: "#ff9c6e",
    bg: "rgba(255, 156, 110,.3)"
  },
  {
    label: "角色管理",
    icon: "setting",
    name: "role",
    color: "#69c0ff",
    bg: "rgba(105, 192, 255,.3)"
  },
  {
    label: "用户管理",
    icon: "user",
    name: "account",
    color: "#b37feb",
    bg: "rgba(179, 127, 235,.3)"
  },
  {
    label: "镜像管理",
    icon: "MostlyCloudy",
    name: "imageIndex",
    color: "#ffd666",
    bg: "rgba(255, 214, 102,.3)"
  }
]);
const router = useRouter();
const toTarget = name => {
  router.push({ name });
};
const timer = ref(null);
const state = ref<State>();
const colors = ref([
  { color: "#5cb87a", percentage: 20 },
  { color: "#e6a23c", percentage: 40 },
  { color: "#f56c6c", percentage: 80 }
]);

const reload = async () => {
  state.value = {
    os: {
      goos: "Linux",
      numCpu: 4,
      goVersion: "go1.14.2",
      compiler: "gc",
      numGoroutine: 13
    },
    disk: {
      total_mb: 2048,
      used_mb: 1024,
      total_gb: 2,
      used_gb: 1,
      used_percent: 20
    },
    cpu: {
      cores: 4,
      cpus: [
        {
          percentage: 20
        },
        {
          percentage: 40
        },
        {
          percentage: 60
        },
        {
          percentage: 70
        }
      ]
    },
    ram: {
      total_mb: 2048,
      used_mb: 1024,
      total_gb: 2,
      used_gb: 1,
      used_percent: 20
    }
  };
};

reload();
timer.value = setInterval(() => {
  reload();
}, 1000 * 10);

onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = null;
});
</script>
<style>
.padding {
  padding-bottom: 10px;
}

.card_item {
  height: 280px;
}
</style>
