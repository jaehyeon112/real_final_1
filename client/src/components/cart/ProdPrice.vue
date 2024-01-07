<template>
    <v-container>
      <v-card class="c">
        <p>상품 금액 <span>{{ $wonComma(total) }} 원</span></p>
        <div>
          <p>상품 할인금액 <span>{{ $wonComma(discount) }}</span>원</p>
          <p>배송비 <span>{{ $wonComma(delivery) }} 원</span></p>
          <hr>
          <p>결제예정금액 <span style="font-size: 24px; font-weight: bold;">{{ $wonComma(final) }} 원</span></p>
        </div>
        <br>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'ProdPrice',
    props: {
      cartList: {
        type: Array,
      },
      discount : 0,
      total : 0,
      delivery : 0,
      final : 0
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
      align-items: center;
      margin-top: 15px;
      font-size: 12px;
      color: rgb(102, 102, 102);
  }
  .c{
    padding: 19px 18px 18px 20px;
    border: 1px solid rgb(242, 242, 242);
    background-color: rgb(250, 250, 250);
  }
  </style>