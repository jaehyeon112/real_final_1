<template>
    <div>
        <ul class="list-group" v-if ="likeList.length !=0">
            <li class="list-group-item" :key="idx" v-for="(like, idx) in likeList">
                <p>상품명{{ likeList.prod_name }}</p>
                <p>가격{{ likeList.price }}</p>
                <p>현재 판매가{{ likeList.discount_price }}</p>
                <p>준비중...{{ likeList.soldout }}</p>
                <p>알러지 정보{{ likeList.allergy }}</p>
                <button @click="goToCart">장바구니에 담기</button>
            </li>
        </ul>
        <p v-else class="card-text-center"> 찜한 목록이 없습니다</p>
    </div>
</template>
<script>
import axios from 'axios';
export default {
   
    data(){
        return{
            likeList:[]
        }
    },
    created(){
        this.getLikeList();
    },
    methods:{
        async getLikeList(){
            let result= await axios.get(`/api/prodLikes`)
                                   .catch(err=>console.log(err))
            this.likeList = result.data;                       
        }
    }
}
</script>