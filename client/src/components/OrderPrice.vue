<template>
    <div>
        <p>주문 금액</p>
        <ul v-if="cartList.length > 0">
            <li>상품 전체금액 원</li>
            <li>상품 할인금액 원</li>
        </ul>
        <p>배송비 원</p>
        <p>쿠폰 할인 원</p>
        <p>포인트 원</p>
        <hr>
        <p>최종 결제금액 <span style="color: red;">25,000 원</span></p>

    </div>
</template>
<script>
    export default {
        name : 'OrderPrice',
        props: {
        cartList: {
            type: Array,
            required: true,
        }
    }
    }

</script>
<style scoped>
* {
    list-style: none;
}
</style>