<template>
  <v-container>
    <h1>결제정보</h1>
    <v-btn v-if="final !== 0" :class="{ active: selectedPaymentMethod === 'kakaopay' }" @click="selectPaymentMethod('kakaopay')" :style="{ backgroundColor: selectedPaymentMethod === 'kakaopay' ? 'yellow' : 'gray' }">카카오페이</v-btn>
    <v-btn v-if="final !== 0" :class="{ active: selectedPaymentMethod === 'toss' }" @click="selectPaymentMethod('toss')" :style="{ backgroundColor: selectedPaymentMethod === 'toss' ? 'blue' : 'gray' }">토스페이</v-btn>
    <v-btn v-if="final !== 0" :class="{ active: selectedPaymentMethod === 'kg' }" @click="selectPaymentMethod('kg')" :style="{ backgroundColor: selectedPaymentMethod === 'kg' ? 'purple' : 'gray' }">신용카드</v-btn>
    <v-btn v-if="final !== 0" @click="openPaymentWindow" :disabled="!selectedPaymentMethod" color="primary" >주문하기</v-btn>
    <v-btn v-else @click="openPaymentWindow" :disabled="selectedPaymentMethod" color="primary" >주문하기</v-btn>
    <v-dialog v-model="dialog" persistent width="auto">
      <template >
        <!-- <v-btn color="primary" :="openPaymentWindow"> 주문하기 </v-btn> -->
      </template>
      <v-card>
        <v-card-title class="text-h5">
          주문화면
        </v-card-title>
        <v-card-text>주문하시겠습니까?.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="sucerssForm">
            주문하기
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="dialog = false">
            취소하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <p v-if="paymentUrl">결제창 URL: {{ paymentUrl }}</p>
    <p v-if="errorMessage">에러 메시지: {{ errorMessage }}</p>
    {{ orderInsert }}
  </v-container>
</template>

<script>
export default {
  name: 'OrderPayment',
  data() {
    return {
      selectedPaymentMethod: false,
      paymentUrl: '',
      errorMessage: '',
      dialog: false,
    };
  },
  props: {
        cartList: {
            type: Array,
            required: true,
        },
        final : 0,
        orderInsert :{
          type: Function
        }
  },
  created(){
  },
  methods: {
    selectPaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod;
      console.log(this.result)
    },
    openPaymentWindow() {
      if(this.final == 0){
        this.dialog = true;
      }else{
        const iamport = window.IMP;
        iamport.init('imp61344571'); // 아임포트에서 발급받은 가맹점 식별코드 입력
        
        const paymentInfo = {
          pg: '',
          pay_method: '',
          name: this.cartList[0].prod_name, // 상품 이름 입력
          merchant_uid: '1111', // 가맹점에서 생성한 고유 주문번호 입력
          amount: this.cartList[0].price, // 결제 금액 입력
          buyer_name: this.cartList[0].user_name, // 구매자 이름 입력
          buyer_tel: this.cartList[0].user_tel, // 구매자 전화번호 입력
          buyer_email: this.cartList[0].user_email, // 구매자 이메일 입력
          // 기타 필요한 결제 정보 입력
        };
        
        if (this.selectedPaymentMethod === 'kakaopay') {
          // 카카오페이 결제창 열기
          paymentInfo.pg = 'kakaopay';
          paymentInfo.pay_method = 'card';
        } else if (this.selectedPaymentMethod === 'toss') {
          // 토스페이 결제창 열기
          paymentInfo.pg = 'tosspay';
          paymentInfo.pay_method = 'card';
        } else if (this.selectedPaymentMethod === 'kg') {
          // 이니시스 결제창 열기
          paymentInfo.pg = 'html5_inicis';
          paymentInfo.pay_method = 'card';
        }
        
        iamport.request_pay(paymentInfo, (response) => {
          this.$router.replace({ name: 'orderSuccess' });
        });
      }
      },
      sucerssForm(){
      if(this.dialog == true){
        this.orderInsert();
        this.$router.replace({ name: 'orderSuccess' });
      }
    },
  },
};
</script>

<style>
button {
  background-color: gray;
  color: white;
  padding: 10px;
  margin-right: 10px;
}

button.active {
  background-color: blue;
}

button:disabled {
  background-color: lightgray;
}
</style>