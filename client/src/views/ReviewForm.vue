<template>
    <div class="container">
        <form @submit.prevent >
            <h2 v-if="reviewInfo.review_no > 0 ">리뷰수정</h2>
            <h2 v-else>리뷰등록</h2>
            <label for="detailNo">주문상세번호</label>
            <input type="text" id="detailNo"   v-model="reviewInfo.detail_order_no" readonly>

            <label for="title">제목</label>
            <input type="text" id="title"  v-model="reviewInfo.review_title">

             <label for="grade">평점</label>
            <div> <v-rating  hover :length="5" :size="67" v-model="reviewInfo.review_grade" color="deep-purple-lighten-1" active-color="deep-purple-lighten-1"  label="별점(5점 만점)"/></div>
               

            <label for="content">내용</label>
            <textarea id="content" style="height:200px" v-model="reviewInfo.review_content"></textarea>

            <label for="regdate">작성일자</label>
            
            <input type="regdate" id="regdate" v-if="reviewInfo.review_no > 0" v-model="reviewInfo.review_updatedate" readonly > <!--model필드명 칼럼명이랑 일치-->
            <input type="regdate" id="regdate" v-else v-model="reviewInfo.review_writedate" readonly >

            <label for="File input">이미지 첨부</label>
            
            <div class="col-12">
                  <label for="stock" class="form-label">첨부파일</label>
                  <div :key="i" v-for="i in nums" style="width: 500px;">
                    <uploads :numbers=this.nums @info="info" @text="text"/>
                    <v-btn v-show="this.nums==i" @click="this.nums=this.nums+1">+</v-btn><v-btn v-show="this.nums==i&&this.nums!=1" @click="this.nums=this.nums-1">-</v-btn>
                  </div>
                  <div :key= idx v-for="idx in file">첨부파일 : {{ idx }}<p @click="delMultiple(idx)">삭제</p></div>
                  <div :key=idx v-show="open==true" v-for="idx in photo"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"><p @click="delPhoto(idx)">삭제</p></div>
                  <v-btn @click="showing" v-show="photo.length>0">사진보기</v-btn> <!-- <v-btn @click="uploadPhoto">저장완료</v-btn> -->
                </div>
            <button type="button" class="btn btn-xs btn-info" @click="isUpdated? reviewUpdate() :reviewInsert()" >저장</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';
import uploads from "@/components/menu/upload.vue";
export default {
    data() {
        return {
            detailNo: '',
            reviewNo:'',
            reviewInfo: {
                review_no : '',
                detail_order_no: '',
                review_title : '',
                review_grade:5,
                review_content : '',
                review_writedate : '',
                review_updatedate:'',
                like_cnt:''
            },
            point: {
                point_no : '',
                order_detail_no:'',
                user_id:'',
                
            },
            isUpdated : false,
           
            photo : [],
        file : [],
        open : false,
        ods : '',
        nums : 1,
        };
    },
    components :{ 
                 uploads
                },
    created() {
        this.reviewNo = this.$route.query.reviewNo; //마이페이지 리뷰수정 눌러서 가져오는 값
        this.detailNo = this.$route.query.detailNo;//주문상세에서 리뷰등록시 가져올 주문번호
        if(this.reviewNo > 0){
            //수정
            this.isUpdated = true;
            this.getReviewInfo(); //날짜포맷 중요함 출력할때 뒤에 시간도 같이 나와서 화면에 안나올거임
            console.log(this.reviewNo)
        }else{
            //등록
            this.reviewInfo.detail_order_no = this.detailNo
            this.reviewInfo.review_writedate = this.getToday();
        }       
    },
    methods: {
        async getReviewInfo() {
           let result = await axios.get(`/api/myReview/${this.reviewNo}`) //sql.js 단건조회 경로 그대로 가져오기 api붙여주는 이유 proxy와 관련
                                    .catch(err=>{console.log(err)})
                                    
            
            this.reviewInfo=result.data[0]     
            this.reviewInfo.review_updatedate = this.$dateFormat(this.reviewInfo.review_updatedate,'yyyy년MM월dd일')
            this.reviewInfo.review_writedate = this.$dateFormat(this.reviewInfo.review_writedate,'yyyy년MM월dd일')
            console.log(this.reviewInfo)
            console.log(this.reviewInfo.review_updatedate )  
                          
        },
        getToday(){
            return this.$dateFormat('','yyyy년MM월dd일');
        },
        async reviewInsert(){
         
            let obj ={
                param: {
                    detail_order_no: this.detailNo,//this.reviewInfo.detail_order_no,
                    user_id:this.$store.state.user.user_id,
                    review_title:this.reviewInfo.review_title,
                    review_content:this.reviewInfo.review_content,
                    review_grade:this.reviewInfo.review_grade,
                    like_cnt :0,
                    report_cnt : 0
                }
            }
            let obj2={
               param: {
                 
                 order_detail_no:this.detailNo,
                //  user_id:this.reviewInfo.user_id, 
                //  point_history:'리뷰등록',
                //  point_save : 500, 
                //  point_use: 0,
                 //point_date =current_date(), 
                 //end_point_date = date_add(current_date(), interval 1 Year)
                }
            }
             let result = await axios.post('/api/reviewInsert', obj) //sql에서 두번째로 넘어오는 데이터(body.param)를 obj에 넣는다 
                                     .catch(err=>console.log('리뷰등록오류'+err))
             let point = await axios.post(`/api/reviewPoint`,obj2)
                                    .catch(err=>console.log('포인트오류 '+err))
             let points = await axios.put(`/api/reviewPointUp`)
                                     .catch(err=>console.log("업데오류"+err))                                                                
            if(result.data.insertId>0){ //글번호는 자동으로 부여되니까 obj에서 주는게 아니라 따로 빼서 
                alert('등록완료' + '=>리뷰 500포인트 적립');
                console
                this.reviewInfo.review_no = result.data.insertId;
                console.log('등록번호' +result.data.insertId) //여기에 data가 있고 없고 차이는..?
                this.point_no = point.data.insertId;
                this.$router.push({path:'myPage/myReview'})
            }
            for(let i=0;i<this.photo.length;i++){
                  this.ods = 's'+i
                  let ph = {
                    param : {
                      "file_category" : 'r2',
                      "file_name" : this.photo[i],
                      "orders" : this.ods,
                      "review_no" : this.reviewInfo.review_no,
                      "path" : 'uploads\\'+this.photo[i]
                    }
                  }
                  let result1 = axios.post("/api/photo",ph).catch(err=>console.log(err));
                  console.log(result1)
                  alert('테이블ㅇㅔ 추가');
                }
                this.$router.push({path : "myPage/myReview"})
            },
            info(data){
            for(let i=0;i<data.length;i++){
              this.photo.push(data[i]);
            }
        },
        text(data){
            for(let i=0;i<data.length;i++){
              this.file.push(data[i]);
            }
        },
        showing(){
            if(this.open == true){
              this.open = false;
            }else if(this.open == false){
              this.open = true;
            }
        },
        getPath(name){
            return `/api/fileCall/${name}`;
        },
        delMultiple(name){
            for(let i = 0; i < this.file.length; i++) {
                if(this.file[i] === name)  {
                    this.file.splice(i, 1);
                    i--;
                }
            }
        },
        delPhoto(name){
            for(let i = 0; i < this.photo.length; i++) {
                if(this.photo[i] === name)  {
                    this.photo.splice(i, 1);
                    i--;
                }
            }               
        },
        async reviewUpdate(){
            let obj ={
                param: {
                    detail_order_no: this.detailNo,
                    user_id:this.$store.state.user.user_id,
                    review_title:this.reviewInfo.review_title,
                    review_content:this.reviewInfo.review_content,
                    review_grade:this.reviewInfo.review_grade,
                    //review_updatedate:this.reviewInfo.review_updatedate
                }
            }
            let result = await axios.put(`/api/reviewUpdate/${this.reviewNo}`, obj) //얘는 왜 searchNo아니고..?
                                    .catch((err=>console.log(err))) //수정된 정보를 저장한다
            if(result.data.affectedRows > 0){
                alert('수정완료');
                this.$router.push({path:'myPage/myReview'})
            }                        
            
        },

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
