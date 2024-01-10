<template>
  <v-container>
    <v-card class="c">
      <div class="main">
          <p class="label">상품 금액</p>
          <span>{{ $wonComma(total) }} 원</span>
          <p class="label">상품 할인금액</p>
          <span>{{ $wonComma(discount) }} 원</span>
          <p class="label">배송비</p>
          <span>{{ $wonComma(delivery) }} 원</span>
        <hr>
          <p class="label">결제예정금액</p>
          <span style="font-size: 20px; font-weight: bold;">{{ $wonComma(final) }} 원</span>
        </div>
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
  
  .c{
    background-color: rgb(250, 250, 250);
  }
.main {
  margin: 40px;
}
.label {
    display: inline-block;
    width: 60%;
}
.label1 {
    display: inline-block;
    width: 73%;
}
.label2{
    display: inline-block;
    width: 60%;
}


ul {
  display: flex;
  list-style: none;
}
  </style>