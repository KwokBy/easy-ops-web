<template>
  <div>
    <CodeEdit height="100px" v-model="editorData" language="yaml"></CodeEdit>
  </div>
</template>

<script lang="ts" setup>
import CodeEdit from "/@/components/CodeEdit/src/CodeEdit.vue";
import { ref } from "vue";
const editorData = ref();
</script>
<script lang="ts">
export default {
  name: "exec"
};
</script>
