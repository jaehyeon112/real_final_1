<template>
    <div>
        <div class="list-group">
            <label class="list-group-item d-flex gap-2" :key="idx" v-for="(detail, idx) in productList" ><!--여기 포문 돌려라-->
            <input class="form-check-input flex-shrink-0" type="checkbox" value="" checked="">
            <span>
                <p>주문번호: {{ detail.order_no }}</p>
                <p>주문상세번호: {{ detail.order_detail_no }}</p>
                <img :src="`/api/test/`+detail.file_name" alt="상품이미지" width="200px" height="200px">
                <small class="d-block text-body-secondary">상품명:{{ detail.prod_name }}</small>
                <hr>
                <small class="d-block text-body-secondary">원래가격:{{ detail.price }}</small>
                <small class="d-block text-body-secondary">지불가격:{{ detail.prod_discount_price }}</small>
                <small class="d-block text-body-secondary">수량:{{ detail.order_quantity }}</small>
            </span>
            <p>{{ detail.delivery_status }}</p>
                <v-btn @click="goToReview(detail.order_detail_no)" :disabled="detail.test|| disablestate" >리뷰작성</v-btn>
                <v-btn  @click="goToInquire(detail.order_detail_no)" >문의하기</v-btn>
                <v-btn @click="orderCancel">주문취소</v-btn>
            </label>
            <div>
                <hr>
                
                
                <div class="info">
                    <p style="font-size: 25px;">결제정보</p>
                        <p class="d-block text-body-secondary ">금액:{{ oneproductLiss.total_payment }}</p>
                        <p class="d-block text-body-secondary ">할인금액:{{ oneproductLiss.total_payment - oneproductLiss.real_payment }}</p>
                        <p class="d-block text-body-secondary ">결제금액:{{ oneproductLiss.real_payment }}</p>
                        
                        <p class="d-block text-body-secondary ">배송비:{{ oneproductLiss.delivery_charge }}</p>
                        <p class="d-block text-body-secondary ">쿠폰할인:{{ oneproductLiss.coupon_discount_rate }}</p>
                        <p class="d-block text-body-secondary ">포인트사용:{{ oneproductLiss.point_use }}</p>
                        <p class="d-block text-body-secondary ">포인트적립률:{{ oneproductLiss.point_save_rate }}</p>
                        
                        <p class="d-block text-body-secondary">결제방법:{{ oneproductLiss.payment_method }}</p>
                        <p class="d-block text-body-secondary ">결제일시:{{ $dateFormat(oneproductLiss.order_date,'yyyy년MM월dd일') }}</p>
                        <hr>
                        <p style="font-size: 25px;">배송정보</p>
                        <p class="d-block text-body-secondary ">보내는분:{{ oneproductLiss.user_id }}</p>
                        <p class="d-block text-body-secondary ">받는분:{{ oneproductLiss.recipient }}</p>
                        <p class="d-block text-body-secondary ">받는주소:{{ oneproductLiss.recipient_address }}</p>
                        <p class="d-block text-body-secondary ">받는상세주소:{{ oneproductLiss.recipient_detail_address }}</p>
                        <p class="d-block text-body-secondary ">배송 요청사항:{{ oneproductLiss.delivery_request }}</p>
                        <br>
                        <br>
                    </div>
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
        oneproductLiss:[],
        reviewList:[],
        orderNo:'',
        test:false,
        userGrade:''
    }
    props:[]
   },
   created(){
    
       this.getDetailList();
       
    },
    
    methods:{
        
        async getDetailList(){
        this.orderNo = this.$route.query.orderNo;
        
        let a = (await axios.get(`/api/myDetailOrders/${this.orderNo}`)
                                        .catch(err=>console.log(err))).data // 상세의 데이터
                                        
        let b = (await axios.get(`/api/myReview`)
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
            this.productList = a;
            this.oneproductLiss = a[0];
            console.log( '배송비랑 멕시멈..'+this.productList)
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
    // async userGrade(){
    //     this.userGrade=(await axios.get(`/api/userGrade`)
    //                                     .catch(err=>console.log(err))).data // 상세의 데이터
    //                                     console.log('등급'+this.userGrade)
                                        
    // },
    // disablestate(){
    // if(this.userGrade == 'i1'){
    // return false;
    //     }
    // },

    orderCancel() {
        try {
            // 액세스 토큰을 파일에서 읽어옴
                let accessToken = "3e4566eff341e534d314fb2e7f6ed76ed9ed9021"
                let orderNo = 0;
                for (let i = 0; i < this.orderList.length; i++) {
                    orderNo = this.orderList[i].order_no;
                    console.log(orderNo, '주문번호');
                }
                
                let obj = {
                    merchant_uid: 109446514 // 주문번호
                };
                axios.post('/api.iamport.kr/payments/cancel', obj, {
                    headers: {
                    Authorization: accessToken 
                    }
                });

                console.log(`주문번호 ${orderNo}의 주문이 취소되었습니다.`);
            } catch (error) {
                console.error(error);
            }
        }
   }
   
}
</script>
<style>
.info{
    font-size: 20px;
    padding: 10px;
}
</style>