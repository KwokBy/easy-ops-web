import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const taskRouter = {
  path: "/task",
  name: "task",
  component: Layout,
  redirect: "/task/schedule",
  meta: {
    icon: "position",
    title: $t("menus.taskPage"),
    i18n: true,
    rank: 10,
    keepAlive: true
  },
  children: [
    {
      path: "/task/schedule",
      name: "schedule",
      component: () => import("/@/views/task/schedule/index.vue"),
      meta: {
        title: $t("menus.taskSchedule"),
        i18n: true
      }
    },
    {
      path: "/task/exec",
      name: "exec",
      component: () => import("/@/views/task/exec/index.vue"),
      meta: {
        title: $t("menus.taskSchedule"),
        i18n: true
      }
    }
  ]
};

export default taskRouter;
