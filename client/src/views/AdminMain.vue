<template>

  <div class="container-fluid">
    <v-btn @click="tt" >asdf</v-btn>
    <div class="row">
      <side/>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <v-row class="toDo">
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="black"
              v-bind="props"
            >
              오늘 해야 할 일
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              새로 들어온 내역
            </v-card-title>
            <v-card-text>
              <table class="table">
                <tr>
                  <th>주문완료</th>
                  <RouterLink to="/admin/orderList">{{counting.orderNo}}건</RouterLink>
                </tr>
                <tr>
                  <th>배송 준비중</th>
                  <RouterLink to="/admin/orderList">{{counting.delNo}}건</RouterLink>
                </tr>
                <tr>
                  <th>주문 취소건</th>
                  <RouterLink to="/admin/refundList">{{counting.refundNo}}건</RouterLink>
                </tr>
                <tr>
                  <th>리뷰신고건</th>
                  <RouterLink to="/admin/reviewReport">{{counting.reportNo}}건</RouterLink>
                </tr>
                <tr>
                  <th>문의진행건</th>
                  <RouterLink to="/admin/inquireList">{{counting.inquireNo}}건</RouterLink>
                </tr>
              </table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green-darken-1"
                variant="text"
                @click="dialog = false"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
        <v-card class="chars">
          <div class="chart" style="width: 550px;float: left;">
              <Bar style="width: 100%;height: 350px;"/>
          </div>
          <div class="chart" style="width: 550px;float: right;">
            <Line style="width: 100%;height: 350px;"/>
          </div>
        </v-card>
      <v-card title="주문관리-주문내역(최근 주문내역)">
      <v-table class="vTable1">
      <thead>
        <tr>
          <th class="text-left">
            주문 번호
          </th>
          <th class="text-left">
            주문자
          </th>
          <th class="text-left">
            주문 날짜
          </th>
          <th class="text-left">
            결제금액
          </th>
          <th class="text-left">
            실결제금액
          </th>
          <th class="text-left">
            주문상태(현재 주문완료 : 총 {{ this.count }}건)
          </th>
          <th class="text-left">
            상태상품 처리
          </th>
          <th class="text-left">
            <router-link to="/admin/orderList">더보기</router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orderList"
          :key="order.order_no"
        >
          <td>{{ order.order_no }}</td>
          <td>{{ order.user_id }}</td>
          <td>{{ $dateFormat(order.order_date,'yyyy년 MM월 dd일') }}</td>
          <td>{{ $wonComma(order.total_payment)+'원' }}</td>
          <td>{{ $wonComma(order.real_payment)+'원' }}</td>
          <td v-if="order.order_status=='c1'">{{this.alarm='주문완료'}}</td>
          <td v-else-if="order.order_status=='c2'">상품준비중</td>
          <td v-else-if="order.order_status=='c3'">출고완료</td>
          <td v-else-if="order.order_status=='c4'">취소된 주문건</td>
          <td v-if="order.order_status=='c1'"><v-btn @click="this.orderStatus='c2', this.orderGetOne(order.order_no),modalCheck=true">주문내역보기</v-btn></td>
          <td v-else-if="order.order_status=='c2'"><v-btn @click="this.orderStatus='c3',changeStatus(order.order_no)">상품 출고하기</v-btn></td>
          <td v-else-if="order.order_status=='c3'"><v-btn>배송 조회</v-btn></td>
          <td v-else-if="order.order_status=='c4'"><router-link to="/admin/refundList">취소목록으로 가기</router-link></td>
        </tr>
      </tbody>
    </v-table>
    </v-card>
      <div class="modal-wrap" v-show="modalCheck">
      <div class="modal-container">
        <h3>주문내역서</h3>
        <div class="modalPop">
            <v-table height="250px" class="vTable1">
      <thead>
        <tr>
          <th class="text-left">
            주문 번호
          </th>
          <th class="text-left">
            주문자
          </th>
          <th class="text-left">
            받는사람
          </th>
          <th class="text-left">
            받는사람 주소
          </th>
          <th class="text-left">
            받는사람 번호
          </th>
          <th class="text-left">
            주문 날짜
          </th>
          <th class="text-left">
            결제금액
          </th>
          <th class="text-left">
            쿠폰할인율
          </th>
          <th class="text-left">
            포인트 사용액
          </th>
          <th class="text-left">
            배송비
          </th>
          <th class="text-left">
            실결제금액
          </th>
          <th class="text-left">
            결제방법
          </th>
          <th class="text-left">
            주문상태
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ this.orderOne.order_no }}</td>
          <td>{{ this.orderOne.user_id }}</td>
          <td>{{ this.orderOne.recipient }}</td>
          <td>{{ this.orderOne.recipient_address+' '+this.orderOne.recipient_detail_address }}</td>
          <td>{{ this.orderOne.recipient_tel }}</td>
          <td>{{ $dateFormat(this.orderOne.order_date,'yyyy년 MM월 dd일') }}</td>
          <td>{{ (this.orderOne.total_payment)+'원' }}</td>
          <td>{{ this.orderOne.coupon_discount_rate+'%' }}</td>
          <td>{{ (this.orderOne.point_use)+'포인트' }}</td>
          <td>{{ (this.orderOne.delivery_charge)+'원' }}</td>
          <td>{{ (this.orderOne.real_payment)+'원' }}</td>
          <td>{{ this.orderOne.payment_method }}</td>
          <td v-if="this.orderOne.order_status=='c1'">주문완료</td>
          <td v-else-if="this.orderOne.order_status=='c2'">상품준비중</td>
          <td v-else-if="this.orderOne.order_status=='c3'">출고완료</td>
          <td v-else-if="this.orderOne.order_status=='c4'">취소된 주문건</td>
        </tr>
      </tbody>
      </v-table>
        </div>
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modalCheck = false">닫기</v-btn>
            <v-btn style="border-radius: 10px;" v-if="this.orderOne.order_status=='c1'" @click="this.orderStatus='c2',changeStatus(this.orderOne.order_no)">상품 준비완료하기</v-btn>
            <v-btn style="border-radius: 10px;" v-else-if="this.orderOne.order_status=='c2'" @click="this.orderStatus='c3',changeStatus(this.orderOne.order_no)">상품 출고하기</v-btn>
        </div>
      </div>
    </div>
    <br>
    <v-card flat title="리뷰관리(최근 리뷰 신고내역)"></v-card>
    <v-table fixed-header height="250px" class="vTable2">
      <thead>
        <tr>
          <th class="text-left">
            리뷰 번호
          </th>
          <th class="text-left">
            신고자
          </th>
          <th class="text-left">
            신고사유
          </th>
          <th class="text-left">
            신고날짜
          </th>
          <th class="text-left">
            신고상태(처리되지 않은 신고 : 총 {{ this.count3 }}건)
          </th>
          <th class="text-left">
            <router-link to="/admin/reviewReport">더보기</router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="review in reviewList"
          :key="review.review_no"
        >
          <td>{{ review.review_no }}</td>
          <td>{{ review.user_id }}</td>
          <td>{{ review.report_reason }}</td>
          <td>{{ $dateFormat(review.report_date,'yyyy년 MM월 dd일') }}</td>
          <td v-if="review.report_status=='p1'">{{this.reviews='새로운 신고건'}}</td>
          <td v-else-if="review.report_status=='p2'">신고처리완료</td>
          <td v-else-if="review.report_status=='p3'">신고반려</td>
        </tr>
      </tbody>
    </v-table>
    <br>
    <v-card flat title="문의사항 관리(최근 문의내역)"></v-card>
    <v-table fixed-header height="250px" class="vTable3">
      <thead>
        <tr>
          <th class="text-left">
            문의번호
          </th>
          <th class="text-left">
            문의한 회원
          </th>
          <th class="text-left">
            제목
          </th>
          <th class="text-left">
            카테고리
          </th>
          <th class="text-left">
            문의 날짜
          </th>
          <th class="text-left">
            문의 상태(현재 답변 대기 중인 문의 : 총 {{ this.count2 }}건)
          </th>
          <th class="text-left">
            답변처리
          </th>
          <th class="text-left">
            <router-link to="/admin/inquireList">더보기</router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="inquire in inquireList"
          :key="inquire.inquire_no"
        >
          <td>{{ inquire.inquire_no }}</td>
          <td>{{ inquire.user_id }}</td>
          <td>{{ inquire.inquire_title }}</td>
          <td v-if="inquire.inquire_category=='j1'">상품문의</td>
          <td v-else-if="inquire.inquire_category=='j2'">배송문의</td>
          <td v-else-if="inquire.inquire_category=='j3'">환불문의</td>
          <td v-else>기타문의</td>
          <td>{{ $dateFormat(inquire.create_date,'yyyy년 MM월 dd일') }}</td>
          <td v-if="inquire.answer_state==0">{{this.inquires='답변 대기 중'}}</td>
          <td v-else-if="inquire.answer_state==1">답변완료</td>
          <td v-if="inquire.answer_state==0" @click="replyInsert(inquire.inquire_no)">답변하기</td>
          <td v-else-if="inquire.answer_state==1" @click="replyInsert(inquire.inquire_no)">답변보기</td>
        </tr>
      </tbody>
    </v-table>
    </main>
  </div>
</div>
</template>

<script>
import list from '../components/admin/List.vue';
import side from '../components/admin/SideBar.vue';
import Bar from '../views/Barchart.vue';
import Line from '../views/LineChart.vue';
import axios from 'axios';
import icon from '../components/admin/icon.vue';
  export default {
    data(){
      return{
        modalCheck: false,
        orderStatus : '',
        ono : 0,
        count : 0,
        count2 : 0,
        count3 : 0,
        reviews : false,
        inquires : false,
        orderList : [],
        reviewList : [],
        inquireList : [],
        orderOne : [],
        counting : '',
        dialog : true
      }
    },
    components : {
      side,
      list,
      icon,
      Bar,
      Line
    },
    created(){
      window.scrollTo(0, 0);
      //this.getSum();
      if(this.$store.state.user.user_id != 'admin'){
        alert('권한이 없습니다');
        this.$store.commit('logout');
        this.$router.push({path : "/login"});
      }
      this.getOrderList();
      this.getReviewList();
      this.getInquireList();
      this.getCounting();
      if(this.$store.state.user.user_grade=='i4'){
        this.$socket.emit('joinRoom', 'ADMIN');
      }
      this.$socket.on('test', (m)=>{
        this.showNotification(m);
      })

      this.$socket.on('order', (m)=>{
      this.showNotification(m)
      })

      this.$socket.on('report', (m)=>{
      this.showNotification(m)
      })

      if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    },
    methods : {
        dateFormat(){
        let date = new Date();
        let month = ('0'+(date.getMonth()+1)).slice(-2);
        return month;
      },
      async getSum(){
        let result = await axios.get(`/api/sum`).catch(err=>console.log(err));
        for(let i=0;i<result.data.length;i++){
          this.datas.push(result.data[i]);
        }
      },
      async getCounting(){
        let result = await axios.get(`/api/counting`).catch(err=>console.log(err));
          this.counting = result.data[0];
      },
      async getOrderList(){
        let result = await axios.get('/api/order').catch(err=>console.log(err));
        for(let i=0;i<result.data.length;i++){
          if(result.data[i].order_status=='c1'){
            this.count = this.count+1;
          }
        }
        if(result.data.length>4){
          this.orderList = [];
          for(let i=0;i<4;i++){
            this.orderList.push(result.data[i]);
          }
        }else{
          this.orderList = result.data;
        }
       },

       
       async tt(){
        await this.$socket.emit('joinRoom', 'ADMIN');
          await axios.get('/api/sockettest')
       
       }
       ,
       showNotification(message) {
      // 사용자가 알림을 허용했는지 확인
      if (Notification.permission == 'granted') {
        // 알림 생성 및 표시
        const notification = new Notification('새 알람', {
          body: message, // 메시지 본문
        })}}
       ,
       async orderGetOne(ono){
        let result = await axios.get(`/api/order/${ono}`).catch(err=>console.log(err));
        this.orderOne = result.data[0];
      },
      async getReviewList(){
        let result = await axios.get('/api/report').catch(err=>console.log(err));
        //this.reviewList = result.data;
        for(let i=0;i<result.data.length;i++){
          if(result.data[i].report_status=='p1'){
            this.count3 = this.count3+1;
          }
        }
        if(result.data.length>4){
          this.reviewList = [];
          for(let i=0;i<4;i++){
            this.reviewList.push(result.data[i]);
          }
        }else{
          this.reviewList = result.data;
        }
      },
      async getInquireList(){
        let result = await axios.get('/api/inquire').catch(err=>console.log(err));
        //this.inquireList = result.data;
        for(let i=0;i<result.data.length;i++){
          if(result.data[i].answer_state=='0'){
            this.count2 = this.count2+1;
          }
        }
        if(result.data.length>4){
          this.inquireList = [];
          for(let i=0;i<4;i++){
            this.inquireList.push(result.data[i]);
          }
        }else{
          this.inquireList = result.data;
        }
      },
      replyInsert(ino){
          this.$router.push({path : "reply",query : {ino:ino}})
      },
       async changeStatus(ono){
                if(this.orderStatus=='c2'){
                    if(confirm('주문을 확인하셨습니까?')){
                        let result = await axios.put(`/api/order/${this.orderStatus}/${ono}`).catch(err=>console.log(err));
                        if(result.data.affectedRows==1){
                            alert('상품준비중으로 변경되었습니다! ');
                            this.modalCheck = false;
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
                            this.modalCheck = false;
                            this.getOrderList();
                        }else{
                            alert('오류가 남');
                        }
                    }else{
                        alert('취소되었습니다')
                    }
                }
            },
      }
}
</script>
<style scoped>
  .vTable1{
    background-color: rgba(223, 255, 231, 0.735);
    border: 1px solid;
    z-index: 1;
    height: 280px;
  }
  .vTable2{
    background-color: rgba(231, 253, 255, 0.735);
    border: 1px solid;
    z-index: 1;
    height: 280px;
  }
  .vTable3{
    background-color: rgba(254, 255, 233, 0.735);
    border: 1px solid;
    z-index: 1;
    height: 280px;
  }
  .modal-wrap {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
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
    width: 1200px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  .modalPop{
    z-index: 1000;
    border: 1px solid;
  }

  .modal-btn button{
    z-index: 1000;
    margin: 10px;
    padding : 5px;
  }
.table{
  width: 250px;
  text-align: center;
  font-size: 18px;
    /* border: 1px solid;
    background-color: rgb(255, 255, 255); */
    /* position: fixed;
    z-index: 10;
    bottom: 0;
    right: 0; */
}
.toDo{
  float: right;
  background-color: black;
  position: fixed;
  top: 30px;
  right: 20px;
  text-align: center;
  z-index: 10;
}
.chart{
  position: relative;
  margin: auto;
}
.chars{
  top: 50px;
  margin: auto;
  width: 1200px;
  height: 400px;
}
</style>