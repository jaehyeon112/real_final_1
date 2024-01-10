<template>
  <v-container justify="end">
    <v-card>
      <div class="pricecontainer">
        <div class="label-container">
          <p class="label">주문금액</p>
          <span class="price">{{ $wonComma(discount) }} 원</span>
        </div>
        <div class="label-container">
          <p class="label2">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5H0V10V11H1H6V10H1V5Z" fill="#ddd"></path> </svg>
            상품 금액
          </p>
          <span class="price">{{ $wonComma(total) }} 원</span>
        </div>
        <div class="label-container">
          <p class="label2">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5H0V10V11H1H6V10H1V5Z" fill="#ddd"></path> </svg>
            상품 할인금액
          </p>
          <span class="price">{{ $wonComma(total - discount) }} 원</span>
        </div>
        <div class="label-container">
          <p class="label">배송비</p>
          <span class="price">{{ $wonComma(delivery) }} 원</span>
        </div>
        <div class="label-container">
          <p class="label">쿠폰 할인</p>
          <span class="price">{{ $wonComma(coupon) }} 원</span>
        </div>
        <div class="label-container">
          <p class="label">포인트</p>
          <span class="price">{{ $wonComma(pointInput) }} 원</span>
        </div>
        <hr>
        <div class="label-container">
          <p class="label">최종 결제금액</p>
          <span style="color: red; font-size: 40px; font-weight: bold;">  {{ $wonComma(final) }} 원</span>
        </div>
        <div class="label">
          <p class="css-5lws00">적립</p>
          <span>구매 시 {{ $wonComma(savePoint) }} 원</span>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

  
  <script>
  export default {
    name: 'CartPrice',
    props: {
      cartList: {
        type: Array,
      },
      pointInput: 0,
      couponRate: 0,
      total: 0,
      discount: 0,
      point: 0,
      delivery: 0,
      coupon: 0,
      final: 0,
  
    },
    computed: {
      savePoint() {
        let userGrade = this.getUserGrade(); 
        let ponitRate = 0;
        console.log(userGrade);
        if (userGrade === 'i1') {
          ponitRate = 0.01; // 1% 
        } else if (userGrade === 'i2') {
          ponitRate = 0.03; // 3% 
        } else if (userGrade === 'i3') {
          ponitRate = 0.05; // 5% 
        }
        return Math.floor(this.final * ponitRate);
      },
    },
    methods: {
      getUserGrade() {
        if (this.cartList.length > 0) {
          let user = this.cartList[0];
          console.log(user);
          if ('user_grade' in user) {
            return user.user_grade;
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  * {
    list-style: none;
  }
  .v-card { 
    margin-top: 40px;
  }
  .pricecontainer {
  margin: 40px;
}

.label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
}

.label {
  display: inline-block;
  width: 40%;
}
.label2 { 
  display: inline-block;
  width: 60%;
  color : gray;
}

.price {
  display: inline-block;
  width: 40%;
  text-align: right;
}

.css-5lws00 {
  display: inline-block;
  margin-right: 4px;
  padding: 0px 7px;
  border-radius: 9px;
  background-color: rgb(255, 191, 0);
  font-size: 10px;
  line-height: 18px;
  height: 18px;
  color: rgb(255, 255, 255);
  font-weight: 500;
}

hr {
  margin-top: 16px;
  margin-bottom: 16px;
}
  </style>