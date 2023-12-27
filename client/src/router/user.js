import main from "@/views/MainHome.vue";
import realmain from "@/views/realMainhome.vue";
import myPage from "@/views/MyPage.vue";
import detailPage from "@/views/DetailPage.vue";
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
        { path:"orderList",
          name:"orderList",
          component:orderList
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
