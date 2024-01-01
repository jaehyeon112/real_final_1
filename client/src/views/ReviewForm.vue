<template>
    <div class="container">
        <form @submit.prevent >
            <h2 v-if="reviewInfo.no >0 ">리뷰수정</h2>
            <h2 v-else>리뷰등록</h2>

            <label for="title">주문상세번호</label>
            <input type="text" id="title"  v-model="reviewInfo.detail_order_no" readonly>

            <label for="title">제목</label>
            <input type="text" id="title"  v-model="reviewInfo.review_title">

            <label for="content">내용</label>
            <textarea id="content" style="height:200px" v-model="reviewInfo.review_content"></textarea>

            <label for="regdate">작성일자</label>
            <input type="text" id="regdate" v-model="reviewInfo.review_writedate" readonly > <!--model필드명 칼럼명이랑 일치-->

            <label for="image">이미지 첨부</label>

            <button type="button" class="btn btn-xs btn-info" @click="isUpdated? reviewUpdate() :reviewInsert()" >저장</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            orderNo: '',
            reviewNo:'',
            reviewInfo: {
                review_no : '',
                review_title : '',
                review_content : '',
                review_writedate : '',
            },
            isUpdated : false
        };
    },
    created() {
        this.reviewNo = this.$route.query.reviewNo; //마이페이지 리뷰수정 눌러서 가져오는 값
        this.orderNo = this.$route.query.orderNo;//주문상세에서 리뷰등록시 가져올 주문번호
        if(this.reviewNo > 0){
            //수정
            this.getReviewInfo(); //날짜포맷 중요함 출력할때 뒤에 시간도 같이 나와서 화면에 안나올거임
            this.isUpdated = true;
        }else{
            //등록
            this.reviewInfo.review_writedate = this.getToday();
        }       
    },
    methods: {
        async getReviewInfo() {
           let result = await axios.get(`api/reviews/${this.reviewNo}`) //sql.js 단건조회 경로 그대로 가져오기 api붙여주는 이유 proxy와 관련
                                    .catch(err=>{
                                        consoel.log(err)
                                    })      
            this.reviewInfo =result.data;
            this.reviewInfo.review_writedate = this.$dateFormat(this.reviewInfo.review_wirtedate)//화면에 보이는것만 하는게 아니라 보낼때도 포맷이 잘 되어야 한다 프로퍼티 자체를 변경하는거야  서버별로 날짜 취급이 달라서 중요함                       
        },
        getToday(){
            return this.$dateFormat('');
        },
        async reviewInsert(){
            let obj ={
                param: {
                    detail_order_no:this.orderNo,//this.reviewInfo.detail_order_no,
                    user_id:this.$store.state.user.user_id,
                    review_title:this.reviewInfo.review_title,
                    review_content:this.reviewInfo.review_content,
                    review_writedate:this.reviewInfo.review_writedate,
                    review_grade: 5,
                    like_cnt :0,
                    report_cnt : 0
                }
            }
             let result = await axios.post('/api/reviewInsert', obj) //sql에서 두번째로 넘어오는 데이터(body.param)를 obj에 넣는다 
                                     .catch(err=>console.log(err))
            if(result.data.insertId>0){ //글번호는 자동으로 부여되니까 obj에서 주는게 아니라 따로 빼서 
                alert('등록완료');
                this.reviewInfo.no = result.data.insertId; //여기에 data가 있고 없고 차이는..?
            }                         
        },
        async reviewUpdate(){
            let obj ={
                param: {

                    review_title:this.reviewInfo.review_title,
                    review_content:this.reviewInfo.review_content,
                    review_writedate:this.reviewInfo.review_writedate
                }
            }
            let result = await axios.put(`api/reviewUpdate//${this.reviewNo}`, obj) //얘는 왜 searchNo아니고..?
                                    .catch((err=>console.log(err))) //수정된 정보를 저장한다
            if(result.data.changedRows > 0){
                alert('수정완료');
            }                        
            
        }

    }
}
</script>
<style scoped>
/* Style inputs with type="text", select elements and textareas */
input[type=text], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */ 
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
button[type=button] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
button[type=button]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
