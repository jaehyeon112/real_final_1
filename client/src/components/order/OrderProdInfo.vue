<template>
    <v-container>
        <v-row justify="center">
            <v-col style="text-align:center">
                <p> 1조 짱 을 이용해주셔서 감사합니다.</p>
                <div class="h">
                    <p style="font-size:25px; font-weight:bold">고객님, <span style="color:red;">주문이 완료</span>되었습니다.</p>
                </div>
                <p>{{ this.$store.state.user.user_name }} 님이 주문하신<br>
                    주문번호는<span style="color:red; font-size:25px;">  {{ $store.state.orderNo }}  </span>입니다. </p>
                <br>
                <p style="font-size:25px; font-weight:bold">주문 내역 확인은 배송/마이페이지의<br>
                "주문/배송조회" 에서 확인하실수 있습니다.</p>
                <h1 style="text-align:left">주문정보</h1>
            </v-col>
            
        </v-row>
      <hr>
      <table class="rwd-table" :key="idx" v-for="(list, idx) in orderList">
        <tr>
          <td>상품 이미지</td>
          <td>{{ list.prod_name }}</td>
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
	name: 'OrderProdInfo',
    props: {
        orderList: {
            type: Array,
        }
    }
};
</script>
<style scoped>
    .h{
        background-color:lightgreen;
    }
    
</style>
