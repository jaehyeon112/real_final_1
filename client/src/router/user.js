
import main from "@/views/MainHome.vue";
import menu from "@/views/MenuPage.vue";
import realmain from "@/views/realMainhome.vue";
<<<<<<< HEAD

import join from "../views/Join.vue";
import login from "../views/LoginForm.vue";
import finding from "../views/Finding.vue";
import withdrawal from "../views/Withdrawal.vue";
import emailnum from "../views/PutEmailNum.vue";
import putpass from "../views/PutPassword.vue";
import test from "../views/test.vue";
=======
import myPage from "@/views/MyPage.vue";
import detailPage from "@/views/DetailPage.vue";
import orderList from "@/components/MyPage/orderList.vue";
import detailOrder from "@/components/MyPage/orderDetail.vue";
import like from  "@/components/MyPage/likeBasket.vue";
import delivery from "@/components/MyPage/delivery.vue"
import addDeli from "@/components/MyPage/addDelivery.vue"
import coupon from "@/components/MyPage/couponList.vue"
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e

export default {
  path: "/",
  name: "main",
  component: main,

  children: [
    {
      path: "main",
      name: "realmain",
      component: realmain
    },
    {
<<<<<<< HEAD
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
=======
    path: "menu",
      name: "menu",
      component: menu,
    },
    {
      path:"myPage",
      name:"myPage",
      component:myPage, 
      children:[
        { path:"orderList", //   /myPage/orderList
          name:"orderList",
          component:orderList
        },
        {
          path:"detailOrder",
          name:"detailOrder",
          component:detailOrder
        },
         {path:"like",
          name:"like",
          component:like
        },
        {path:"delivery",
         name:"delivery",
         component:delivery
        }, 
        {path:"addDeli",
         name:"addDeli",
         component:addDeli
        },
        {path:"coupon",
         name:"coupon",
         component:coupon
        },
 
      ]
    },
    {
      path:"detailPage",
      name:"detailPage",
      component:detailPage
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
    }
  ],
};
