<template>
    <div>
        <div class="list-group">
            <label class="list-group-item d-flex gap-2" :key="idx" v-for="(detail, idx) in productList" ><!--여기 포문 돌려라-->
            <input class="form-check-input flex-shrink-0" type="checkbox" value="" checked="">
            <span>
                <p>{{ detail.order_no }}</p>
                여기 사진 넣는다 치고
                <small class="d-block text-body-secondary">{{ detail.prod_no }}</small>
                <hr>
                <small class="d-block text-body-secondary">{{ detail.price }}</small>
                <small class="d-block text-body-secondary">{{ detail.prod_discount_price }}</small>
                <small class="d-block text-body-secondary">{{ detail.order_quantity }}</small>
            </span>
            <p>배송완료</p>
            <button @click="goToReview">리뷰작성</button>
            </label>
            <div>
                <p>결제정보</p>
            </div>
        </div>   
    </div>
</template>
<script>
import axios from 'axios';

export default {
   data(){
    return{
        productList:[],
        orderNo:''
    }
   },
   created(){
    this.getDetailList();
    this.orderNo = this.$route.query.orderNo
   },
   methods:{
    async getDetailList(){
        this.productList = (await axios.get(`api/myDetailOrders/${this.orderNo}/${this.$store.state.user.user_id}`)
                                        .console.log(err=>console.log(err))).data
    },
    
    goToReview(productNo){
            this.$router.push({path:'/reviewForm',query:{pno : productNo}})
        }
   }
   
}
</script>
