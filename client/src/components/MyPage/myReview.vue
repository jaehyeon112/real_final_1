<template>
    <div >
        <br>
        <br>
        <br>
        <br>
        <div v-if="reviewList.length != 0">
            <table class="table ">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>제목</th>
                        <th>상세주문번호</th>
                        <th>내용</th>
                        <th>평점</th>
                        <th>작성일자</th>
                        <th>좋아요</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  :key="i" v-for="(review, i) in reviewList" @click="goToDetail(review.review_no)">
                        <td>{{ review.review_no}}</td>
                        <td class="cur" >{{ formatText(review.review_title ) }}</td>
                        <td>{{ review.detail_order_no}}</td>
                        <td class="cur" >{{ formatText(review.review_content) }}</td>
                        <td>{{ review.review_grade }}</td>
                        <td>{{ $dateFormat(review.review_writedate,'yyyy년MM월dd일') }}</td>
                        <td>{{ review.like_cnt}}</td>
                        <td><v-btn  @click.stop="deleteReview(review.review_no)" >리뷰삭제</v-btn></td>
                    </tr>
                </tbody>
            </table>
            <v-container>
                <page ref="pagination1" @changePage="changePage" :list="totalList" :totals="5"></page>
            </v-container>
        </div>
        <p v-else>등록된 리뷰가 없습니다</p>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            reviewList : [],
            totalList : '',
            starNo : 0
        };
    },
    created(){
        this.total()
        this.getReviewList(this.starNo);
    },
    methods : {
        async total(){
            let datas = (await axios.get(`/api/myReviews`)
                                   .catch(err => console.log(err))).data;
                                   this.totalList = datas;
                                   console.log(datas)
        },
        async getReviewList(no){
            
            this.reviewList = (await axios.get(`/api/myReviews/${no}`)
                                   .catch(err => console.log(err))).data;
                                   this.total();
        },
        
        async deleteReview(no){
        let data = await axios.delete(`/api/deleteReview/${no}`)
                              .catch(err=>console.log(err));
        // let point = await axios.post(`/api/deleteRPoint/`)                      
        //           if(data.data.affectedRows>0){                        
        //              alert('리뷰가 삭제되었습니다')
        //              this.getReviewList();
        //           }
      },goToDetail(reviewNo){
            this.$router.push({path :'myReviewInfo', query : {reviewNo : reviewNo}});
        },   
        formatText(text) {
      const maxLength = 10;
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...더보기';
      }
      return text;
    } ,
    async changePage(no) {
        this.getReviewList(no)
    }
}
}
</script>

<style scoped>
table *{
        text-align: center;
}
   
th{
    background-color: #FFA726;
}
.cur{
    cursor: pointer;
}

</style>
