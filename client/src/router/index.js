
import { createRouter, createWebHistory } from "vue-router";
import main from "@/views/MainHome.vue";


import join from "../views/Join.vue";
import login from "../views/LoginForm.vue";
import finding from "../views/Finding.vue";
import withdrawal from "../views/Withdrawal.vue";
import emailnum from "../views/PutEmailNum.vue";
import putpass from "../views/PutPassword.vue";
import test from "../views/test.vue";

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
  },

  {
    path: "/withdrawal",
    name: "withdrawal",
    component: withdrawal
  },

  {
    path: "/emailnum",
    name: "emailnum",
    component: emailnum
  },

  {
    path: "/putpass",
    name: "putpass",
    component: putpass
  },

  {
    path: "/test",
    name: "test",
    component: test
  }


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
