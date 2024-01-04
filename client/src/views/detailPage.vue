<template>
<section class="py-5" id="top">
   <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
         <div class="col-md-6">
            <b>이미지 삽입하는 곳</b>
            <h3>상세 이미지</h3>
            <b>상세이미지 삽입하는 곳</b>
         </div>
         <div class="col-md-6">
            <h1 class="display-4 fw-bolder">상품이름{{ 상품이름 }}</h1>
            <h1 class="display-7 fw-bolder">상품원가격{{ 상품가격 }}</h1>
            <div class="fs-5 mb-5">
                <br>
              <table class="table" border="1">
                <tr>
                    <th>판매자</th>
                    <td>최고다최고</td>
                </tr>
                <tr>
                    <th>원산지</th>
                    <td>정보{{ 원산지정보 }}</td>
                </tr>
                <tr>
                    <th>알레르기 정보</th>
                    <td>알레르기 정보 {{ 알레르기정보 }}</td>
                </tr>
              </table>
            </div>
            
            <div class="d-flex">
                <p>상품선택</p>
                <v-text-field>
                  <template v-slot:append>
                     <v-icon color="red">mdi-plus</v-icon>
                  </template>
                  <template v-slot:prepend>
                     <v-icon color="green">mdi-minus</v-icon>
                  </template>
                </v-text-field>
            </div>
            <div>
                <p class="lead">할인률</p>
                <p class="lead">할인률 적용된 가격</p>
            <br>
               <p style="margin-left:20px;margin-bottom:0;color:black">무료배송 (40,000원 이상 구매 시)</p>
               <br>
            </div>
            <div>
               <button @click="goToCart">장바구니 담기</button> <button @click="likes">♡</button>
            </div>
         </div>
      </div>
      <!--선택하는 바?-->
      <div class="container px-4 px-lg-5 my-5" style="text-align:center;">
         <a style="border: none; padding: 10px 50px; color: black; font-size: 18px"
            href="#detail">제품 정보</a>
         <a style="border: none; padding: 10px 50px; color: black; font-size: 18px"
            href="#review">상세정보</a>
            <a style="border: none; padding: 10px 50px; color: black; font-size: 18px"
            href="#qna">리뷰{{ count }}</a>
            <a style="border: none; padding: 10px 50px; color: black; font-size: 18px"
            href="#order">문의</a>
         <hr>
      </div>
      <!--상세정보?-->
         <div class="container px-4 px-lg-5 my-5" style="text-align:center;" id="detail">
            
         </div>
      <hr>

       <!--리뷰게시판  부분 -->
      <div id="review" class="reviewTable">
        <p> 베스트 리뷰</p>
        <p>리뷰 베스트 5 나열할 곳</p>
        <input :key="idx" v-for="(bestR, idx) in reviewList" type="file">
        <table class="table" border="1">
            <tr>
                <th>작성자</th>
                <th>리뷰제목</th>
                <th>리뷰내용</th>
                <th>평점</th>
                <th>작성일자</th>
                <th>추천</th>
                <th>신고</th>
            </tr>
            <tr :key="idx" v-for="(review, idx) in reviewList">
                <td> {{ review.user_id }}</td>
                <td> {{ review.review_title }}</td>
                <td> {{ review.review_content }}</td>
                <td> {{ review.review_grade }}</td>
                <td> {{ review.review_writedate }}</td>
                <td> <v-btn class="ma-2" variant="text" icon="mdi-thumb-up" color="blue-lighten-2"></v-btn>{{ review.like_cnt }}</td>
                <td> <v-btn class="ma-2" variant="text" icon="mdi-thumb-down" color="red-lighten-2"></v-btn>아이콘</td>
            </tr>
        </table>
       </div>
      <hr>
      <!-- 문의게시판 건드린 부분 -->
     
      <div id="qna" class="qnaTable">
        <table class="table" border="1">
            <tr>
                <th>No.</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>내용</th>
                <th>작성일자</th>
            </tr>
            <tr :key="idx" v-for="(inquire, idx) in inquireList">
                <td> {{ inquire.inquire_no }}</td>
                <td> {{ inquire.inquire_category }}</td>
                <td> {{ inquire.inquire_title }}</td>
                <td> {{ inquire.inquire_content }}</td>
                <td> {{ inquire.inquire_writedate }}</td>
                
            </tr>
        </table>
      </div>
      
      
      <!--주문정보 파트-->
      <div id="order">
         <div id="arrow"></div>
         <h2 id="text1">취소/교환/반품안내</h2>
         <ul>
            <li>주문취소는 '결제완료' 단계에서만 가능합니다.</li>
            <li>주문 내 일부 상품의 부분 취소는 불가능합니다.</li>
            <li>주문취소는 '마이페이지 > 주문내역 > 주문취소' 를 통해 직접 취소하실 수 있습니다.</li>
            <li>교환 및 반품은 배송 완료일 기준으로 1일 이내 신청 가능합니다.</li>
            <li>단순변심으로 인한 교환/반품은 고객님이 부담합니다.</li>
         </ul>
         <ul id="list" style="display:none">
            <li>제주, 도서산간 지역은 배송불가합니다.</li>
         </ul>
      </div>
      
   </div>
</section>
<!-- Related items section-->

</template>
<script>
import axios from'axios';

export default {
    data(){
        return{
            pno:'',
            reviewList:[],
            inquireList:[]
        }
    },
    created(){ 
      this.pno = this.$route.query.pno; 
      console.log('pno'+this.pno)
      this.getRivewList();
        
    },
    methods:{
        async getRivewList() {
            let list = await axios.get(`api/detailReview/${this.pno}`)
                                  .catch(err=>console.log(err));
            this.reviewList =list.data;
            console.log(this.reviewList)                      
        },
        
    }
}
</script>

<style>
   #arrow{
      position:relative;
      top:10px;
      width: 10px;
      height: 10px;
      border-top: 2px solid black;
      border-left: 2px solid black;
      transform:rotate(45deg);
      }
   #text1{
      position: relative;
      left: 20px;
      bottom: 10px;
      }
      
   #btn-back-to-top {
        display: none;
        position: fixed;
        bottom: 20px;
        right: 30px;
        z-index: 9999;
        border: none;
        outline: none;
        background-color: #555;
        color: white;
        cursor: pointer;
        padding: 15px;
        border-radius: 40%;
   }
   
   #btn-back-to-top:hover {
     background-color: #333;
   }
   #detail{
      overflow:scroll;
      height:1000px;
   }
   
   #more{
      border:none;
      width:45%;
      height:50px;
      background: #f4f4f4;
      color:grey;
   }
   #close{
      display:none;
      border:none;
      width:45%;
      height:50px;
      background: #f4f4f4;
      color:grey;
   }
   
   .reviewNoneToggle{
      display: none;
   }

   .off-screen {
   display: none;
}

#pagebtn {
   width: 500px;
   text-align: center;
   margin: 0 auto;
   height: 50px;
   line-height: 60px;
}

#pagebtn a {
   all: initial;
   display: inline-block;
   margin-right: 10px;
   border-radius: 3px;
   border: none;
   font-family: Tahoma;
   background: #f9fafe;
   color: #000;
   text-decoration: none;
   height: 40px;
   width: 40px;
   text-align: center;
   line-height: 40px;
   transition: all .5s;
}

#pagebtn a:hover {
   background-color: #6553C1;
}

#pagebtn a.active {
   background: #6553C1;
   color: #fff;
}
   
</style>