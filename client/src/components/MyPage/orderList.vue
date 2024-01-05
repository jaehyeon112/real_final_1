<template>
    <div  v-if="orderList.length!=0">
        <div>  
            <div>
                <div :key="idx" v-for="(order, idx) in orderList" >
                    <div>
                        <p class="orderdate" >주문일자  {{ $dateFormat(order.order_date,'yyyy년MM월dd일') }}</p>
                        <p class="showdetail" @click="goToOrderDetail(order.order_no)">주문내역 상세보기></p>
                       
                    </div> 
                    <div>
                        <hr>
                        <img src="/api/test" alt="상품이미지">
                        <dl>주문번호:  {{ order.order_no }}</dl>
                        <dl>상품명:  {{ order.prod_name}} 외 {{  }}</dl>
                        <dl>총 가격:  {{ order.total_payment }}</dl>
                        <dl>실 결제 가격: {{ order.real_payment }}</dl>
                        <dl>배송비: {{ order.delivery_charge }}</dl>
                        <dl>결제방법: {{ order.payment_no }}</dl>
                        <v-btn class="orderscan" @click="cancelPayment(order.order_no)">주문취소</v-btn>
                        <dl v-if="order.delivery == 'null'">
                        <dl v-if="order.order_status=='c1'">진행상태: 주문완료</dl>
                        <dl v-else-if="order.order_status=='c2'">진행상태: 상품준비중</dl>
                        <dl v-else>진행상태: 출고완료</dl>
                        </dl>
                        <dl v-else >
                            <dl v-if="order.delivery=='d1'">진행상태: 배송중</dl>
                            <dl v-else>진행상태: 배송완료</dl>
                        </dl>
                    </div>
                </div>   
                    <v-btn @click="cancelPayment"></v-btn>
                </div>
            </div>
        </div>
    
    <div v-else>
        <p>최근 주문내역이 없습니다.</p>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            orderList :[ ],
            productList : [],
            name :'',
            accessToken : '',
            orderno : 0, // 주문번호
            realpay : 0, // 취소 금액
            prodQuantity : 0, // 상품 수량
        }
    },
    created(){
        this.getOrderList(); // 실행이 종료 후
        //this.name = this.orderList.order_no;
    },
    methods:{
        async getOrderList(){
            this.orderList = (await axios.get(`/api/myOrders/${this.$store.state.user.user_id}`)
                                          .catch(err=>console.log(err))).data
                                          
        },
        // async getDetailList(){
        // let member_id = this.$store.state.user.user_id;
        // let a = (await axios.get(`/api/myDetailOrders/${this.orderNo}/${member_id}`)
        //                                 .catch(err=>console.log(err))).data // 상세의 데이터

        // // for(let i = 0; i < a.length; i++){
        // //     for( let j = 0 ; j < b.length; j++){
        // //         if(a[i].order_detail_no == b[j].detail_order_no){
        // //             a[i].test = true;
        // //         }else{
        // //             a[i].test= false;
        // //         }
        // //     }
        // // }
        // //                          this.reviewList = b;
        // //                          this.productList = a;   
        //     this.productList = a
        // },
        goToOrderDetail(orderNo){
            this.$router.push({path:'detailOrder', query:{orderNo : orderNo}})
        },
        getAccessToken() {
            axios.get('/api/saveAccessToken') // app.js 에 토큰값 가져오기!
                .then(response => {
                this.accessToken = response.data; // 토큰 값을 변수에 저장
                console.log(this.accessToken,'토큰값')

                })
                .catch(error => {
                console.error(error);
                });
        },
        async cancelPayment(orderNo) { // 눌렀을때 주문취소
            try {
                this.orderno = orderNo;
                for (let i = 0; i < this.orderList.length; i++) {
                if (this.orderList[i].order_no === orderNo) {
                    this.realpay = this.orderList[i].real_payment;
                    break;
                }
                }
                    console.log(this.orderno,'주문번호')
                    console.log(this.realpay,'실 결제 가격')
                    await axios.post(`/api/cancel`, {
                        merchant_uid: this.orderno,
                        reason: '단순 취소',
                        cancel_request_amount: this.realpay,
                        access_token: this.accessToken
                        
                    });
                    this.orderUpdate();
                
                } catch (error) {
                console.error(error);
                }
        },
    async orderUpdate(){ //상품 주문 취소되었을때 주문상태 변경
        let obj = {
            param : {
            order_status : 'c4'
            }
        }

         await axios.put(`/api/orderUpdate/${this.orderno}`, obj)
                                .catch(err => console.log(err));
                    console.log(this.orderno,'주문번호 업데이트')              
    },
},
  mounted() {
    this.getAccessToken(); // 컴포넌트가 마운트될 때 토큰 값을 가져오도록 호출
    }
};
</script>
<style scoped>
.showdetail{
    float: right;
}
.orderdate{
    float:left;
}
.orderscan{
    float:left;
}
</style>