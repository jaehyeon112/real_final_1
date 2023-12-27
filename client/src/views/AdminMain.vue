<template>
  <div class="container-fluid" style:width="50px">
  <div class="row">
  <side/>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div class="container-fluid px-4">
        <div class="row">
          <div class="container">
            <div class="card bg-primary text-white mb-4">
              <div class="card-body">최근 들어온 주문내역</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>주문 번호</th>
                        <th>주문 회원</th>
                        <th>결제 금액</th>
                        <th>주문 날짜</th>
                        <th>주문 상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1111</td>
                        <td>test</td>
                        <td>100,000원</td>
                        <td>2023-12-12</td>
                        <td>결제 완료</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="card bg-warning text-white mb-4">
                <div class="card-body">신고된 리뷰</div>
                  <div class="card-footer d-flex align-items-center justify-content-between">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>리뷰 번호</th>
                            <th>신고자</th>
                            <th>신고 사유</th>
                            <th>신고처리 상태</th>
                            <th>신고 횟수</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1234</td>
                            <td>test</td>
                            <td>부적절한 단어 사용</td>
                            <td>대기 중</td>
                            <td>첫신고</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">미답변 문의리스트</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                      <table class="table">
                                          <thead>
                                            <tr>
                                              <th>주문 번호</th>
                                              <th>주문 회원</th>
                                              <th>결제 금액</th>
                                              <th>주문 날짜</th>
                                              <th>주문 상태</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>1111</td>
                                              <td>test</td>
                                              <td>100,000원</td>
                                              <td>2023-12-12</td>
                                              <td>결제 완료</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
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
                    </div>
      </div>

    </main>
  </div>
</div>
</template>
<script>
import side from '../components/SideBar.vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
  export default {
    data(){
      return{
        months : [this.dateFormat()-2+'월',this.dateFormat()-1+'월',this.dateFormat()+'월'],
        datas : []
      }
    },
    components : {
      side
    },
    created(){
      this.getSum();
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
       }
      }
}
</script>