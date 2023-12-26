<template>
    <div class="side_bar">
    <ul>
        <li>주문내역</li>
        <li>찜한상품</li>
        <li>배송지관리</li>
        <li>상품후기</li>
        <li>상품문의</li>
        <li>포인트</li>
        <li>쿠폰</li>
        <li>개인정보 수정</li>
    </ul>
</div>
</template>
<script>
export default{
    name:'side_bar',
    data(){
        return{}
    },
    methods:{
        resize:function(){
            //함수 생각해보자
        }
    },
    created(){
        this.resize()
    }
}
</script>