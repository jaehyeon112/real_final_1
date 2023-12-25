<template>
    <div>
      <h1 style="text-align: center;">주문서</h1>
        <OrderProdInfo/>
        <OrderUserInfo/>
        <OrderAddrInfo/>
        <OrderPointInfo/>
        <OrderPayment/>
    </div>
</template>
<script>
import OrderProdInfo from '../components/OrderProdInfo.vue';
import OrderUserInfo from '../components/OrderUserInfo.vue';
import OrderAddrInfo from '../components/OrderAddrInfo.vue';
import OrderPointInfo from '../components/OrderPointInfo.vue';
import OrderPayment from '../components/OrderPayment.vue';


export default {
  name: 'OrderList',
  components: {
    OrderProdInfo, // 상품정보
    OrderUserInfo, // 주문자정보
    OrderAddrInfo, // 배송지정보
    OrderPointInfo, // 쿠폰/포인트 정보
    OrderPayment // 결제수단
  },
  data() {
    return {};
  },
};
</script>

