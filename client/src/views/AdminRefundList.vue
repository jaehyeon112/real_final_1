<template>
    <list>
        <template #title>주문 취소/환불 목록</template>
        <template #searchData>
            <div style="width: 200px;">
            <v-select
            label="취소상태"
            :items="['취소신청','취소/환불 진행중','완료']"
            v-model = orders
            variant="underlined"
            return-object
            ></v-select>
            <v-btn @click="refresh">초기화</v-btn></div>
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>주문번호</th>
                <th>주문회원</th>
                <th>쿠폰번호</th>
                <th>환급예정포인트</th>
                <th>취소요청일</th>
                <th>취소완료일</th>
                <th>취소상태</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="order in orderList">
            <td>{{ order.order_no }}</td>
            <td>{{ order.user_id }}</td>
            <td v-if="order.coupon_no==null">사용한 쿠폰이 없습니다</td>
            <td v-else>{{ order.coupon_no }}</td>
            <td>{{ order.return_point }}</td>
            <td>{{ $dateFormat(order.cancel_request,'yyyy년 MM월 dd일') }}</td>
            <td v-if="order.cancel_date=='0000-00-00'||order.cancel_date==null">취소가 완료되지 않았습니다</td>
            <td v-else>{{ $dateFormat(order.cancel_date,'yyyy년 MM월 dd일') }}</td>
            <td v-if="order.cancel_status=='o1'">취소신청</td>
            <td v-else-if="order.cancel_status=='o2'">취소/환불 처리중</td>
            <td v-else-if="order.cancel_status=='o3'">완료</td>
            <td v-if="order.cancel_status=='o1'"><v-btn type="button" @click="changeStatus(order.order_no,'o2')">취소/환불처리</v-btn></td>
            <td v-else-if="order.cancel_status=='o2'"><v-btn type="button" @click="changeStatus(order.order_no,'o3')">처리완료하기</v-btn></td>
            <td v-else><v-btn type="button" @click="modalCheck=true,oneOrder(order.order_no)">상세보기</v-btn></td>  <!--상세영수증보기-->
        </tr>
        </tbody>
        <tbody v-if="orderList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 데이터가 없습니다</h3></td></tr>
        </tbody>
        <div class="modal-wrap" v-show="modalCheck">
      <div class="modal-container">
        <h3>취소영수증</h3><hr>
        <div class="modalPop">
            <v-icon color="success" icon="mdi-check-circle"></v-icon>
            <br>
            <h3>취소/환불</h3>
            <p>환불 예정일은 영업일 기준 2~5일 이내입니다</p>
            <br><br>
            <h4>환불 정보를 확인해주세요</h4>
            <hr><br>
            <div class="leftLine">
                <h5>총 환불금액  {{ oneList.real_payment }}원</h5><br>
                <h5>배송비  {{ oneList.delivery_charge }}원</h5><br>
                <h6>상품금액     {{ oneList.total_payment }}원</h6><br>
                <h6>쿠폰할인     {{ oneList.real_payment*oneList.coupon_discount_rate }}원</h6><br>
                <h6>포인트할인     {{ oneList.point_use }}원</h6><br><hr>
                <h5>환불 수단</h5>  {{ oneList.payment_method }}
            </div>
        </div>
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modalCheck = false">닫기</v-btn>
        </div>
      </div>
    </div>


        <v-container>
          <page ref="pagination1" @changePage="changePage" :list="totalList" :totals="10"></page>
        </v-container>
        </template>
    </list>
    </template>
    <script>
    import list from '../components/admin/List.vue';
    import axios from 'axios';
    import page from '../components/common/Pagination.vue';
    
    export default {
        data(){
            return{
                reason : '',
                reasons : '',
                modalCheck: false,
                orders : '',
                orderStatus : '',
                orderList : [],
                startNum : 0,
                totalList: "",
                totals :'',
                orderNo : '',
                oneList : '',
                accessToken : '',
                today : this.$dateFormat('','yyyy-MM-dd')
            }
        },
        components : {
        list,
        page
        },
        created(){
            window.scrollTo(0, 0);
            this.getOrderList(this.startNum);
            this.total();
            this.getAccessToken();

        },
        methods : {
            async total() {
                let total = await axios.get(`/api/refund`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getOrderList(no){
                let result = await axios.get(`/api/refund/${no}`).catch(err=>console.log(err));
                this.orderList = result.data;
                this.total();
            },
            async oneOrder(ono){
                console.log(ono)
                let result = await axios.get(`/api/Oneorder/${ono}`).catch(err=>console.log(err));
                if(result.data[0].payment_method=='h1'){
                    result.data[0].payment_method = '신용카드(이니시스)'
                }else if(result.data[0].payment_method=='h2'){
                    result.data[0].payment_method = '카카오페이'
                }else{
                    result.data[0].payment_method = '토스페이'
                }
                this.oneList = result.data[0];
            },
            async changePage(no) {
                if(this.orders==''){
                    this.getOrderList(no);
                }else if(this.orders!=''){
                    this.orderState(this.orders,no);
                }
            },
            refresh(){
                this.getOrderList(this.startNum);
                this.orders = ''
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
            async cancelPayment(ono) { // 눌렀을때 주문취소
                let result = await axios.get(`/api/Oneorder/${ono}`).catch(err=>console.log(err));
                console.log(result.data[0],result.data)
                let cancel = await axios.post(`/api/cancel`, {
                            merchant_uid: ono,
                            reason: '단순 취소',
                            cancel_request_amount: result.data[0].real_payment,
                            access_token: this.accessToken
                        });
                    console.log(cancel.data)
                if(cancel.data.affectedRows==1){
                    alert('포트성공')
                }else{
                    alert('포트실패')
                }

            },
            async changeStatus(ono,state){
                if(state=='o2'){
                    if(confirm('취소/환불을 진행할까요?')){
                        let result = await axios.put(`/api/refund/o2/'0000-00-00'/${ono}`).catch(err=>console.log(err));
                        if(result.data.affectedRows==1){
                            alert(' 취소/환불이 진행 중입니다~ ');
                            this.cancelPayment(ono);
                            this.getOrderList(this.startNum);
                        }else{
                            alert('오류가 났습니다.\n다시 확인을 해주세요.');
                        }
                    }else{
                        alert('취소되었습니다')
                    }
                }else{
                    if(confirm('취소/환불을 완료할까요?')){
                        let result = await axios.put(`/api/refund/o3/${this.today}/${ono}`).catch(err=>console.log(err));
                        if(result.data.affectedRows==1){
                            alert(' 취소/환불이 완료되었습니다.');
                            this.getOrderList(this.startNum);
                        }else{
                            alert('오류가 났습니다.\n다시 확인을 해주세요.');
                        }
                    }else{
                        alert('취소되었습니다')
                    }
                }
            },
            async orderState(od,no){
                if(od=='취소신청'){
                    od='o1'
                }else if(od=='취소/환불 진행중'){
                    od='o2'
                }else if(od=='완료'){
                    od='o3'
                }
                let total = await axios.get(`/api/refunds/${od}`).catch(err=>console.log(err));
                let result = await axios.get(`/api/refunds/${od}/${no}`).catch(err=>console.log(err));
                console.log(total)
                this.totalList = total.data;
                this.orderList = result.data;
                if(this.totalList.length==0||this.orderList.length==0){
                    alert('존재하는 데이터가 없습니다!');
                    this.orders = '';
                    this.getOrderList(no);
                }else{
                    this.totalList = total.data;
                    this.orderList = result.data;
                    this.$refs.pagination1.currentPage2(no);
                }
            }
        },
        watch : {
            orders(){
                if(this.orders==''){
                    return;
                }
                this.orderState(this.orders,this.startNum);
            }
    }
        
    }
</script>
<style scoped>
.modal-wrap {
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .modal-container {
    z-index: 1000;
    position :relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 900px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  .modalPop{
    z-index: 1000;
    border: 1px solid;
    text-align: center;
  }
  .modal-btn button{
    z-index: 1000;
    left: 43%;
  }
  .leftLine{
    text-align: left;
    margin-left: 20px;
  }
</style>