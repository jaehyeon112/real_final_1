<template>
    <v-container>
      <h1>주문 상품</h1>
      <hr>
      <table class="rwd-table" :key="idx" v-for="(list, idx) in cartList">
        <tr>
          <td>
            <v-img width="80" height="80" :src="`api/test/`+ list.file_name"></v-img>
          </td>
          <td style="font-size: 18px; font-weight: bold;">{{ list.prod_name }}</td>
          <td>{{ list.quantity }} 개</td>
          <td>
            <ul>
              <li >{{ $wonComma(list.discount_price * list.quantity) }} 원</li>
              <li v-if="list.discount_price !== list.price" class="discount">{{ $wonComma(list.price * list.quantity) }} 원</li>
            </ul>
          </td>
        </tr>
      </table>
    </v-container>
  </template>
<script>
export default {
	name: 'CartProdInfo',
    props: {
        cartList: {
            type: Array,
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
  width: 100%;
  border-collapse: collapse;
}

.rwd-table td {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f5f9fc;
  padding: .5em 3em;
}

.rwd-table td:nth-child(1) {
  width: 10%; 
}

.rwd-table td:nth-child(2) {
  width: 40%; 
}

.rwd-table td:nth-child(3) {
  width: 10%; 
}

.rwd-table td:nth-child(4) {
  width: 15%; 
}
.discount {
    display: block;
    line-height: 24px;
    color: rgb(181, 181, 181);
    word-break: break-all;
    text-decoration: line-through;
    font-size: 14px;
    padding-left: 8px;
}
</style>