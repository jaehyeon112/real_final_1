<template>
    <div class="container">
        <h1>주문자정보</h1>
        <hr>
        <ul v-if="cartList.length > 0">
            <li>
                <p>받는분 <span>{{ cartList[0].user_id }}</span></p>
                <p>전화번호 <span>{{ cartList[0].user_tel }}</span></p>
                <p>이메일 <span>{{ cartList[0].user_email }}</span></p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
	name: 'OrderUserInfo',
    data(){
        return {

        }
    },
    props: {
        cartList: {
            type: Array,
            required: true,
        }
    }
}
</script>
<style scoped>
ul{
    list-style-type: none;
}
</style>