import admin from '@/views/AdminHome.vue';
import adminMain from "@/views/AdminMain.vue";
import userList from "@/views/UserList.vue";
import prodList from "@/views/ProductList.vue";
import product from '@/components/admin/Product.vue';
import chart from '@/components/admin/chart.vue';
<<<<<<< HEAD
import dd from '@/views/dddd.vue';
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e


export default{
    path : "/admin",
    name : "admin",
    component : admin,
      children : [
        {
          path : "Main",
          name : "Main",
          component : adminMain
        },
        {
          path : "userList",
          name : "userList",
          component : userList
        },
        {
          path : "prodList",
          name : "prodList",
          component : prodList
        },
        {
          path : "product",
          name : "product",
          component : product
        },
        {
          path : "chart",
          name : "chart",
          component : chart
        },
<<<<<<< HEAD
        {
          path : "dd",
          name : "dd",
          component : dd
        },
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
      ]
  }