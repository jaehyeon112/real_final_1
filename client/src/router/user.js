import main from "@/views/MainHome.vue";
import cartList from "@/views/CartList.vue";
import orderList from "@/views/OrderList.vue";
import orderSuccess from "@/views/OrderSuccess.vue";
import menu from "@/views/MenuPage.vue";
import realmain from "@/views/realMainhome.vue";

export default{
    path: "/",
    name: "main",
    component: main,
    children : [
      {
        path: "cartList",
        name: "cartList",
        component: cartList,
      },
      {
        path: "orderList",
        name: "orderList",
        component: orderList,
      },
      {
        path: "orderSuccess",
        name: "orderSuccess",
        component: orderSuccess,
      },
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
  }
