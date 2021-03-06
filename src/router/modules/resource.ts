import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const resourceRouter = {
  path: "/resource",
  name: "resource",
  component: Layout,
  redirect: "/resource/host",
  meta: {
    icon: "position",
    title: $t("menus.resourcePage"),
    i18n: true,
    rank: 9
  },
  children: [
    {
      path: "/resource/host",
      name: "host",
      component: () => import("/@/views/resource/host/index.vue"),
      meta: {
        title: $t("menus.resourceHost"),
        i18n: true
      }
    },
    {
      path: "/resource/terminal",
      name: "terminal",
      component: () => import("/@/views/resource/terminal/index.vue"),
      meta: {
        title: $t("menus.resourceTerminal"),
        i18n: true
      }
    },
    {
      path: "/resource/terminal/detail",
      name: "detail",
      component: () => import("/@/views/resource/terminal/terminal.vue"),
      meta: {
        title: "",
        showLink: false,
        i18n: false,
        dynamicLevel: 3,
        refreshRedirect: "/resource/terminal",
        keepAlive: true
      }
    }
  ]
};

export default resourceRouter;
