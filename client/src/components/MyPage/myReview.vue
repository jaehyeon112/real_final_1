<template>
    <div class="container">
       
        <div v-if="reviewList.length != 0">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>제목</th>
                        <th>상세주문번호</th>
                        <th>내용</th>
                        <th>평점</th>
                        <th>작성일자</th>
                        <th>좋아요</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  :key="i" v-for="(review, i) in reviewList">
                        <td>{{ review.review_no}}</td>
                        <td>{{ review.review_title  }}</td>
                        <td>{{ review.detail_order_no}}</td>
                        <td>{{ review.review_content }}</td>
                        <td>{{ review.review_grade }}</td>
                        <td>{{ $dateFormat(review.review_writedate,'yyyy년MM월dd일') }}</td>
                        <td>{{ review.like_cnt}}</td>
                        <td><v-btn  @click="goToUpdate(review.review_no)" >리뷰수정</v-btn></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-else>등록된 리뷰가 없습니다</p>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            reviewList : []
        };
    },
    created(){
        this.getReviewList();
    },
    methods : {
        async getReviewList(){
            let member_id = this.$store.state.user.user_id;
            this.reviewList = (await axios.get(`/api/myReview/${member_id}`)
                                   .catch(err => console.log(err))).data;
        },
        goToUpdate(reviewNo){// 여기 변수는..? value(필드명)
            this.$router.push({path : '/reviewForm', query : {reviewNo : reviewNo}});//{키:필드명}
        },
    }
}
</script>
<style scoped>
    table *{
        text-align: center;
    }
</style>
