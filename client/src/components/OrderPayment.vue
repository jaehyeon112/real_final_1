<template>
  <v-container>
    <h1>결제정보</h1>
    
    <v-btn v-if="final !== 0" :class="{ active: selectedPaymentMethod === 'kakaopay' }" @click="selectPaymentMethod('kakaopay')" :style="{ backgroundColor: selectedPaymentMethod === 'kakaopay' ? 'yellow' : 'gray' }">
      <img class="css-1wbfblw e1ewacwr0" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik03LjUxNSAyLjhDMy4zNjUgMi44IDAgNS40NDUgMCA4LjcwN2MwIDEuOTM4IDEuMTg3IDMuNjU3IDMuMDIxIDQuNzM0LS4xOTEuNzY4LS42ODQgMi43NDItLjc1IDIuOTU3LS4wODMuMjY2LS4xMDMgMS4wNDYuNzAyLjUxMi42MzQtLjQyIDIuNDc5LTEuNyAzLjU3LTIuMzQ4LjMxOC4wMzMuNjQyLjA1MS45NzIuMDUxIDQuMTUgMCA3LjUxNS0yLjY0NCA3LjUxNS01LjkwNiAwLTMuMjYyLTMuMzY1LTUuOTA3LTcuNTE1LTUuOTA3TTIxLjA0OCA0LjExM2MxLjUxNy0xLjMxMyAzLjQ2OC0xLjUwOCA0Ljg5My0uNTg1IDEuNzA3IDEuMTA2IDIuMTY4IDIuNzU0IDIuMTY4IDQuODkyIDAgMi40LTEuMTE1IDMuOTY4LTEuNjQyIDQuNDYtLjUyNi40OTMtMS42NzMgMS4yOTItMi44OCAxLjI5MkgyMS40MnYzLjc4NGgtMi45MTFWMy4yODJoMi4xMDZzLjI2LjU0OC40MzMuODN6bTEuOTUxIDEuMTUzYy0uNjk3IDAtMS4xNTMuMTc3LTEuNTMzLjQ3N3Y2LjMwNmgxLjEzOGMuNTU4IDAgMi41NDctLjUwNyAyLjU0Ny0zLjM4MyAwLS42NzctLjA5LTEuMzg1LS4yNzgtMS45LS4zNTctLjk3Ny0xLjI0Ny0xLjUtMS44NzQtMS41ek0zMy44MTcgMy4wNDZjMi4wODUgMCAyLjk0Mi43MTggMy40NDggMS4zNTQuNDgxLjYwNC44NjIgMS40OTcuODYyIDIuOHY2LjY4aC0yLjI2di0uOTU0cy0uNDQyLjQyLTEuMzc5LjgzMWMtLjk4LjQzLTIuNjUzLjg3Ny00LjA0MS0uMTg0LTEuMzk3LTEuMDY4LTEuMi0zLjQ3MS0uODUyLTQuMTU0LjQ4LS45MzggMS4zNjMtMS45NjggMy43MTYtMS45NjhoMi4wMjl2LS45MDhjMC0uNTU0LS41ODMtMS4xMDctMS43My0xLjEwNy0xLjI4IDAtMS44MzMuMTkyLTIuODE3LjYzNWwtLjk5Ni0xLjk0M3MxLjQ5Ni0xLjA4MiA0LjAyLTEuMDgyem0xLjQ3NyA2LjI1aC0xLjQxNWMtLjU5OSAwLTEuOTYxLjIxNi0xLjk2MSAxLjQ3NyAwIDEuMjgzIDEuMDkgMS4yNiAxLjQ0OCAxLjIzIDEuMDg5LS4wOTEgMS45MzgtLjc5NCAxLjkzOC0uNzk0bC0uMDEtMS45MTN6TTQ3LjA2MSAzLjA0NmwtMi4yOTEgOC4xMTEtMi41NC04LjExLTIuODQ5LjgyczMuNSA5LjM4MyAzLjYyNCA5Ljc4M2MuMTIzLjQtLjAwNS44NTgtLjI4IDEuMzIyLS4zNzEuNjMtMS44MjYgMi4wMy0xLjgyNiAyLjAzbDEuODc4IDEuNjYzcy44NTctLjY4OCAxLjc0NS0xLjc1NWMuNzQzLS44OTIgMS42MzYtMi44MyAxLjkzOC0zLjU3Ny44NTktMi4xMTkgMy40Mi05LjQ2NiAzLjQyLTkuNDY2bC0yLjgxOS0uODJ6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=" alt="카카오페이">
    </v-btn>
    <v-btn v-if="final !== 0" :class="{ active: selectedPaymentMethod === 'toss' }" @click="selectPaymentMethod('toss')" :style="{ backgroundColor: selectedPaymentMethod === 'toss' ? 'lightblue' : 'gray' }">
       <img class="" scr="../server/toss.svg" alt="toss">
    </v-btn>
    <v-btn v-if="final !== 0" :class="{ active: selectedPaymentMethod === 'kg' }" @click="selectPaymentMethod('kg')" :style="{ backgroundColor: selectedPaymentMethod === 'kg' ? 'pink' : 'gray' }">신용카드</v-btn>
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
.kakaopay {
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 48px;
    border: 1px solid rgb(246, 229, 0);
    font-size: 14px;
    color: rgb(255, 255, 255);
    background: pink;
    font-weight: 500;
    border-radius: 3px;
}
</style>