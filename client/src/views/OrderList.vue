<template>
    
    <v-container>
    <v-row>
      <v-col cols="8">
        <h1 style="text-align: center;">주문서</h1>
        <v-card>
          <OrderProdInfo
          :cartList="cartList"/>
          <OrderUserInfo
          :cartList="cartList"/>
          <OrderAddrInfo
          :cartList="cartList"/>
          <OrderPointInfo
          :cartList="cartList"
          :couponList="couponList"
          @discountRate="discountRate"
          @inputValue="inputValue"
          :pointList="pointList"/>
          <OrderPayment
          :cartList="cartList"/>
        </v-card>
      </v-col>
      <v-col>
        <OrderPrice
        :cartList="cartList"
        :pointInput="pointInput"
        :couponRate="couponRate"
        :coupon="coupon"
        :total="total"
        :discount="discount"
        :delivery="delivery"
        :point="point"/>
      </v-col>
    </v-row>
    {{ pointInput }}
    {{ couponRate }}
    </v-container>
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
    OrderProdInfo,
    OrderUserInfo, 
    OrderAddrInfo, 
    OrderPointInfo, 
    OrderPayment, 
    OrderPrice
  },
  data() {
    return {
      cartList: [],
      couponList: [],
      pointList: [],
      couponRate: 0,
      pointInput: 0,
      total: 0, // 전체할인금액 계산
      discount: 0, // 상품할인금액 계산
      delivery: 0, // 배송비 계산
      coupon: 0, // 쿠폰할인금액 계산
      point: 0, // 포인트 계산
      realpay: 0, // 최종 결제금액계산
    };
  },
  created() {
    this.fetchCartList();
    this.fetchCouponList();
    this.fetchPointList();
  },
  computed(){
    this.inputValue();
    this.discountRate();
    this.totalPrice();
    this.discountPrice();
    this.pointPrice();
    this.deliveryPrice();
    this.couponPrice();
  },
  methods: {
    fetchCartList() {
      axios.get('/api/cartList/test', {
      })
      .then(response => {
        this.cartList = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchCouponList() {
      axios.get('/api/coupon/test', {
      })
      .then(response => {
        this.couponList = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchPointList() {
      axios.get('/api/point/test', {
      })
      .then(response => {
        this.pointList = response.data; 
      })
      .catch(error => {
        console.error(error);
      });
    },
    discountRate(coupona){
      this.couponRate = coupona;
    },
    inputValue(point){
      this.pointInput = point;
    },
    totalPrice() {
        for (let i = 0; i < this.cartList.length; i++) {
          this.total += (this.cartList[i].price * this.cartList[i].quantity) * this.cartList[i].quantity;
        }
      },
    discountPrice() {
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].discount_price != null) {
            this.discount += (this.cartList[i].discount_price * this.cartList[i].quantity) * this.cartList[i].quantity;
          }
        }
    },
    deliveryPrice() {
        this.total < 40000 ? 3000 : 0;
    },
    couponPrice(){
      
    },
    pointPrice(){
        this.point += this.pointInput;
    },
    realPrice(){
        this.realpay = this.discount - this.delivery - this.coupon - this.point
        this.realpay += Math.ceil(this.realpay);
    }
  },
};
</script>

