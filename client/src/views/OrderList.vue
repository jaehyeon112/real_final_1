<template>
    <div class="container">
      <h1 style="text-align: center;">주문서</h1>
        <OrderProdInfo
        :cartList="cartList"/>
        <OrderUserInfo
        :cartList="cartList"/>
        <OrderAddrInfo
        :cartList="cartList"/>
        <OrderPointInfo
        :couponList="couponList"
        :pointList="pointList"/>
        <OrderPayment
        :cartList="cartList"/>
        <OrderPrice
        :cartList="cartList"/>
    </div>
</template>
<script>
import axios from 'axios';

import OrderProdInfo from '../components/OrderProdInfo.vue';
import OrderUserInfo from '../components/OrderUserInfo.vue';
import OrderAddrInfo from '../components/OrderAddrInfo.vue';
import OrderPointInfo from '../components/OrderPointInfo.vue';
import OrderPayment from '../components/OrderPayment.vue';
import OrderPrice from '../components/OrderPrice.vue';


export default {
  name: 'OrderList',
  components: {
    OrderProdInfo, // 상품정보
    OrderUserInfo, // 주문자정보
    OrderAddrInfo, // 배송지정보
    OrderPointInfo, // 쿠폰/포인트 정보
    OrderPayment, // 결제수단
    OrderPrice // 결제금액
  },
  data() {
    return {
      cartList: [], // 주문 목록을 저장할 배열
      couponList: [],
      pointList: []
    };
  },
  mounted() {
    this.fetchCartList(); // 컴포넌트가 마운트되면 주문 목록을 가져옴
    this.fetchCouponList();
    this.fetchPointList();
  },
  methods: {
    fetchCartList() {
      // axios를 사용하여 주문 목록 데이터를 서버로부터 가져옴
      axios.get('/api/cartList/test', {
      })
      .then(response => {
        this.cartList = response.data; // 가져온 주문 목록 데이터를 컴포넌트의 orderList에 저장
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchCouponList() {
      // axios를 사용하여 주문 목록 데이터를 서버로부터 가져옴
      axios.get('/api/coupon/test', {
      })
      .then(response => {
        this.couponList = response.data; // 가져온 주문 목록 데이터를 컴포넌트의 orderList에 저장
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchPointList() {
      // axios를 사용하여 주문 목록 데이터를 서버로부터 가져옴
      axios.get('/api/point/test', {
      })
      .then(response => {
        this.pointList = response.data; // 가져온 주문 목록 데이터를 컴포넌트의 orderList에 저장
      })
      .catch(error => {
        console.error(error);
      });
    },
  }
};
</script>

