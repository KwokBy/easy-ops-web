import { App } from "vue";
import codeEdit from "./src/CodeEdit.vue";

export const CodeEdit = Object.assign(codeEdit, {
  install(app: App) {
    app.component(codeEdit.name, codeEdit);
  }
});

export default {
  CodeEdit
};
