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
          :discount="discount"
          :coupon="coupon"/>
          <OrderPayment
          :cartList="cartList"
          :final="final"
          :orderInsert="orderInsert"/>
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
      final : 0,
      Number : 0 // 주문번호 생성
    };
  },
  created() {
    this.fetchCartList();
    this.fetchCouponList();
    this.fetchPointList();
    this.orderNumber();
  },
  watch: {
    cartList() {
      this.getBill();
    },
    couponRate() {
        // 1. 포인트 셋팅
        this.pointInput = 0;    
        // 2. 할인되는 금액을 계산
        this.couponPrice();
        // 3. 실제 결제되는 금액을 계산
        this.getBill();
    },
    pointInput(){
      this.pointPrice();
      this.getBill();
    }
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
    },
    inputValue(point){
      this.pointInput = point;
    },
    totalPrice() {
        this.total = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          this.total += (this.cartList[i].price * this.cartList[i].quantity);
        }
      },
    discountPrice() {
        this.discount = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].discount_price != null) {
            this.discount += (this.cartList[i].discount_price * this.cartList[i].quantity);
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
    finalPrice() {
        this.final = this.discount + this.delivery - this.coupon - this.pointInput;
    },
    getBill(){
        this.totalPrice(); // 상품 총 금액
        this.discountPrice(); // 상품 총 금액 중 할인 금액
        this.deliveryPrice(); // 배송비 금액
        this.finalPrice();  // 실제 결제금액
    },
    orderNumber() {
      let date = new Date();
        
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        this.Number = year + month + day + hours + minutes + seconds + parseInt(Math.random() * 100000) + 100000 ;
        //
        console.log(this.Number);
      },
      async orderInsert(){
        this.orderNumber();
            let obj = {
                param : {
                    order_no : this.Number,
                    user_id : this.cartList[0].user_id,
                    delivery_charge : this.delivery ,
                    recipient: this.cartList[0].user_name,
                    recipient_address : 'this.addr1',
                    recipient_detail_address : 'this.addr2',
                    recipient_tel : 'hh',
                    recipient_postcode : 'this.zip',
                    total_payment : this.discount,
                    coupon_discount_rate : this.couponRate,
                    point_use : this.point,
                    point_save_rate : 0,
                    point_save: 0,
                    real_payment: this.final,
                    payment_method : this.payment_method,
                    payment_no : 1,
                    order_status : '주문완료'
                }
            }
            console.log(this.order_no,'order_no')
            let result = await axios.post("/api/orderInsert", obj)
                               .catch(err => console.log(err));
            
            if(result.data.insertId > 0){
                alert('주문완료');
            }
        },
    
  },
};
</script>

