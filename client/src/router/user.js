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
import emailnum from "../views/PutEmailNum.vue";
import putpass from "../views/PutPassword.vue";
import message from "../views/Message.vue";
import test from "../views/test.vue";
import myPage from "@/views/MyPage.vue";
import detailPage from "@/views/detailPage.vue";
import MyorderList from "@/components/MyPage/orderList.vue";
import detailOrder from "@/components/MyPage/orderDetail.vue";
import like from "@/components/MyPage/likeBasket.vue";
import delivery from "@/components/MyPage/delivery.vue";
//import addDeli from "@/components/MyPage/addDelivery.vue";
import myInquire from "@/components/ServiceCenter/inquire.vue";
import myInquireInfo from "@/components/ServiceCenter/inquireInfo.vue";
import coupon from "@/components/MyPage/couponList.vue";
import point from "@/components/MyPage/point.vue";
import myReview from "@/components/MyPage/myReview.vue";
import reviewForm from "../views/ReviewForm.vue";
import inquireForm from "../views/inquireForm.vue";
import search from '@/components/menu/search.vue';
import replyList from'@/components/common/replyList.vue'


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
      path: "message",
      name: "message",
      component: message
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
          path: "point",
          name: "point",
          component: point
        },
        {
          path:"myInquire",
          name:"myInquire",
          component:myInquire
         },
         {
          path:"myInquireInfo",
          name:"myInquireInfo",
          component:myInquireInfo
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
    {
      path:"inquireForm",
      name:"inquireForm",
      component:inquireForm
     },
    {
      path:"replyList",
      name:"replyList",
      component:replyList
    },

  ],
};