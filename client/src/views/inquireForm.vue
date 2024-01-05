<template>
    <div class="container">
        <form @submit.prevent >
            <h2 v-if="inquireInfo.review_no > 0 ">문의수정</h2>
            <h2 v-else>1:1문의</h2>
            <label for="detailNo">주문상세번호</label>
            <input type="text" id="detailNo"  v-model="inquireInfo.order_detail_no" readonly>

            <label for="detailNo">문의 카테고리</label>
            <v-select label="category" :items="items" :item-props="itemProps" v-model="inquireInfo.inquire_category"></v-select>

            <label for="title">제목</label>
            <input type="text" id="title"  v-model="inquireInfo.inquire_title">

            <label for="content">내용</label>
            <textarea id="content" style="height:200px" v-model="inquireInfo.inquire_content"></textarea>

            <label for="regdate">작성일자</label>
            <input type="regdate" id="regdate" v-model="inquireInfo.create_date" readonly > <!--model필드명 칼럼명이랑 일치-->
            <div>
                <uploads/>
            </div>
            <button type="button" class="btn btn-xs btn-info" @click="isUpdated? inquireUpdate() :inquireInsert()" >문의하기</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';
import uploads from '../components/menu/upload.vue'

export default {
    data() {
        return {
            detailNo: '',
            reviewNo:'',
            inquireInfo: {
                inquire_no : '',
                user_id:'',
                inquire_title : '',
                inquire_content : '',
                inquire_category:'',
                create_date:'',
                answer_state:'',
                order_detail_no: '',
            },
            isUpdated:false,
            items: [
        {
          category: '상품문의',
          explanation: '상품불량, 상품유효기간',
        },
        {
          category: '배송문의',
          explanation: '배송일정, 배송비, 산간지역 문의',
        },
        {
          category: '환불문의',
          explanation: '환불기간, 환불가능여부',
        },
        {
          category: '기타문의',
          explanation: '그 외의 사항에 대하여...',
        }
      ],

        };
    },
    components:{
        uploads
    },
    created() {
        this.inquireNo = this.$route.query.inquireNo; //마이페이지 문의조회시 눌러서 가져오는 값
        this.detailNo = this.$route.query.detailNo;//주문상세에서 문의시 가져올 주문번호
        if(this.inquireNo > 0){
            //수정
            this.isUpdated = true;
            this.getInquireInfo(); //날짜포맷 중요함 출력할때 뒤에 시간도 같이 나와서 화면에 안나올거임
            
        }else{
            //등록
            this.inquireInfo.order_detail_no = this.detailNo
            this.inquireInfo.create_date = this.getToday();
        }       
    },
    methods: {
        itemProps (item) {
        return {
          title: item.category,
          subtitle: item.explanation,
        }
        },
        async getInquireInfo() {
           let result = (await axios.get(`/api/inquireInfo/${this.$store.state.user.user_id}/${this.inquireNo}`) //sql.js 단건조회 경로 그대로 가져오기 api붙여주는 이유 proxy와 관련
                                    .catch(err=>{console.log(err)}))
                                    
            
            this.inquireInfo=result.data
            this.inquireInfo.create_date = this.$dateFormat(this.inquireInfo.create_date,'yyyy년MM월dd일')
            console.log(this.inquireInfo)
            console.log(this.inquireInfo.create_date )  
                          
        },
        getToday(){
            return this.$dateFormat('','yyyy년MM월dd일');
        },
        async inquireInsert(){

            if(this.inquireInfo.inquire_category.category == '상품문의'){
                this.inquireInfo.inquire_category = 'j1'
            }else if(this.inquireInfo.inquire_category.category == '배송문의'){
                this.inquireInfo.inquire_category = 'j2'
            }else if(this.inquireInfo.inquire_category.category == '환불문의'){
                this.inquireInfo.inquire_category = 'j3'
            }else{
                this.inquireInfo.inquire_category = 'j4'
            }

            let obj ={
                param: {
                   
                    user_id:this.$store.state.user.user_id,
                    inquire_title:this.inquireInfo.inquire_title,
                    inquire_content:this.inquireInfo.inquire_content,
                    inquire_category:this.inquireInfo.inquire_category,
                    answer_state:this.inquireInfo.answer_state = 0,
                    order_detail_no: this.detailNo,
                
                }
       
            } 
            let result = await axios.post('/api/inquire', obj) 
                                     .catch(err=>console.log('문의등록오류'+err))
                                    
            if(result.data.insertId>0){ //글번호는 자동으로 부여되니까 obj에서 주는게 아니라 따로 빼서 
                alert('등록완료');
                this.inquireInfo.no = result.data.insertId; //여기에 data가 있고 없고 차이는..?
                this.$router.push({path:'myPage/myInquire'})
            }                         
        },
        async inquireUpdate(){
                if(inquireInfo.answer_state ==1){

                }else{
                    let obj ={
                        param: {
                            
                            user_id:this.$store.state.user.user_id,
                            inquire_title:this.inquireInfo.review_title,
                            inquire_content:this.inquireInfo.inquire_content,
                            inquire_category:this.inquireInfo.inquire_category,
                            create_date:this.inquireInfo.create_date,
                            order_detail_no: this.detailNo,
                
                        }
                    }
                    let result = await axios.put(`/api/inquireUpdate/${this.$store.state.user.user_id}/${this.inquireNo}`, obj) 
                                            .catch((err=>console.log(err))) 
                    if(result.data.affectedRows > 0){
                        alert('수정완료');
                        this.$router.push({path:'myPage/myInquire'})
                        }                        
                
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
