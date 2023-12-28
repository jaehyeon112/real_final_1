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
          :pointList="pointList"
          :delivery="delivery"
          :coupon="coupon"/>
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
        :point="point"
        :final="final"/>
      </v-col>
    </v-row>
    {{ pointInput }}
    {{ this.couponRate }}
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
      couponRate: 0, // 쿠폰 할인율 계산
      pointInput: 0, // inputValue 계산
      total: 0, // 전체할인금액 계산
      discount: 0, // 상품할인금액 계산
      delivery: 0, // 배송비 계산
      coupon: 0, // 쿠폰할인금액 계산
      point: 0, // 포인트 계산
    };
  },
  created() {
    this.fetchCartList();
    this.fetchCouponList();
    this.fetchPointList();
  },
  watch: {
    cartList: {
      handler() {
        this.totalPrice();
        this.discountPrice();
        this.deliveryPrice();
        this.couponPrice();
        this.pointPrice();
      },
      deep: true,
  },
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
    discountRate(coupon){
      this.couponRate = coupon;
      this.couponPrice();
    },
    inputValue(point){
      this.pointInput = point;
    },
    totalPrice() {
        this.total = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          this.total += (this.cartList[i].price * this.cartList[i].quantity) * this.cartList[i].quantity;
        }
      },
    discountPrice() {
        this.discount = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].discount_price != null) {
            this.discount += (this.cartList[i].discount_price * this.cartList[i].quantity) * this.cartList[i].quantity;
          }
        }
    },
    deliveryPrice() {
      this.delivery = this.discount < 40000 ? 3000 : 0;
    },
    couponPrice(){
      this.coupon = Math.ceil(this.discount * (this.couponRate / 100));
    },
    pointPrice(){
        this.point += this.pointInput;
    },
  },
};
</script>

