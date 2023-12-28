<template>
    <v-container class="container">
      <v-card>
        <li>주문 금액 <span>{{ discount }} 원</span></li>
        <ul class="discount">
          <p>상품 전체금액 <span>{{ total }} 원</span></p>
          <li>상품 할인금액 <span>{{ discount }}</span>원</li>
        </ul>
        <p>배송비{{ delivery }} 원</p>
        <p>쿠폰 할인 <span>{{ coupon }} 원</span></p>
        <p>포인트 {{ pointInput }} 원</p>
        <hr>
        <p>최종 결제금액<span style="color: red; font-size: 40px;">{{ realpay }} 원</span></p>
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
      pointInput : 0,
      couponRate : 0,
      total : 0,
      discount: 0,
      point : 0,
      delivery : 0,
      coupon : 0,
      realpay : 0,
    },
    computed: {
    },
  }
  </script>
  
  <style scoped>
  * {
    list-style: none;
  } 
  .container {
    margin: auto 0;
  }
  .discount {
    display: block;
    line-height: 24px;
    color: rgb(181, 181, 181);
    word-break: break-all;
    font-size: 14px;
    padding-left: 8px;
  }
  </style>