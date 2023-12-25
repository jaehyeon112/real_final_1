<!-- App.vue -->
<template>
  <div>
    <h1>장바구니</h1>
    <div v-if="cartItems.length === 0">장바구니가 비어 있습니다.</div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} (수량: {{ item.quantity }})
          <button @click="removeFromCart(item.id)">삭제</button>
        </li>
      </ul>
      <div>총 가격: {{ totalPrice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        { id: 1, name: '상품 1', quantity: 2, price: 1000 },
        { id: 2, name: '상품 2', quantity: 1, price: 2000 },
        { id: 3, name: '상품 3', quantity: 3, price: 1500 }
      ]
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
    }
  },
  methods: {
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    }
  }
};
</script>

<style>
/* 스타일을 추가하거나 수정하세요 */
</style>