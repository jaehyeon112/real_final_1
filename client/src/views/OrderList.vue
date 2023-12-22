<template>
    <div>
        <h1>주문서</h1>
        <OrderProdInfo/>
        <OrderUserInfo/>
        <OrderAddrInfo/>
    </div>
</template>
<script>
import OrderProdInfo from '../components/OrderProdInfo.vue';
import OrderUserInfo from '../components/OrderUserInfo.vue';
import OrderAddrInfo from '../components/OrderAddrInfo.vue';


export default {
  name: 'OrderList',
  components: {
    OrderProdInfo, // 상품정보
    OrderUserInfo, // 주문자정보
    OrderAddrInfo // 배송지정보
  },
  data() {
    return {};
  },
};
</script>

