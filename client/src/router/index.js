import { createRouter, createWebHistory } from "vue-router";
import main from "@/views/MainHome.vue";
import admin from "@/views/AdminHome.vue";
const routes = [
  {
    path: "/",
    name: "main",
    component: main,
    children : [

    ]
  },
  {
    path : "/admin",
    name : "admin",
    component : admin,
      children : [

      ]
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
