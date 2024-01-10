<template>
    <list>
        <template #title>신고된 리뷰목록</template>
        <template #searchData>
            <div style="width: 250px;float: right;"><v-select
            label="신고처리상태"
            :items="['신고처리중','신고처리완료','신고처리반려']"
            v-model = reason
            variant="underlined"
            return-object
            ></v-select><v-btn @click="refresh">초기화</v-btn></div>
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>신고 날짜</th>
                <th>신고번호</th>
                <th>리뷰번호</th>
                <th>신고사유</th>
                <th>신고한 회원</th>
                <th>신고상태</th>
                <th>신고당한 횟수</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="review in reportList">
            <td>{{ $dateFormat(review.report_date,'yyyy년 MM월 dd일') }}</td>
            <td>{{ review.report_no }}</td>
            <td>{{ review.review_no }}</td>
            <td v-if="review.report_reason=='q1'">욕설 및 비방</td>
            <td v-if="review.report_reason=='q2'">광고성 리뷰</td>
            <td>{{ review.user_id }}</td>
            <td v-if="review.report_status=='p1'">신고처리중</td>
            <td v-else-if="review.report_status=='p2'">신고처리완료</td>
            <td v-else-if="review.report_status=='p3'">신고반려</td>
            <td>{{ review.cnt }}</td>
            <td ><v-btn type="button" @click="this.reviewNo = review.review_no,this.oneReview(),this.state = review.report_status,this.modalCheck=true">상세보기</v-btn></td>
        </tr>
      </tbody>
      <tbody v-if="reportList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td></td><td><h3>존재하는 신고 리뷰건이 없습니다</h3></td></tr>
        </tbody>
        <v-container>
            <page ref="pagination1" @changePage="changePage" :list="totalList" :totals="10"></page>
        </v-container>
        <div class="modal-wrap" v-show="modalCheck" @click="modalOpen">
        <div class="modal-container" @click.stop="">
          <h3>리뷰신고건 상세내역</h3>
          <div class="modalPop">
            <p>리뷰번호 : {{ reviewNo }}</p>
            <p>작성자 : {{ userId }}</p>
            <div style="width: 500px;">
                <v-textarea v-model = "content" type="text" label="리뷰내용" variant="outlined" readonly></v-textarea>
            </div>
          </div>
          <div class="modal-btn">
              <v-btn style="border-radius: 10px;" @click="modalCheck = false">닫기</v-btn>
              <v-btn v-if="this.state=='p1'" style="border-radius: 10px;" @click="changeState('p3')">신고 반려</v-btn>
              <v-btn v-if="this.state=='p1'"  style="border-radius: 10px;" @click="changeState('p2')">신고 승인</v-btn>
          </div>
        </div>
      </div>
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
                reportList : [],
                reason : '',
                reasons : '',
                modalCheck: false,
                startNum : 0,
                totalList: "",
                state : 'p1',
                reviewNo : '',
                userId : '',
                content : ''
            }
        },
        components : {
        list,
        page
        },
        created(){
            window.scrollTo(0, 0);
            this.total();
            this.getReportList(this.startNum);
        },
        methods : {
            async total() {
                let total = await axios.get(`/api/report`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getReportList(no){
                let result = await axios.get(`/api/report/${no}`).catch(err=>console.log(err));
                this.reportList = result.data;
                this.total();
            },
            async oneReview(){
                let result = await axios.get(`/api/Onereview/${this.reviewNo}`).catch(err=>console.log(err));
                console.log(result.data[0])
                this.userId = result.data[0].user_id;
                this.content = result.data[0].review_content;
            },
            async changePage(no) {
                if(this.reason==''){
                    this.getReportList(no)
                }else if(this.reason!=''){
                    this.reasonList(this.reason,no);
                }
            },
            refresh(){
                this.reason = '';
            },
            async reasonList(re,no){
                if(re=='신고처리중'){
                    re='p1'
                }else if(re=='신고처리완료'){
                    re='p2'
                }else if(re=='신고처리반려'){
                    re='p3'
                }
                console.log(re)
                if(re==''){
                    this.getReportList(this.startNum);
                }else{
                    let total = await axios.get(`/api/reports/${re}`).catch(err=>console.log(err));
                    let list = await axios.get(`/api/reports/${re}/${no}`).catch(err=>console.log(err));
                    this.totalList = total.data;
                    this.reportList = list.data;
                }
            },
            async changeState(state){
                let result = await axios.put(`/api/report/${state}/${this.reviewNo}`).catch(err=>console.log(err));
                if(result.data.affectedRows>0){
                    alert('처리가 완료되었습니다');
                    this.modalCheck = false;
                    this.getReportList(this.startNum);
                }else{
                    alert('실패')
                }
            }
        },
        watch : {
            reason(){
                this.reasonList(this.reason,this.startNum)
            }
        }
        
    }
</script>
<style scoped>
.modal-wrap {
    z-index: 100;
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
    text-align: center;
    left: 100px;
  }
  v-btn{
    border-radius: 10px;
  }
</style>