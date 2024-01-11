<template>
    <div class="container">
        <div class="row">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center table-warning">카테고리</th>
                        <td scope="col" class="text-center " v-if="inquireInfo.inquire_category=='j1'">상품문의</td>
                        <td  scope="col" class="text-center " v-else-if="inquireInfo.inquire_category=='j2'">배송문의</td>
                        <td  scope="col" class="text-center " v-else-if="inquireInfo.inquire_category=='j3'">환불문의</td>
                        <td  scope="col" class="text-center " v-else>기타문의</td>
                        <th scope="col" class="text-center table-warning">작성일</th>
                        <td scope="col" class="text-center">{{ $dateFormat(inquireInfo.create_date,'yyyy년 MM월 dd일')}}</td> <!--$DateFormat-->
                        <th scope="col" class="text-center table-warning">주문상세번호</th>
                        <td scope="col" class="text-center">{{ inquireInfo.order_detail_no }}</td>
                    </tr>

                    <tr>
                        <th colspan="2" class="text-center table-primary">제목</th>
                        <td colspan="4">{{ inquireInfo.inquire_title }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" class="text-left" valign="top" height="200">
                            <pre
                                style="white-space: pre-wrap;border:none;background-color: white;">{{ inquireInfo.inquire_content }}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-left" valign="top" height="200">
                            <pre
                                style="white-space: pre-wrap;border:none;background-color: white;"></pre>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td colspan="6" class="text-center">
                            <button class="btn btn-xs btn-info" @click="goToUpdateForm(inquireInfo.inquire_no)">수정</button>클릭 이벤트는 이벤트객체가 넘어온다~ 근데 그게 필요없다그래서 뭘 받아올지 명시하는게 필요하다
                        </td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    <div class="row">
        <!--해당 게시글의 댓글이 있다면-->
            <replyList v-if="inquireInfo.answer_state == 1 " v-bind:ino ="inquireInfo.inquire_no" />

        <!--해당 게시글의 댓글이 존재하지 않는다면-->
             <div v-else class="card text-center">
                아직 미답변 상태입니다 
                빠른 시일내 답변 드립니다
                잠시만 기다려주세요....
             </div>   
    </div>    
    </div>
</template>
<script>
import axios from 'axios';
import replyList from'@/components/common/replyList.vue'; //자식 컴포넌트라 임포트 
//댓글이 있을때만 axios를 불러와라 그게 효율적
export default {
    data() {
        return {
            searchNo: '',
            inquireInfo: {}
        };
    },
    components : {
        replyList
    },
    created() { 
        this.searchNo = this.$route.query.inquireNo;
        this.getInquireInfo();
    },
    methods: {
        async getInquireInfo() {
            console.log("인포"+this.searchNo)
           let result = await axios.get(`/api/inquire/${this.searchNo}`) //sql.js 단건조회 경로 그대로 가져오기 api붙여주는 이유 proxy와 관련
                                    .catch(err=>{
                                        console.log(err)
                                    })      
            this.inquireInfo =result.data[0];
            console.log(this.inquireInfo)                 
            console.log(result.data)                 
        },
        
        goToUpdateForm(no) { //단건조회랑 수정을 같이 쓰는 이유 //vue에서 얘는 페이지가 바뀌는거다 데이터 불러오는 서버통신은 그 후의 문제다 페이지 바뀌는거 때문에 axios안쓴다
            this.$router.push({path: '../inquireForm', query:{inquireNo: no}})
        }
    }
}
</script>

<style scoped>
th{
    background-color: #FFA726;
}
</style>