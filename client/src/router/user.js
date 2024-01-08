import main from "@/views/MainHome.vue";
import cartList from "@/views/CartList.vue";
import orderForm from "@/views/OrderForm.vue";
import orderSuccess from "@/views/OrderSuccess.vue";
import menu from "@/views/MenuPage.vue";
import realmain from "@/views/realMainhome.vue";
import join from "../views/Join.vue";
import login from "../views/LoginForm.vue";
import finding from "../views/Finding.vue";
import withdrawal from "../views/Withdrawal.vue";

import putpass from "../views/PutPassword.vue";
import message from "../views/Message.vue";
import changePass from "../views/ChangePass.vue"
import test from "../views/test.vue";
import myPage from "@/views/MyPage.vue";
import detailPage from "@/views/detailPage.vue";
import MyorderList from "@/components/MyPage/orderList.vue";
import detailOrder from "@/components/MyPage/orderDetail.vue";
import like from "@/components/MyPage/likeBasket.vue";
import delivery from "@/components/MyPage/delivery.vue";
import addDeli from "@/components/MyPage/addDelivery.vue";
import coupon from "@/components/MyPage/couponList.vue";
import point from "@/components/MyPage/point.vue";
import myReview from "@/components/MyPage/myReview.vue";
import reviewForm from "../views/ReviewForm.vue";
import search from '@/components/menu/search.vue';



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
      path: "menu/search/:word",
      name: "search",
      props: true,
      component: search
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
      path: "orderForm",
      name: "orderForm",
      component: orderForm,
    },
    {
      path: "orderSuccess",
      name: "orderSuccess",
      component: orderSuccess,
    },
    {
      path: "main",
      name: "realmain",
      component: realmain
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
      path: "putpass",
      name: "putpass",
      component: putpass
    },
    {
      path: "message/:message",
      name: "message",
      component: message
    },
    {
      path: "changePass",
      name: "changePass",
      component: changePass
    },
    {
      path: "test",
      name: "test",
      component: test
    },
    {
      path: "myPage",
      name: "myPage",
      component: myPage,
      children: [{
          path: "MyOrderList", //   /myPage/orderList
          name: "MyOrderList",
          component: MyorderList
        },
        {
          path: "detailOrder",
          name: "detailOrder",
          component: detailOrder
        },
        {
          path: "myReview",
          name: "myReview",
          component: myReview
        },
        {
          path: "like",
          name: "like",
          component: like
        },
        {
          path: "delivery",
          name: "delivery",
          component: delivery
        },
        {
          path: "addDeli",
          name: "addDeli",
          component: addDeli
        },
        {
          path: "point",
          name: "point",
          component: point
        },
        {
          path: "coupon",
          name: "coupon",
          component: coupon
        },

      ]
    },
    {
      path: "detailPage",
      name: "detailPage",
      component: detailPage
    },
    {
      path: "reviewForm",
      name: "reviewForm",
      component: reviewForm
    },
  ],
};