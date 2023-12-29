<template>
  <v-container class="container">
    <v-card>
      <p>주문 금액 <span>{{ discount }} 원</span></p>
      <div class="discount">
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5H0V10V11H1H6V10H1V5Z" fill="#ddd"></path>
        </svg>
        <span>상품 전체금액 <span>{{ total }} 원</span></span>
        <br>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5H0V10V11H1H6V10H1V5Z" fill="#ddd"></path>
        </svg>
        <span>상품 할인금액 -<span>{{ total - discount }}</span>원</span>
      </div>
      <br>
      <p>배송비 <span>{{ delivery }} 원</span></p>
      <p class="discount">쿠폰 할인 <span>{{ coupon }} 원</span></p>
      <p class="discount">포인트 <span>{{ pointInput }} 원</span></p>
      <hr>
      <p>최종 결제금액<span style="color: red; font-size: 40px;">{{ final }} 원</span></p>
      <span class="a">적립 </span><span class="b">구매 시 </span><span class="b">{{ savePoint }} 원 </span>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'OrderPrice',
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

.container {
  margin: auto 0;
  color: rgb(102, 102, 102);
}

.discount {
  display: block;
  line-height: 24px;
  color: rgb(153, 153, 153);
  font-size: 14px;
  padding-left: 8px;
}

.a {
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
.b{
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 15px;
    font-size: 12px;
    color: rgb(102, 102, 102);
}
</style>