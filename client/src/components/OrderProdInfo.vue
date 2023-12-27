<template>
    <v-container>
      <h1>주문 상품</h1>
      <hr>
      <table class="rwd-table" :key="idx" v-for="(list, idx) in cartList">
        <tr>
          <td>이미지</td>
          <td>{{ list.prod_name }}</td>
          <td>{{ list.quantity }} 개</td>
          <td>
            <ul>
              <li>{{ list.price }} 원</li>
              <li v-if="list.discount_price !== list.price" class="discount">{{ list.discount_price }} 원</li>
            </ul>
          </td>
        </tr>
      </table>
    </v-container>
  </template>
<script>
export default {
	name: 'OrderProdInfo',
    props: {
        cartList: {
            type: Array,
            required: true,
        }
    }
};

</script>
<style scoped>
* {
    list-style: none;
}
.rwd-table {
  margin: auto;
  min-width: 50%;
  max-width: 100%;
  border-collapse: collapse;
}

.rwd-table td {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f5f9fc;
  padding: .5em 1em;
}
.rwd-table td:nth-child(1) {
  width: 5%; 
}

.rwd-table td:nth-child(2) {
  width: 40%; /* 이미지 칼럼의 너비 조정 */
}

.rwd-table td:nth-child(3) {
  width: 5%; /* 상품명 칼럼의 너비 조정 */
}

.rwd-table td:nth-child(4) {
  width: 10%; /* 수량 칼럼의 너비 조정 */
}
.discount {
    display: block;
    line-height: 24px;
    color: rgb(181, 181, 181);
    word-break: break-all;
    text-decoration: line-through;
}
</style>