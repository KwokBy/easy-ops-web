import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const systemRouter = {
  path: "/system",
  name: "system",
  component: Layout,
  redirect: "/system/account",
  meta: {
    icon: "position",
    title: $t("menus.systemPage"),
    i18n: true,
    rank: 10,
    keepAlive: true
  },
  children: [
    {
      path: "/system/account",
      name: "account",
      component: () => import("/@/views/system/account/index.vue"),
      meta: {
        title: $t("menus.systemAccount"),
        i18n: true
      }
    },
    {
      path: "/system/role",
      name: "role",
      component: () => import("/@/views/system/role/index.vue"),
      meta: {
        title: $t("menus.systemRole"),
        i18n: true
      }
    }
  ]
};

export default systemRouter;
