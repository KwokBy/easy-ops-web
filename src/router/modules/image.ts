import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const imageRouter = {
  path: "/image",
  name: "image",
  component: Layout,
  redirect: "/image",
  meta: {
    icon: "position",
    title: $t("menus.imagePage"),
    i18n: true,
    rank: 11
  },
  children: [
    {
      path: "/image/index",
      name: "imageIndex",
      component: () => import("/@/views/image/index.vue"),
      meta: {
        title: $t("menus.imagePage"),
        i18n: true
      }
    },
    {
      path: "/image/index/terminal",
      name: "imageTerminal",
      component: () => import("/@/views/image/terminal.vue"),
      meta: {
        title: "",
        showLink: false,
        i18n: false,
        dynamicLevel: 3,
        refreshRedirect: "/image/index",
        keepAlive: true
      }
    }
  ]
};

export default imageRouter;
