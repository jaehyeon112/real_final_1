<template>
    
    <v-container>
    <v-row>
      <v-col cols="8">
        <h1 style="text-align: center;">주문서</h1>
        <v-card>
          <OrderProdInfo
          :cartList="cartList"/>
          <OrderUserInfo/>
          <OrderAddrInfo
          @getAddress="GetAddress"/>
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
          @selectedPayMethod="selectedPayMethod"
          :cartList="cartList"
          :final="final"
          :Order="Order"/>
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
    {{ selectedPayMethod }}
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
      final : 0, // 최종금액 계산
      Number : 0, // 주문번호 생성
      zip : '',
      addr1 : '',
      addr2 : '',
      paymentMethod : ''
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
    },
    addrInfo(){
      this.GetAddress();
    },
  },
  methods: {
    fetchCartList() {
      axios.get(`/api/cartList/${this.$store.state.user.user_id}`, {
      })
      .then(response => {
        this.cartList = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchCouponList() {
      axios.get(`/api/coupon/${this.$store.state.user.user_id}`, {
      })
      .then(response => {
        this.couponList = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchPointList() {
      axios.get(`/api/point/${this.$store.state.user.user_id}`, {
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
    GetAddress(zip,addr1,addr2){
      this.zip = zip
      this.addr1 = addr1
      this.addr2 = addr2

      console.log(this.zip,this.addr1,this.addr2,'주소')
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
    async selectedPayMethod(paymentMethod) {
          this.orderNumber();

          // 상품 정보 설정
          let prodName = '';
          if (this.cartList.length > 0) {
            prodName = this.cartList[0].prod_name + '외' + this.cartList.length + '건';
          } else {
            prodName = this.cartList[0].prod_name;
          }

  // 결제 정보 설정
  let paymentInfo = {
    pg: '',
    pay_method: paymentMethod,
    name: prodName,
    merchant_uid: this.Number,
    amount: this.final,
    buyer_name: this.$store.state.user.user_name,
    buyer_tel: this.$store.state.user.user_tel,
    buyer_email: this.$store.state.user.user_email,
  };

  // 선택한 결제 방법에 따라 결제 정보 설정
  if (paymentMethod === 'kakaopay') {
    this.paymentMethod = 'h1'
    paymentInfo.pg = 'kakaopay';
    paymentInfo.pay_method = '카카오페이';
  } else if (paymentMethod === 'toss') {
    this.paymentMethod = 'h2'
    paymentInfo.pg = 'tosspay';
    paymentInfo.pay_method = '토스';
  } else if (paymentMethod === 'kg') {
    this.paymentMethod = 'h3'
    paymentInfo.pg = 'html5_inicis';
    paymentInfo.pay_method = '신용카드';
  }
  
  let iamport = window.IMP;
  iamport.init('imp61344571'); // 아임포트에서 발급받은 가맹점 식별코드 입력

  iamport.request_pay(paymentInfo, (response) => {
    if (response.success) {
      // 결제 완료 처리
      this.orderInsert()
    } else {
      // 결제 실패 처리
      alert('결제에 실패했습니다.');
    }
  });
},
async orderInsert(){
        this.orderNumber();
            let obj = {
                param : {
                    order_no: this.Number,
              user_id: this.$store.state.user.user_id,
              delivery_charge: this.delivery,
              recipient: this.$store.state.user.user_name,
              recipient_address: this.addr1,
              recipient_detail_address: this.addr2,
              recipient_tel: this.$store.state.user.user_tel,
              recipient_postcode: this.zip,
              total_payment: this.discount,
              coupon_discount_rate: this.couponRate,
              point_use: this.point,
              point_save_rate: 0,
              point_save: 0,
              real_payment: this.final,
              payment_method: this.paymentMethod,
              payment_no: 1,
              order_status: 'c1',
                }
            }
            console.log(this.order_no,'order_no')
            let result = await axios.post("/api/orderInsert", obj)
                               .catch(err => console.log(err));
            
            if(result.data.insertId > 0){
                alert('주문완료');
            }
        },
  }
}
</script>

