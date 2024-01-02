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
          :final="final"/>
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
    {{ savePointprice }}
    <v-btn @click="cancelPay">환불하기</v-btn>
    </v-container>
</template>
<script>
import axios from 'axios';

import OrderProdInfo from '../components/order/OrderProdInfo.vue';
import OrderUserInfo from '../components/order/OrderUserInfo.vue';
import OrderAddrInfo from '../components/order/OrderAddrInfo.vue';
import OrderPointInfo from '../components/order/OrderPointInfo.vue';
import OrderPayment from '../components/order/OrderPayment.vue';
import OrderPrice from '../components/order/OrderPrice.vue';


export default {
  name: 'OrderForm',
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
      savePointrate : 0, // 포인트적립율 계산
      savePointprice: 0, // 포인트적립액 계산
      final : 0, // 최종금액 계산
      Number : 0, // 주문번호 생성
      prodName : '',
      zip : '',
      addr1 : '',
      addr2 : '',
      paymentMethod : '',
    };
  },
  created() {
    this.fetchCartCheckList();
    this.fetchCouponList();
    this.fetchPointList();
    this.orderNumber();
  },
  computed: {
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
    async fetchCartCheckList() {
      await axios.get(`/api/cartCheckList/${this.$store.state.user.user_id}`, {
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
        this.savePointRate();
        this.savePoint();
    },
    GetAddress(zip,addr1,addr2){
      this.zip = zip
      this.addr1 = addr1
      this.addr2 = addr2
    },
    savePointRate(){
      if (this.$store.state.user.user_grade === 'i1' || 'i6') { // 일반 또는 정지회원
        this.savePointrate = 1 / 100; // 1% 
      } else if (this.$store.state.user.user_grade === 'i2') { // 실버
        this.savePointrate = 3 / 100; // 3% 
      } else if (this.$store.state.user.user_grade === 'i3' || 'i4') { //골드 또는 관리자
        this.savePointrate = 5 / 100; // 5% 
      }
      console.log(this.savePointrate,'적립율 계산');
    },
    savePoint() {
      this.savePointprice = Math.floor(this.final * this.savePointrate);
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
    },
    async selectedPayMethod(paymentMethod) {
         this.orderNumber();
                for(let i=0; i<this.cartList.length; i++) {
                }
                if (this.cartList.length > 0) {
                  this.prodName = this.cartList[0].prod_name + '외' + (this.cartList.length - 1) + '건';
                } else {
                  this.prodName = this.cartList[0].prod_name;
                }

        // 결제 정보 설정
        let paymentInfo = {
          pg: '', //pg사
          pay_method: paymentMethod, //결제방법
          name: this.prodName, //상품이름
          merchant_uid: this.Number, //주문번호
          amount: this.final, // 최종결제금액
          buyer_name: this.$store.state.user.user_name, //결제이름
          buyer_tel: this.$store.state.user.user_tel, // 결제전화번호
          buyer_email: this.$store.state.user.user_email, //결제이메일
        };

        // 선택한 결제 방법에 따라 결제 정보 설정
        if (paymentMethod === 'kakaopay') {
          this.paymentMethod = 'h1'
          paymentInfo.pg = 'kakaopay';
          paymentInfo.pay_method = paymentMethod;
        } else if (paymentMethod === 'toss') {
          this.paymentMethod = 'h2'
          paymentInfo.pg = 'tosspay';
          paymentInfo.pay_method = paymentMethod;
        } else if (paymentMethod === 'kg') {
          this.paymentMethod = 'h3'
          paymentInfo.pg = 'html5_inicis';
          paymentInfo.pay_method = paymentMethod;
        } else if (paymentMethod === '0') {
          this.orderInsert(); // 바로 주문 처리
          alert('결제완료');
          return; // 아임포트 응답 처리하지 않고 함수 종료
        }
        
        let iamport = window.IMP;
        iamport.init('imp61344571'); // 아임포트에서 발급받은 가맹점 식별코드 입력

        iamport.request_pay(paymentInfo, (response) => {
          if (response.success) {
            // 결제 완료 처리
            this.orderInsert(); // order테이블 
            this.orderdetailInsert(orderno); // orderdetail테이블
          } else {
            // 결제 실패 처리
            alert('결제 취소했습니다. 장바구니로 다시 이동합니다.');
            this.$router.replace("/cartList")
          }
        });
      },

async orderInsert(){ // orders 테이블 등록
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
                    point_use: this.pointInput,
                    point_save_rate: this.savePointrate * 100,
                    point_save: this.savePointprice,
                    real_payment: this.final,
                    payment_method: this.paymentMethod,
                    payment_no: 1,
                    order_status: 'c1',
                  }
                }
                let result = await axios.post("/api/orderInsert", obj)
                               .catch(err => console.log(err));
            this.$router.replace("/orderSuccess")
            if(result.config.data != null){
              this.orderdetailInsert(obj.param.order_no)
            }
    
  },
  async orderdetailInsert(orderno){ // ordersdetail 테이블 등록 부분
             // 상품 정보를 반복해서 처리하는 부분
             for (let i = 0; i < this.cartList.length; i++) {
                let Obj = {
                  param : {
                    order_no: orderno,
                    prod_no: this.cartList[i].prod_no,
                    order_quantity: this.cartList[i].quantity,
                    prod_discount_price: this.cartList[i].discount_price,
                    prod_discount_rate: this.cartList[i].discount_rate,
                    order_detail_code: '1'
                  }
                };
                console.log(this.order_no,'확인디테일')
                let result = await axios.post("/api/orderDetailInsert", Obj)
                                        .catch(err => console.log(err));
                console.log(result);
    }
  },
  cancelPay() {
    jQuery.ajax({
      // 예: http://www.myservice.com/payments/cancel
      "url": "{환불정보를 수신할 가맹점 서비스 URL}", 
      "type": "POST",
      "contentType": "application/json",
      "data": JSON.stringify({
        "merchant_uid": "187747", // 예: ORD20180131-0000011
        "cancel_request_amount": 2000, // 환불금액
        "reason": "테스트 결제 환불", // 환불사유
        // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
        "refund_holder": "홍길동", 
        // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
        "refund_bank": "88", 
        // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
        "refund_account": "56211105948400" 
      }),
      "dataType": "json"
    });
    }
  }
}
</script>

