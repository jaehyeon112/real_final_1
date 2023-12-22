import { createRouter, createWebHistory } from "vue-router";
import user from "../router/user.js";
import admin from "../router/admin.js";

const routes = [user, admin];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
