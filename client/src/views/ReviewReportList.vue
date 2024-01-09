<template>
    <list @changeemit="changeChildData">
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
            <td>{{ review.report_reason }}</td>
            <td>{{ review.user_id }}</td>
            <td v-if="review.report_status=='p1'">신고처리중</td>
            <td v-else-if="review.report_status=='p2'">처리완료</td>
            <td v-else-if="review.report_status=='p3'">신고반려</td>
            <td>{{ review.cnt }}</td>
            <td><v-btn type="button" @click="">상세보기</v-btn></td>
        </tr>
      </tbody>
      <tbody v-if="reportList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td></td><td><h3>존재하는 신고 리뷰건이 없습니다</h3></td></tr>
        </tbody>
      <div class="modal-wrap" v-show="modalCheck" @click="modalOpen">
      <div class="modal-container" @click.stop="">
        <h3>취소 사유를 입력해주세요</h3>
        <div class="modalPop">
            <v-select
            label="취소사유"
            :items="['물량부족','공급사 제작지연','기타']"
            v-model = reasons
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
                reportList : [],
                reason : '',
                reasons : '',
                modalCheck: false,
                nums : 0,
                startNum : 0,
                totalList: "",
                totals :'',
                orders : ''
            }
        },
        components : {
        list,
        page
        },
        created(){
            window.scrollTo(0, 0);
            this.total();
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
                let total = await axios.get(`/api/report`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getReportList(){
                let result = await axios.get(`/api/review/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                this.reportList = result.data;
            },
            async changePage(no) {
                let list = await axios.get(`/api/review/${no}/${this.nums}`).catch(err=>console.log(err));
                let result = list.data;
                this.reportList = result;
            },
            refresh(){
                this.reason = '';
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
                this.totals = childData;
            },
            async reasonList(re){
                if(re=='신고처리중'){
                    re='p1'
                }else if(re=='신고처리완료'){
                    re='p2'
                }else if(re=='신고처리반려'){
                    re='p3'
                }
                console.log(re)
                if(re==''){
                    this.getReportList();
                }else{
                    let list = await axios.get(`/api/review/${re}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                    let result = list.data;
                    console.log(result)
                    this.reportList = result;
                }
            }
        },
        watch : {
            nums(){
                this.getReportList();
            },
            orders(){
                this.orderState(this.orders);
            },
            reason(){
                this.reasonList(this.reason);
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