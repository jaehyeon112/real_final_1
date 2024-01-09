<template>
    <div>
        <ul class="list-group" v-if ="likeList.length !=0">
            <li class="list-group-item" :key="idx" v-for="(like, idx) in likeList">
                {{ like.prod_no }}
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