import main from "@/views/MainHome.vue";
import cartList from "@/views/CartList.vue";
import orderList from "@/views/OrderList.vue";
import orderSuccess from "@/views/OrderSuccess.vue";
import menu from "@/views/MenuPage.vue";
import realmain from "@/views/realMainhome.vue";
import join from "../views/Join.vue";
import login from "../views/LoginForm.vue";
import finding from "../views/Finding.vue";
import withdrawal from "../views/Withdrawal.vue";
import emailnum from "../views/PutEmailNum.vue";
import putpass from "../views/PutPassword.vue";
import test from "../views/test.vue";

export default {
  path: "/",
  name: "main",
  component: main,

  children: [{
      path: "main",
      name: "realmain",
      component: realmain,
      bread: '홈'
    },
    {
      path: "menu/:category",
      name: "menuCategory",
      props: true,
      component: menu,
    },
    {
      path: "menu/:category/:type",
      name: "menuCategory2",
      props: true,
      component: menu,
    },
    {
      path: "menu",
      name: "menu",
      component: menu,
    },
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
    //h
    {
      path: "login",
      name: "login",
      component: login,
    },

    {
      path: "join",
      name: "join",
      component: join
    },

    {
      path: "finding",
      name: "finding",
      component: finding
    },

    {
      path: "withdrawal",
      name: "withdrawal",
      component: withdrawal
    },

    {
      path: "emailnum",
      name: "emailnum",
      component: emailnum
    },

    {
      path: "putpass",
      name: "putpass",
      component: putpass
    },

    {
      path: "test",
      name: "test",
      component: test
    }
  ],
}