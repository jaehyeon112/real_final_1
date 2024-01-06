<template>
    <div>
        <div class="list-group">
            <label class="list-group-item d-flex gap-2" :key="idx" v-for="(detail, idx) in productList" ><!--여기 포문 돌려라-->
            <input class="form-check-input flex-shrink-0" type="checkbox" value="" checked="">
            <span>
                <p>주문번호: {{ detail.order_no }}</p>
                <p>주문상세번호: {{ detail.order_detail_no }}</p>
                여기 사진 넣는다 치고
                <small class="d-block text-body-secondary">상품명:{{ detail.prod_name }}</small>
                <hr>
                <small class="d-block text-body-secondary">원래가격:{{ detail.price }}</small>
                <small class="d-block text-body-secondary">지불가격:{{ detail.prod_discount_price }}</small>
                <small class="d-block text-body-secondary">수량:{{ detail.order_quantity }}</small>
            </span>
            <p>{{ detail.delivery_status }}</p>
                <v-btn @click="goToReview(detail.order_detail_no)" :disabled="detail.test">리뷰작성</v-btn>
                <v-btn  @click="goToInquire(detail.order_detail_no)" >문의하기</v-btn>
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
        reviewList:[],
        orderNo:'',
        test:false
    }
   },
   created(){
    
       this.getDetailList();
       
    },
    
    methods:{
        
        async getDetailList(){
        this.orderNo = this.$route.query.orderNo;
        let member_id = this.$store.state.user.user_id;
        let a = (await axios.get(`/api/myDetailOrders/${this.orderNo}/${member_id}`)
                                        .catch(err=>console.log(err))).data // 상세의 데이터
                                        
        let b = (await axios.get(`/api/orderNoReview/${member_id}`)
                                   .catch(err => console.log(err))).data;  // 리뷰의 데이터 
         console.log('a의 값')
         console.log(a)                           
         console.log('b의 값')
         console.log(b)                           
        for(let i =0; i<a.length; i ++){
            for( let j = 0 ; j < b.length; j++){
            if(a[i].order_detail_no == b[j].detail_order_no){
                a[i].test = true
            }
        }
            this.productList = a
        }    
    },
    
    goToReview(detailNo){
            this.$router.push({path:'/reviewForm', query:{detailNo : detailNo}})
            console.log(detailNo)
    },
    goToInquire(detailNo){
        this.$router.push({path:'/inquireForm', query:{detailNo : detailNo}})
        console.log(detailNo)
    },

   }
   
}
</script>
