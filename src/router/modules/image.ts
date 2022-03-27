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
    rank: 10,
    keepAlive: true
  },
  children: [
    {
      path: "/image",
      name: "image",
      component: () => import("/@/views/image/index.vue"),
      meta: {
        title: $t("menus.imagePage"),
        i18n: true
      }
    }
  ]
};

export default imageRouter;
