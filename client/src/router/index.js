import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
import main from "@/views/MainHome.vue";
import detailPage from "@/views/detailPage.vue";
const routes = [
  {
    path: "/",
    name: "main",
    component: main,
  },
  {
    path:"/detailP",
    name:"detailPage",
    component: detailPage
  },
];
=======
import user from "../router/user.js";
import admin from "../router/admin.js";

const routes = [user, admin];
>>>>>>> develop

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
