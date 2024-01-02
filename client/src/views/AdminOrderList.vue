<template>
    <list @changeemit="changeChildData" @search="search">
        <template #searchData>
            <div>날짜별 주문내역 : <input v-model="startNo" type="date"> ~ <input v-model="lastNo" type="date">
             <v-btn @click="orderDate">검색하기</v-btn>  <v-btn @click="refresh">초기화</v-btn>
             <v-select
            label="주문상태"
            :items="['주문완료','상품준비중','출고완료','취소된 주문']"
            v-model = orders
            variant="underlined"
            return-object
            ></v-select></div>
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>주문날짜</th>
                <th>주문번호</th>
                <th>주문회원</th>
                <th>받는사람</th>
                <th>결제금액</th>
                <th>실결제금액</th>
                <th>결제방법</th>
                <th>주문상태</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="order in orderList">
            <td>{{ $dateFormat(order.order_date,'yyyy년 MM월 dd일') }}</td>
            <td>{{ order.order_no }}</td>
          <td>{{ order.user_id }}</td>
          <td>{{ order.recipient }}</td>
          <td>{{ $wonComma(order.total_payment)+'원' }}</td>
          <td>{{ $wonComma(order.real_payment)+'원' }}</td>
          <td>{{ order.payment_method }}</td>
          <td v-if="order.order_status=='c1'">{{this.alarm='주문완료'}}</td>
          <td v-else-if="order.order_status=='c2'">상품준비중</td>
          <td v-else-if="order.order_status=='c3'">출고완료</td>
          <td v-else-if="order.order_status=='c4'">취소된 주문</td>
          <td v-if="order.order_status=='c1'"><v-btn type="button" @click="this.orderStatus='c2',changeStatus(order.order_no)">상품 준비완료</v-btn></td>
          <td v-else-if="order.order_status=='c2'"><v-btn type="button" @click="this.orderStatus='c3',changeStatus(order.order_no)">상품 출고하기</v-btn></td>
          <td v-else-if="order.order_status=='c4'"><v-btn type="button" @click="">상세보기</v-btn></td>
          <td v-else><v-btn type="button">배송 조회</v-btn></td>
          <td v-if="order.order_status=='c4'"></td>
          <td v-else><v-btn type="button" @click="modalCheck=true,this.orderNo=order.order_no">주문취소 신청</v-btn></td>
        </tr>
      </tbody>
      <tbody v-if="orderList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 데이터가 없습니다</h3></td></tr>
        </tbody>
      <div class="modal-wrap" v-show="modalCheck" @click="modalOpen">
      <div class="modal-container" @click.stop="">
        <h3>취소 사유를 입력해주세요</h3>
        <div class="modalPop">
            <v-select
            label="취소사유"
            :items="['물량부족','공급사 제작지연','기타']"
            v-model = reason
            variant="underlined"
            return-object
            ></v-select>
        </div>
        <input v-model = "reasons" type="text" placeholder="기타 사유를 적어주세요..">
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modalCheck = false,this.reason=''">닫기</v-btn>
            <v-btn style="border-radius: 10px;" @click="sendMessage">회원에게 취소 알림 보내기</v-btn>
        </div>
      </div>
    </div>
        <v-container>
          <page @changePage="changePage" :list="totalList" :totals="this.nums"></page>
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
                startNo : '',
                lastNo : '',
                orderList : [],
                nums : 0,
                startNum : 0,
                totalList: "",
                totals :'',
                content:'',
                orderNo : ''
            }
        },
        components : {
        list,
        page
        },
        created(){
            //this.prodList();
            this.total();
            //this.getOrderList();
        },
        methods : {
            async sendMessage(){
                if(confirm('정말 취소하시겠습니까?')){
                    let result = await axios.put(`/api/refund/${this.orderNo}`).catch(err=>console.log(err));
                    let result2 = await axios.post(`/api/refund/${this.orderNo}`).catch(err=>console.log(err));
                    if(result.data.affectedRows==1&&result2.data.affectedRows==1){
                        alert('회원님에게 알림을 보냈습니다');
                        if(this.reason='기타'){
                            this.$socket.emit('report', `${this.reasons}으로 인한 주문취소!`)
                        }else{
                            this.$socket.emit('report', `${this.reason}으로 인한 주문취소!`)
                        }
                        this.getOrderList();
                        this.modalCheck = false;
                        this.reason = '';
                        //스케쥴러 사용--한달동안 정지시킴
                    }else{
                        alert('오류가 남'); 
                    }
                }else{
                    alert('취소되었습니다');
                    this.modalCheck = false;
                    this.reason = '';
                }
            },
            async total() {
                let total = await axios.get(`/api/order`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getOrderList(){
                let result = await axios.get(`/api/order/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                this.orderList = result.data;
                for(let i=0;i<result.data.length;i++){
                    if(result.data[i].order_status=='c1'){
                        this.count = this.count+1;
                    }
                }
            },
            async changePage(no) {
                let list = await axios.get(`/api/order/${no}/${this.nums}`).catch(err=>console.log(err));
                let result = list.data;
                this.orderList = result;
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
                this.totals = childData;
            },
            search(searchData){
                this.content = searchData;
                this.searchList(this.content);
            },
            async searchList(cont){
                let list = await axios.get(`/api/order/${cont}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                let result = list.data;
                console.log('리스트 : '+result)
                this.productList = result;
                this.totalList = result;
            },
            async orderDate(){
                let total = await axios.get(`/api/orders/${this.startNo}/${this.lastNo}/${this.startNum}/${this.nums}`).catch((err) => {console.log(err);});
                this.orderList = total.data;
            },
            refresh(){
                this.getOrderList();
                this.startNo ='';
                this.lastNo = '';
                this.orders = ''
            },
            async changeStatus(ono){
                if(this.orderStatus=='c2'){
                    if(confirm('주문을 확인하셨습니까?')){
                        let result = await axios.put(`/api/order/${this.orderStatus}/${ono}`).catch(err=>console.log(err));
                        if(result.data.affectedRows==1){
                            alert('상품준비중으로 변경되었습니다! ');
                            this.getOrderList();
                        }else{
                            alert('오류가 남');
                        }
                    }else{
                        alert('취소되었습니다')
                    }
                }else if(this.orderStatus=='c3'){
                    if(confirm('상품이 준비되었습니까?')){
                        let result = await axios.put(`/api/order/${this.orderStatus}/${ono}`).catch(err=>console.log(err));
                        if(result.data.affectedRows==1){
                            alert('출고완료로 변경되었습니다! ');
                            this.getOrderList();
                        }else{
                            alert('오류가 남');
                        }
                    }else{
                        alert('취소되었습니다')
                    }
                }
            },
            async orderState(od){
                if(od=='주문완료'){
                    od='c1'
                }else if(od=='상품준비중'){
                    od='c2'
                }else if(od=='출고완료'){
                    od='c3'
                }else if(od=='취소된 주문'){
                    od='c4'
                }
                let result = await axios.get(`/api/order/${od}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                console.log(result)
                this.orderList = result.data;
            }
        },
        watch : {
            nums(){
                this.getOrderList();
            },
            content(){
                this.searchList(this.content);
            },
            orders(){
                this.orderState(this.orders);
            }
    }
        
    }
    </script>
<style scoped>
.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  /* modal or popup */
  .modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
  }
  .modalPop{
    border: 1px solid;
  }

  .modal-btn button{
    margin: 10px;
    padding : 5px;

  }
  v-btn{
    border-radius: 10px;
  }
</style>