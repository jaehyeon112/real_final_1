
import main from "@/views/MainHome.vue";
import menu from "@/views/MenuPage.vue";
import realmain from "@/views/realMainhome.vue";
import myPage from "@/views/MyPage.vue";
import detailPage from "@/views/DetailPage.vue";
import orderList from "@/components/MyPage/orderList.vue";
import detailOrder from "@/components/MyPage/orderDetail.vue";
import like from  "@/components/MyPage/likeBasket.vue";
import delivery from "@/components/MyPage/delivery.vue"
import addDeli from "@/components/MyPage/addDelivery.vue"
import coupon from "@/components/MyPage/couponList.vue"

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
    }
  ],
};
