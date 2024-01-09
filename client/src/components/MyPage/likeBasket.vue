<template>
    <div>
        <ul class="list-group" v-if ="likeList.length !=0">
            <li class="list-group-item" :key="idx" v-for="(like, idx) in likeList">
                <div class="likelist">찜한목록 {{ idx }}</div>
                <p>상품명{{ like.prod_name }}</p>
                <p>가격{{ like.price }}</p>
                <p>현재 판매가{{ like.discount_price }}</p>
                <p>준비중...{{ like.soldout }}</p>
                <p>알러지 정보{{ like.allergy }}</p>
                <v-btn @click="goToCart" justify="end" style="background-color: #FF9100;">장바구니에 담기</v-btn>
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
<style scoped>
.likeList{
    color: orange
}
.list-group-item{
    text-decoration-color: orange;

}
</style>