<template>
    <v-container>
      <v-card>
        <p>주문 금액 <span>{{ totalprice - discountprice }} 원</span></p>
        <ul>
          <li>상품 전체금액 <span>{{ totalprice }} 원</span></li>
          <li>상품 할인금액 <span>{{ discountprice }}</span>원</li>
        </ul>
        <p>배송비{{ delivery }} 원</p>
        <p>쿠폰 할인 <span>{{  }} 원</span></p>
        <p>포인트 {{ $store.state.inputValue }} 원</p>
        <hr>
        <p>최종 결제금액 <span style="color: red;">25,000 원</span></p>
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
    },
    computed: {
      totalprice() {
        let total = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          total += this.cartList[i].price * this.cartList[i].quantity;
        }
        return total;
      },
      discountprice() {
        let distotal = 0;
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].discount_price != null) {
            distotal += (this.cartList[i].price * this.cartList[i].quantity) - (this.cartList[i].discount_price * this.cartList[i].quantity);
          }
        }
        return distotal;
      },
      delivery() {
        return this.totalprice < 40000 ? 3000 : 0;
      },
    },
  }
  </script>
  
  <style scoped>
  * {
    list-style: none;
  }
  </style>