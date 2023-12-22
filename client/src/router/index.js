import { createRouter, createWebHistory } from "vue-router";
import main from "@/views/MainHome.vue";
const routes = [
  {
    path: "/",
    name: "main",
    component: main,
    children: [{}],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
