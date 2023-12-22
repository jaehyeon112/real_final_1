import { createRouter, createWebHistory } from "vue-router";
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
