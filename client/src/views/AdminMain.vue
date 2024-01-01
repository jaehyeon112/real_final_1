<template>

  <div class="container-fluid" style:width="50px">
    <div class="row">
      <side/>
      
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <v-card flat title="최근 주문내역">
    <v-table fixed-header height="250px" class="vTable1">
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
            주문상태<icon v-show="alarm=='주문완료'" @click="show"/>
          </th>
          <th class="text-left">
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
          <td v-if="order.order_status=='c2'">상품준비중</td>
          <td v-if="order.order_status=='c3'">출고완료</td>
          <td v-if="order.order_status=='c1'"><button>상품 준비완료</button></td>
          <td v-else-if="order.order_status=='c2'"><button>상품 출고하기</button></td>
          <td v-else><button>배송 조회</button></td>
        </tr>
      </tbody>
    </v-table>
    </v-card>
    <br>
    <v-card flat title="최근 리뷰 신고내역"></v-card>
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
            신고상태
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
          <td>{{ $dateFormat(review.review_date,'yyyy년 MM월 dd일') }}</td>
          <td>{{ review.report_status }}</td>
        </tr>
      </tbody>
    </v-table>
    <br>
    <v-card flat title="최근 문의내역"></v-card>
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
            문의 상태<icon @click="show2" v-show="inquires=='답변 대기 중'"/>
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
          <td v-else-if="inquire.inquire_category=='j1'">환불문의</td>
          <td v-else>기타문의</td>
          <td>{{ $dateFormat(inquire.create_date,'yyyy년 MM월 dd일') }}</td>
          <td v-if="inquire.answer_state==0">{{this.inquires='답변 대기 중'}}</td>
          <td v-else-if="inquire.answer_state==1">답변완료</td>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        </div>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-area me-1"></i>
                                        최근 3개월 매출내역
                                    </div>
                                    <div style="width: 600px;height: 600px;"><canvas id="myChart"></canvas></div>
                                </div>
                            </div>
   
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-bar me-1"></i>
                                        새로운 회원
                                    </div>
                                    <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>

                                </div>
                            </div>
                        </div>

    </main>
  </div>
</div>
</template>

<script>
import list from '../components/admin/List.vue';
import side from '../components/admin/SideBar.vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
import icon from '../components/admin/icon.vue';
  export default {
    data(){
      return{
        count : 0,
        count2 : 0,
        alarm : false,
        inquires : false,
        months : [this.dateFormat()-2+'월',this.dateFormat()-1+'월',this.dateFormat()+'월'],
        datas : [],
        orderList : [],
        reviewList : [],
        inquireList : []
      }
    },
    components : {
      side,
      list,
      icon
    },
    created(){
      this.getSum();
      this.getOrderList();
      this.getReviewList();
      this.getInquireList();
    },
    watch : {
      datas : function(){
        this.getSum();
      }
    },
    mounted(){
            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels : this.months,
                datasets: [{
                    label : '최근 3개월 매출액',
                    data: this.datas.sum,
                    // backgroundColor: [
                    //     'rgb(255, 99, 132)',
                    //     'rgb(54, 162, 235)',
                    //     'rgb(255, 205, 86)'
                    // ],
                    //hoverOffset: 3
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1    //선을 부드럽게
                }]
            },
            options : {
              scales: {
                xAxes: [{
                  ticks: {
                    min: 0,
                    stepSize : 100000,
                    fontSize : 18,
                  }
                }]
			        }
            }
            })
            myChart;
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
       async getOrderList(){
        let result = await axios.get('/api/order').catch(err=>console.log(err));
        this.orderList = result.data;
        for(let i=0;i<result.data.length;i++){
          if(result.data[i].order_status=='c1'){
            this.count = this.count+1;
          }
        }
       },
       show(){
        alert('현재 새로운 주문건은 '+this.count+'건입니다')
       },
       show2(){
        alert('현재 새로운 문의내역은 '+this.count2+'건입니다')
       },
       async getReviewList(){
        let result = await axios.get('/api/review').catch(err=>console.log(err));
        this.reviewList = result.data;
       },
       async getInquireList(){
        let result = await axios.get('/api/inquire').catch(err=>console.log(err));
        this.inquireList = result.data;
        for(let i=0;i<result.data.length;i++){
          if(result.data[i].answer_state=='0'){
            this.count2 = this.count2+1;
          }
        }
       }
      }
}
</script>
<style scoped>
  .vTable1{
    background-color: rgba(223, 255, 231, 0.735);
    border: 1px solid;
  }
  .vTable2{
    background-color: rgba(231, 253, 255, 0.735);
    border: 1px solid;
  }
  .vTable3{
    background-color: rgba(254, 255, 233, 0.735);
    border: 1px solid;
  }
</style>