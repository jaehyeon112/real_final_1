import main from "@/views/MainHome.vue";
import menu from "@/views/MenuPage.vue";
import realmain from "@/views/realMainhome.vue";
export default {
  path: "/",
  name: "main",
  component: main,
  children: [
    {
      path: "main",
      name: "realmain",
      component: realmain,
    },
    {
      path: "menu",
      name: "menu",
      component: menu,
    },
  ],
};
