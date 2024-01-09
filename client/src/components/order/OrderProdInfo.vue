<template>
    <v-container>
        <v-row justify="center">
            <v-col style="text-align:center">
                <p> 1조 짱 을 이용해주셔서 감사합니다.</p>
                <div class="h">
                    <p style="font-size:25px; font-weight:bold">고객님, <span style="color:red;">주문이 완료</span>되었습니다.</p>
                </div>
                <p>{{ this.$store.state.user.user_name }} 님이 주문하신<br>주문번호는 
                <span style="color:red; font-size:25px;">  {{ $store.state.orderNo }}  </span> 입니다. 
                </p>
                <br>
                <p style="font-size:25px; font-weight:bold">주문 내역 확인은 배송/마이페이지의<br>
                "주문/배송조회" 에서 확인하실수 있습니다.
                </p>
                <h1 style="text-align:left">주문정보</h1>
            </v-col>
        </v-row>
      <hr>
      <div v-if="orderList.length > 0" style="padding: 100px; margin: ;">
        <p>상품 이미지
            <v-img width="400" height="300" :src="`api/test/`+ orderList[0].file_name"></v-img>
        </p>
            <p>상품 명 
            <span>{{ prodName }}</span>
            </p>
            <p style="text-align:right">총 결제 가격 
            <span style="font-size:25px; font-weight:bold; color:red;">{{ $wonComma(orderList[0].real_payment) }}원</span>
            </p>
        </div>
    </v-container>
</template>
<script>
export default {
	name: 'OrderProdInfo',
    data(){
        return {
            name : '',
            prodName : '' // 상품 갯수에따라 이름 넣을려고 만듬
        }
    },
    props: {
        orderList: {
            type: Array,
        }
    },
    created(){
        this.getOrderList();
    },
    watch : {
      orderList(){
        this.getOrderList();
      }  
    },
    methods : {
        getOrderList(){
            for(let i=0; i<this.orderList.length; i++){
                this.prodName = this.orderList[0].prod_name;
            }
                if(this.orderList.length > 1){
                    this.prodName = this.prodName + '외 ' + (this.orderList.length - 1) + '건';
                }else{
                    this.prodName = this.prodName
            }
        }
    }

};
</script>
<style scoped>
.h{
    background-color:lightgreen;
}
</style>
