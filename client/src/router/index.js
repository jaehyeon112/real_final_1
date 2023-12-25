
import { createRouter, createWebHistory } from "vue-router";
import main from "@/views/MainHome.vue";


import join from "../views/Join.vue";
import login from "../views/LoginForm.vue";
import finding from "../views/Finding.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: main,
  },

  {
    path: "/login",
    name: "login",
    component: login,
  },

  {
    path: "/join",
    name: "join",
    component: join
  },

  {
    path: "/finding",
    name: "finding",
    component: finding
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
