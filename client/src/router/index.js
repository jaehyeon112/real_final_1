import {
  createRouter,
  createWebHistory
} from "vue-router";
import user from "../router/user.js";
import admin from "../router/admin.js";


const routes = [user, admin];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 맨 위로 스크롤
    return {
      top: 0
    }
  },
});


export default router;