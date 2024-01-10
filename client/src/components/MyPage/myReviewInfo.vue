<template>
    <div class="container">
        <div class="row">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center table-primary">주문번호</th>
                        <td scope="col" class="text-center">{{ reviewInfo.detail_order_no }}</td>
                        <th scope="col" class="text-center table-primary">작성일</th>
                        <td scope="col" class="text-center">{{ $dateFormat(reviewInfo.review_no,'yyyy년MM월dd일')}}</td> <!--$DateFormat-->
                        <th scope="col" class="text-center table-primary">평점</th>
                        <td scope="col" class="text-center">{{ reviewInfo.review_grade }}</td>
                    </tr>

                    <tr>
                        <th colspan="2" class="text-center table-primary">제목</th>
                        <td colspan="4">{{ reviewInfo.review_title }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" class="text-left" valign="top" height="200">
                            <pre
                                style="white-space: pre-wrap;border:none;background-color: white;">{{ reviewInfo.review_content }}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-center">
                            <button class="btn btn-xs btn-info" @click="goToUpdateForm(reviewInfo.review_no)">수정</button><!-- 클릭 이벤트는 이벤트객체가 넘어온다~ 근데 그게 필요없다그래서 뭘 받아올지 명시하는게 필요하다-->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchNo: '',
            reviewInfo: {}
        };
    },
    created() {
        this.searchNo = this.$route.query.reviewNo;
        this.getReviewInfo();
    },
    methods: {
        async getReviewInfo() {
           let result = await axios.get(`/api/myReview/${this.searchNo}`) //sql.js 단건조회 경로 그대로 가져오기 api붙여주는 이유 proxy와 관련
                                    .catch(err=>{
                                        console.log(err)
                                    })      
            this.reviewInfo =result.data[0]                          
        },
        goToUpdateForm(reviewNo){// 여기 변수는..? value(필드명)
            this.$router.push({path : '/reviewForm', query : {reviewNo : reviewNo}});//{키:필드명}
        },
    }
}
</script>
<style scoped>
th{
    background-color: #FFA726;
}
</style>
