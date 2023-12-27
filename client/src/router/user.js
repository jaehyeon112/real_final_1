//import VueRouter from 'vue-router'
import main from "@/views/MainHome.vue";
import realmain from "@/views/realMainhome.vue";
import myPage from "@/views/MyPage.vue";
import detailPage from "@/views/DetailPage.vue";
import orderList from "@/components/MyPage/orderList.vue"
import detailOrder from "@/components/MyPage/orderDetail.vue"
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
        }

      ]
    },
    {
      path:"detailPage",
      name:"detailPage",
      component:detailPage
    }
  ],
};
