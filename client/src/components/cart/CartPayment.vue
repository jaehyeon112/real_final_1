<template>
  <v-container>
    <h1>결제정보</h1>
    <hr>
    <v-col cols="12" sm="4" md="5" v-if="final !== 0">
        <v-btn  class="label" block rounded="sm" size="x-large" @click="selectPaymentMethod('kakaopay')" :style="{ backgroundColor: selectedPaymentMethod === 'kakaopay' ? 'yellow' : 'gray' }">
          <img class="css-1wbfblw e1ewacwr0" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik03LjUxNSAyLjhDMy4zNjUgMi44IDAgNS40NDUgMCA4LjcwN2MwIDEuOTM4IDEuMTg3IDMuNjU3IDMuMDIxIDQuNzM0LS4xOTEuNzY4LS42ODQgMi43NDItLjc1IDIuOTU3LS4wODMuMjY2LS4xMDMgMS4wNDYuNzAyLjUxMi42MzQtLjQyIDIuNDc5LTEuNyAzLjU3LTIuMzQ4LjMxOC4wMzMuNjQyLjA1MS45NzIuMDUxIDQuMTUgMCA3LjUxNS0yLjY0NCA3LjUxNS01LjkwNiAwLTMuMjYyLTMuMzY1LTUuOTA3LTcuNTE1LTUuOTA3TTIxLjA0OCA0LjExM2MxLjUxNy0xLjMxMyAzLjQ2OC0xLjUwOCA0Ljg5My0uNTg1IDEuNzA3IDEuMTA2IDIuMTY4IDIuNzU0IDIuMTY4IDQuODkyIDAgMi40LTEuMTE1IDMuOTY4LTEuNjQyIDQuNDYtLjUyNi40OTMtMS42NzMgMS4yOTItMi44OCAxLjI5MkgyMS40MnYzLjc4NGgtMi45MTFWMy4yODJoMi4xMDZzLjI2LjU0OC40MzMuODN6bTEuOTUxIDEuMTUzYy0uNjk3IDAtMS4xNTMuMTc3LTEuNTMzLjQ3N3Y2LjMwNmgxLjEzOGMuNTU4IDAgMi41NDctLjUwNyAyLjU0Ny0zLjM4MyAwLS42NzctLjA5LTEuMzg1LS4yNzgtMS45LS4zNTctLjk3Ny0xLjI0Ny0xLjUtMS44NzQtMS41ek0zMy44MTcgMy4wNDZjMi4wODUgMCAyLjk0Mi43MTggMy40NDggMS4zNTQuNDgxLjYwNC44NjIgMS40OTcuODYyIDIuOHY2LjY4aC0yLjI2di0uOTU0cy0uNDQyLjQyLTEuMzc5LjgzMWMtLjk4LjQzLTIuNjUzLjg3Ny00LjA0MS0uMTg0LTEuMzk3LTEuMDY4LTEuMi0zLjQ3MS0uODUyLTQuMTU0LjQ4LS45MzggMS4zNjMtMS45NjggMy43MTYtMS45NjhoMi4wMjl2LS45MDhjMC0uNTU0LS41ODMtMS4xMDctMS43My0xLjEwNy0xLjI4IDAtMS44MzMuMTkyLTIuODE3LjYzNWwtLjk5Ni0xLjk0M3MxLjQ5Ni0xLjA4MiA0LjAyLTEuMDgyem0xLjQ3NyA2LjI1aC0xLjQxNWMtLjU5OSAwLTEuOTYxLjIxNi0xLjk2MSAxLjQ3NyAwIDEuMjgzIDEuMDkgMS4yNiAxLjQ0OCAxLjIzIDEuMDg5LS4wOTEgMS45MzgtLjc5NCAxLjkzOC0uNzk0bC0uMDEtMS45MTN6TTQ3LjA2MSAzLjA0NmwtMi4yOTEgOC4xMTEtMi41NC04LjExLTIuODQ5LjgyczMuNSA5LjM4MyAzLjYyNCA5Ljc4M2MuMTIzLjQtLjAwNS44NTgtLjI4IDEuMzIyLS4zNzEuNjMtMS44MjYgMi4wMy0xLjgyNiAyLjAzbDEuODc4IDEuNjYzcy44NTctLjY4OCAxLjc0NS0xLjc1NWMuNzQzLS44OTIgMS42MzYtMi44MyAxLjkzOC0zLjU3Ny44NTktMi4xMTkgMy40Mi05LjQ2NiAzLjQyLTkuNDY2bC0yLjgxOS0uODJ6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=" alt="카카오페이">
        </v-btn>
    </v-col>
    <v-col cols="12" sm="4" md="5" v-if="final !== 0">
        <v-btn class="label" block rounded="sm" size="x-large" @click="selectPaymentMethod('toss')" :style="{ backgroundColor: selectedPaymentMethod === 'toss' ? 'dodgerblue' : 'gray' }">
          <img src="https://static.toss.im/logos/svg/logo-toss-pay.svg" alt="토스 페이" class="css-rhxkjj">
        </v-btn>
    </v-col>
    <v-col cols="12" sm="4" md="5" v-if="final !== 0" >
        <v-btn class="label" block rounded="sm" size="x-large" @click="selectPaymentMethod('kg')" :style="{ backgroundColor: selectedPaymentMethod === 'kg' ? 'salmon' : 'gray'}" style="font-weight: 700;">
          카드결제
        </v-btn>
    </v-col>
    <v-col cols="12" sm="4" md="5" v-else >
      <v-btn class="label" block rounded="sm" size="x-large" @click="selectPaymentMethod('0')" color="primary">주문하기</v-btn>
    </v-col>
    <v-col cols="12" sm="4" md="5" v-if="final !== 0" >
      <v-btn  class="label" block rounded="sm" size="x-large" @click="showMenu" :disabled="!selectedPaymentMethod" color="primary">주문하기</v-btn>
    </v-col>
    <p v-if="paymentUrl">결제창 URL: {{ paymentUrl }}</p>
    <p v-if="errorMessage">에러 메시지: {{ errorMessage }}</p>
  </v-container>
</template>

<script>
export default {
  name: 'CartPayment',
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
        zip : '',
        addr1 : ''
  },
  methods: {
    showMenu() {
        let Option = confirm("이대로 결제하시겠습니까?");
        if (Option) {
          if (!this.zip || !this.addr1) {
            alert('주소를 입력해주세요.');
          } else {
            if (this.selectedPaymentMethod) {
              this.$emit('selectedPayMethod', this.selectedPaymentMethod);
            } else {
              console.log('결제 방법을 선택해주세요.');
            }
          }
        }
    },
    selectPaymentMethod(paymentMethod) {
      console.log(paymentMethod)
      this.selectedPaymentMethod = paymentMethod;
      if(this.selectedPaymentMethod == '0'){
        this.selectedPaymentMethod = paymentMethod;
        this.$emit('selectedPayMethod', this.selectedPaymentMethod);
      }
    },
  },
};
</script>

<style scoped>
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
    color: rgb(221, 248, 68);
    font-weight: 500;
    border-radius: 3px;
}
.css-rhxkjj {
    height: 20px;
}

.label {
  margin-left: 330px;
}
</style>