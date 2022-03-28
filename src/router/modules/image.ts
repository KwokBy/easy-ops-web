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
    }
  ]
};

export default imageRouter;
