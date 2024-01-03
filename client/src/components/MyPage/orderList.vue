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
                    <div><button class="orderscan" @click="orderCancle">주문취소</button></div> 
                </div>
            </div>
        </div>
    
    <div v-else>
        <p>최근 주문내역이 없습니다.</p>
    </div>
</template>
<script>
import axious from 'axios';
export default {
    data(){
        return{
            orderList :[ ],
            name :''
        }
    },
    created(){
        this.getOrderList(); // 실행이 종료 후
        //this.name = this.orderList.order_no;
    },
    methods:{
        async getOrderList(){
            this.orderList = (await axious.get(`/api/myOrders/${this.$store.state.user.user_id}`)
                                          .catch(err=>console.log(err))).data
                                          
        },
        goToOrderDetail(orderNo){
            this.$router.push({path:'detailOrder', query:{orderNo : orderNo}})
        },
        async orderCancle(){
            this.orderList = await axious.delete('/api/myOrders')
                                          .catch(err=>console.log(err))
        },
        
    }
} 

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