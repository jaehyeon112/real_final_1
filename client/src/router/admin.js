import admin from '@/views/AdminHome.vue';
import Adminlogin from '../components/admin/AdminLoginForm.vue';
import adminMain from "@/views/AdminMain.vue";
import userList from "@/views/UserList.vue";
import prodList from "@/views/ProductList.vue";
import product from '@/components/admin/Product.vue';

import orderList from '@/views/AdminOrderList.vue';
import reviewList from '../views/reviewList.vue';
import reviewReport from '../views/ReviewReportList.vue';
import refundList from '../views/AdminRefundList.vue';
import deliveryList from '../views/AdminDeliveryList.vue';
import inquireList from '../views/AdminInquireList.vue';
import noticeList from '../views/AdminNoticeList.vue';
import fna from '../views/FNA.vue';
import out from '../views/AdminOutList.vue'
import insertNotice from '../views/insertNotice.vue'
import reply from '../components/admin/reply.vue'

import Barchart from '../views/Barchart.vue';
import Linechart from '../views/LineChart.vue';
import sumChart from '../views/sumChart.vue';
import Doughnutchart from '../views/Doughnutchart.vue';

export default {
  path : "/admin",
  name : "admin",
  component : admin,
  children : [
      {
        path : "Adminlogin",
        name : "Adminlogin",
        component : Adminlogin
      },
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
        path : "orderList",
        name : "orderList",
        component : orderList
      },
      {
        path : "reviewList",
        name : "reviewList",
        component : reviewList
      },
      {
        path : "reviewReport",
        name : "reviewReport",
        component : reviewReport
      },
      {
        path : "refundList",
        name : "refundList",
        component : refundList
      },
      {
        path : "deliveryList",
        name : "deliveryList",
        component : deliveryList
      },
      {
        path : "inquireList",
        name : "inquireList",
        component : inquireList
      },
      {
        path : "noticeList",
        name : "noticeList",
        component : noticeList
      },
      {
        path : "fna",
        name : "fna",
        component : fna
      },
      {
        path : "out",
        name : "out",
        component : out
      },
      {
        path : "reply",
        name : "reply",
        component : reply
      },
      {
        path : "insertNotice",
        name : "insertNotice",
        component : insertNotice
      },
      {
        path : "Barchart",
        name : "Barchart",
        component : Barchart
      },
      {
        path : "Linechart",
        name : "Linechart",
        component : Linechart
      },
      {
        path : "sumChart",
        name : "sumChart",
        component : sumChart
      },
      {
        path : "Doughnutchart",
        name : "Doughnutchart",
        component : Doughnutchart
      },
  ]

}
  