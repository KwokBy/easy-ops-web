<template>
  <div ref="terminal" id="terminal"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { ElMessage } from "element-plus";
import { Base64 } from "js-base64";

export default defineComponent({
  name: "Xterm",
  setup() {
    //实例化路由
    const shellWs = ref(null);
    const rows = ref(null);
    const cols = ref(null);

    const term = new Terminal({
      rendererType: "canvas",
      cursorBlink: true,
      convertEol: true,
      scrollback: 800,
      // row: 70,
      theme: {
        foreground: "white",
        background: "#181E29"
      }
    });
    const fitAddon = new FitAddon();
    // canvas背景全屏
    term.loadAddon(fitAddon);
    fitAddon.fit();
    const ws = new WebSocket("ws://localhost:8080/api/v1/ws/ssh");
    onMounted(() => {
      term.open(document.getElementById("terminal")); //绑定dom节点
      term.focus(); // 取得输入焦点
      term.writeln("Connecting..."); // 写一行测试
      ws.onclose = function () {
        ElMessage.warning({
          message: "链接已关闭",
          type: "warning",
          center: true
        });
      };
      ws.onmessage = function (e) {
        // 服务端ssh输出, 写到web shell展示
        term.write(e.data);
      };
      ws.onerror = function () {
        ElMessage.error({
          message: "请更换，shell环境再试一下",
          type: "error",
          center: true
        });
      };
      // 当浏览器窗口变化时, 重新适配终端
      window.addEventListener("resize", function () {
        fitAddon.fit();
        // 把web终端的尺寸term.rows和term.cols发给服务端, 通知sshd调整输出宽度
        var msg = { type: 2, rows: term.rows, cols: term.cols };
        ws.send(JSON.stringify(msg));
      });
      // ws.send(
      //   JSON.stringify({
      //     type: 2,
      //     cmd: "ls"
      //   })
      // );
      // 当向web终端敲入字符时候的回调
      term.onKey(e => {
        //给后端发送数据
        // 写给服务端, 由服务端发给container
        console.log(e.key);
        var msg = { type: 1, cmd: Base64.encode(e.key) };
        ws.send(JSON.stringify(msg));
      });
      // 支持输入与粘贴方法
      term.onData(function (input) {
        // 写给服务端, 由服务端发给container
        var msg = { type: 1, cmd: input };
        ws.send(JSON.stringify(msg));
      });
    });
    onUnmounted(() => {
      ws.close();
    });
    return {
      shellWs,
      term,
      rows,
      cols
    };
  }
});
</script>

<style></style>
