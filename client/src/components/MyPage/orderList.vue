<template>
    <div v-if="orderList.length != 0">
      <div>
        <div>
          <div :key="idx" v-for="(order, idx) in orderList">
            <div>
              <p class="orderdate">주문일자 {{ $dateFormat(order.order_date, 'yyyy년MM월dd일') }}</p>
              <p class="showdetail" @click="goToOrderDetail(order.order_no)">주문내역 상세보기></p>
            </div>
            <div>
              <hr>
              
              <img :src=" `/api/test/`+order.file_name " alt="상품이미지"   >
              <dl>주문번호: {{ order.order_no }}</dl>
              <dl>상품명: {{ order.prod_name_list }}</dl>
              <dl>총 가격: {{ order.total_payment }}</dl>
              <dl>실 결제 가격: {{ order.real_payment }}</dl>
              <dl>배송비: {{ order.delivery_charge }}</dl>
              <dl>결제방법: {{ order.payment_no }}</dl>
              
              구매 수량 {{ order.order_quantity }} 
              <dl v-if="order.delivery == null">
                <dl v-if="order.order_status =='c1'">진행상태: 주문완료</dl>
                <dl v-else-if="order.order_status =='c2'">진행상태: 상품준비중</dl>
                <dl v-else-if="order.order_status == 'c3'">진행상태: 주문취소</dl>
                <dl v-else>진행상태: 출고완료</dl>
              </dl>
              <dl v-else>
                <dl v-if="order.delivery == 'd4'">진행상태: 배송중</dl>
                <dl v-else>진행상태: 배송완료</dl>
              </dl>
              <dl><v-btn v-model="order.order_status" color="#FFB300" class="custom-button" @click="showMenu(order.order_no)" :disabled="order.order_status != 'c1'">주문취소</v-btn></dl>
            </div>
          </div>
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
            orderList : [],
            productList : [],
            couponList : [],
            name :'',
            accessToken : '',
            orderno : 0, // 주문번호
            realpay : 0, // 취소 금액
            prodQuantity : 0, // 상품 수량
            point : 0, // 포인트 
            couponno : 0, // 쿠폰 사용번호
            day : 0
        }
    },
    created(){
        this.getOrderList(); // 실행이 종료 후
        //this.name = this.orderList.order_no;
        this.getday();
        this.getAccessToken();
    },
    methods:{
        async getOrderList(){
            this.orderList = (await axios.get(`/api/myOrders`)
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
        async cancelPayment(orderno) { // 눌렀을때 주문취소
            try {
                for (let i = 0; i < this.orderList.length; i++) {
                if (this.orderList[i].order_no == orderno) {
                    this.realpay = this.orderList[i].real_payment;
                    break;
                }
                }
                    await axios.post(`/api/cancel`, {
                        merchant_uid: orderno,
                        reason: '단순 취소',
                        cancel_request_amount: this.realpay,
                        access_token: this.accessToken
                        
                    
                    });
                    
                } catch (error) {
                    console.error(error);
                }
    },
    showMenu(orderno) {
    let Option = confirm("주문을 취소하시겠습니까?");
    if (Option) {
        
        alert('취소신청 됬습니다.');
        this.refundInsert(orderno);
        this.orderUpdate(orderno);

    }

    },
    getday(){
        let date = new Date();


        this.day = date
    },
    async orderUpdate(orderno){ //상품 주문 취소되었을때 주문상태 변경

      await axios.put(`/api/orderUpdate/${orderno}`)
      .catch(err => console.log(err));

      for(let i=0;i<this.orderList.length;i++){  // 
      this.orderList[i].order_status = "c4"; // vue 에서도 c4 상태업데이트 해준다!
      }

      },
    async refundInsert(orderno){ // 주문취소되었을때 환불/취소되었을때 테이블등록

      for(let i=0;i<this.orderList.length;i++){  // 
        this.point = this.orderList[i].point_use;
      }

        await axios.get(`/api/couponUseList/${orderno}`, {
            })
            .then(response => {
                this.couponList = response.data;
                console.log(this.couponList, '쿠폰리스트');
            })
            .catch(error => {
                console.error(error);
            });

            let obj = {
                param : {
                    order_no: orderno,
                    user_id: this.$store.state.user.user_id,
                    return_point : this.point,
                    coupon_no : this.couponList.length > 0 ? this.couponList[0].coupon_no : null,  // coupon 리스트 길이가 0보다 크면  coupon_no 를 불러오고 아니면 null 을 넣는다
                    cancel_status : 'o1',
                    cancel_request : this.day
                    }
                }   
                
                console.log(this.orderList[0].prod_no,'상품번호확인')
                // 등록
                await axios.post("/api/refundInsert", obj)
                               .catch(err => console.log(err));
            
                // 쿠폰돌려주기
                await axios.put(`/api/couponReturn/${orderno}`)
                
                // 포인트 돌려주기
                await axios.put(`/api/pointReturn/${this.point}`)
                
                // 상품 재고 돌려주기 

                await axios.put(`/api/StockReturn/${this.orderList[0].order_quantity}/${this.orderList[0].prod_no}`)
  },
},
};
</script>
<style scoped>
.showdetail{
    float: right;
}
.showdetail:hover{
  cursor : pointer;
}
.orderdate{
    float:left;
}
.orderscan{
    float:left;
}
dl{
  font-size: 15px;
  font-weight: bolder;
}
</style>