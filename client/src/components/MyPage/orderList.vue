<template>
    <div  v-if="orderList.length!=0">
        <div>  
            <div>
                <div :key="idx" v-for="(order, idx) in orderList">
                    <div>
                        <p class="orderdate" >주문일자  {{ order.order_date }}</p>
                        <p class="showdetail" @click="goToOrderDetail">주문내역 상세보기></p>
                       
                    </div> 
                    <div>
                        <hr>
                        <img src="/api/test" alt="상품이미지">
                        <dl>주문번호  {{ order.order_no }}</dl>
                        <dl>상품명  {{ order.prod_name }}</dl>
                        <dl>원래 가격  {{ order.total_payment }}</dl>
                        <dl>결제 가격 {{ order.real_payment }}</dl>
                        <dl>결제방법  {{ order.payment_method }}</dl>
                        <dl>진행상태  {{ order.order_status }}</dl>
                    </div>
                    

                    <div><button class="orderscan" @click="orderCancle">주문취소</button></div> 
                </div>
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
            

        }
    },
    created(){
        this.getOrderList()
        //this.$store.state.user_id = userId;
        
    },
    methods:{
        async getOrderList(){
            this.orderList = (await axious.get(`/api/orders/test`)
                                          .catch(err=>console.log(err))).data
        },
    
        goToOrderDetail(orderNo){
            this.$router.push({path:'/orderDetail', query:{orderNo : orderNo}})
        },
        async orderCancle(){
            this.orderList = await axious.delete('/api/orders')
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