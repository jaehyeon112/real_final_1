<template>
   <div>
      <section class="py-5" id="top">
         <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
               <div class="col-md-6">
                  <b>이미지 삽입하는 곳</b>
                  <h3>상세 이미지</h3>
                  <b>상세이미지 삽입하는 곳</b>
               </div>
               <div class="col-md-6">
                  <h1 class="display-5 fw-bolder">상품이름{{ productInfo.prod_name }}</h1>
                  <h1 class="display-7 fw-bolder">상품원가격{{ productInfo.price }}</h1>
                  <div class="fs-5 mb-5">
                     <br>
                  <table class="table" border="1">
                     <tr>
                        <th>판매자</th>
                        <td>최고다최고</td>
                     </tr>
                     <tr>
                        <th>냉장/냉동</th>
                        <td>정보{{ productInfo.refrigeration }}</td>
                     </tr>
                     <tr>
                        <th>알레르기 정보</th>
                        <td>알레르기 정보 {{ productInfo.allergy }}</td>
                     </tr>
                  </table>
                  </div>
                  
                  <div class="d-flex">
                     <p>상품선택</p>
                        <v-btn @click="minusCount">-</v-btn>
                        <span >{{ counter }} </span>
                        <v-btn @click="plusCount">+</v-btn>
                  </div>
                  <div>
                     <p class="lead">할인률{{ productInfo.discount_rate }}</p>
                     <p class="lead">할인률 적용된 가격{{  productInfo.discount_price }}</p>
                  <br>
                  <br>
                     <p class="lead">총 가격: {{  productInfo.discount_price*counter }}</p>
                     <p style="margin-left:20px;margin-bottom:0;color:black">무료배송 (40,000원 이상 구매 시)</p>
                     <br>
                  </div>
                  <div>
                     <v-btn @click="cartInsert">장바구니 담기</v-btn>
                     <v-btn  @click="liked" :color="isShow ? 'red' : 'blue'"> ♡ </v-btn>                                           
                  </div>
               </div>
            </div>
            

            <div class="text-center">
            <v-btn
               size="large"
               text="Click"
               @click="sheet = !sheet"
            ></v-btn>

            <v-bottom-sheet v-model="sheet">
               <v-card
               class="text-center"
               height="200"
               >
               <v-card-text>
                  <v-btn
                     variant="text"
                     @click="sheet = !sheet"> x</v-btn>

                  <br>
                  <br>

                  
                     <div class="d-flex">
                     <p>상품선택</p>
                        <v-btn @click="minusCount">-</v-btn>
                        <span >{{ counter }} </span>
                        <v-btn @click="plusCount">+</v-btn>
                     <p class="lead">할인률: {{ productInfo.discount_rate }}</p>
                     <p class="lead">할인률 적용된 가격: {{  productInfo.discount_price }}</p>
                     
                     <p class="lead">총 가격: {{  productInfo.discount_price*counter }}</p>
                  <br>
                     <p style="margin-left:20px;margin-bottom:0;color:black">무료배송 (40,000원 이상 구매 시)</p>
                     <br>
                  <v-btn>구매하기</v-btn>
                  </div>      
               </v-card-text>
               </v-card>
            </v-bottom-sheet>
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
            <a id="detail"></a>
               <div class="container px-4 px-lg-5 my-5" style="text-align:center;" id="detail">
                  
               </div>
            <hr>

            <!--리뷰게시판  부분 -->
            <a id="review"></a>
            <div id="review" class="reviewTable">
            <p> 베스트 리뷰</p>
            <p>리뷰 베스트 5 나열할 곳</p>
            <!--
            <input :key="idx" v-for="(bestR, idx) in reviewList" type="file">-->
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
                     <!-- <td> {{ review.review_no }}</td> -->
                     <td> {{ review.user_id }}</td>
                     <td> {{ review.review_title }}</td>
                     <td> {{ review.review_content }}</td>
                     <td> {{ review.review_grade }}</td>
                     <td> {{ review.review_writedate }}</td>
                     {{ review }}
                     <td> <v-btn class="ma-2" variant="text" icon="mdi-thumb-up" :color=" likeState1 ? 'blue-lighten-2':'black'" @click="getLikeCount(review.review_no, review.user_id, review.like_cnt)"></v-btn>{{ review.like_cnt }}</td>
                     <td> <v-btn class="ma-2" variant="text" icon="mdi-thumb-down" color="red-lighten-2"></v-btn></td>
                  </tr>
            </table>
            </div>
            <hr>
            <!-- 문의게시판 건드린 부분 -->
            <a id="qna"></a>
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
            <a id="order"></a>
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


         

   </div>
<!-- Related items section-->

</template>
<script>
import axios from'axios';


export default {
    data(){
        return{
            pno:'',
            cart:{
               cart_no:'',
                 cart_checkbox :0,
                 prod_no:'',
                 user_id:'',
                 quantity:''
            },
            like:{
               like_no:'',
               user_id:'',
               prod_no:''
            },
            productInfo:{},
            likeList:{},
            reviewList:[],
            inquireList:[],
            counter:1,
            isShow:false,
            likeState1:false,
            sheet:false

        }
    },
    created(){ 
      this.pno = this.$route.query.pno; 
      this.getProductInfo();
      this.getLikes();
      this.getRivewList()
      
        
    },
    watch:{
      
    },
    methods:{
        async getProductInfo(){
            let info = await axios.get(`/api/detailPro/${this.pno}`)
                                    .catch(err=>console.log(err));
            this.productInfo = info.data[0]                       
        },
        async getLikes(){
        let list = await axios.get(`/api/prodLike/${this.$store.state.user.user_id}/${this.pno}`)
                                  .catch(err=>console.log(err));
            this.likeList =list.data
            console.log(this.likeList)
            if(list.data.length == 0 ){
               console.log('찜안한상태'+list.data)
               this.isShow= false;
            }else{
               this.isShow= true;
            }
         },
        async getRivewList() { //여기 조인해라
            let list = await axios.get(`/api/detailReview/${this.pno}`)
                                  .catch(err=>console.log(err));
            this.reviewList =list.data;
            console.log
            console.log(this.reviewList)    
            console.log(this.likeR)    
        },
        
          async getLikeCount(no, writer, cnt){
            let likestate = await axios.get(`/api/rLikeCnt/${this.$store.state.user.user_id}/${no}`)
                                       .catch(err=>console.log(err));                 
            let k=0;
            if(likestate.data.length == 1){
               k=-1
            }else{
               k=+1
            }
            let obj ={
                param: {
                  like_cnt : cnt + k
                }
            }
            let obj2={
               param: { 
                  review_no : no,
                  user_id : this.$store.state.user.user_id
               }
            }
            console.log(writer+ no + obj)
            let result = await axios.put(`/api/reviewUpdate/${writer}/${no}`, obj) 
                                    .catch((err=>console.log(err)))
                                    console.log('좋아요 수 업데이트'+result.data)
                                    console.log('현재k'+k)


            if(likestate.data.length == 0){        
            let result2 = await axios.post(`/api/reviewLike`,obj2)   
                                    .catch(err=>console.log(err)) 
                                    console.log('좋아요 한 사람 추가' + result2)
                                    
                     alert(result2.data)
               if( result2.data.affectedRows > 0){
                     alert('좋아요 성공~~');
                     this.likeState1=true 
                                 
               }
            }else{                       
            let result3 = await axios.delete(`/api/reviewLike/${no}/${this.$store.state.user.user_id}`)         
                                    .catch(err=>console.log(err))
                                    console.log('result3'+result3)
            if(result3.data.affectedRows >0){
             this.likeState1=false  
             alert('좋아요 취소~~')
            }      
         }                                                            
      },


         async cartInsert(){
         let obj ={
             param: {
                
                 prod_no:this.pno,
                 user_id:this.$store.state.user.user_id,
                 quantity:this.counter
             }
         }
         console.log('삽입전?' +this.counter)
         let obj2 ={
             param: {
                
                 quantity:this.cart.quantity+this.counter
             }
            }
         console.log(this.$store.state.user.user_id)
          let result = await axios.get(`/api/comparisonCart/${this.$store.state.user.user_id}`) //카트 안에 같은 상품이 있는지 정보가져오기 
                                  .catch(err=>console.log(err)).data
                                   console.log( '장바구니 불러오기'+ result + this.cart)
                                   console.log(result)
                                   console.log( '장바구니 불러오기'+ result)
                           if(result != null ){
                              for(let i=0; i < result.length; i++){
                                 if( this.pno == result[i].prod_no) {   
                                    console.log(this.pno + 'result'+result[i])                   
                                    let carts = await axios.put(`/api/updateCart/${this.pno}/${this.$store.state.user.user_id}`,obj2)
                                    .catch(err=>console.log(err))
                                    this.cart = this.carts.data
                                    if(carts.data.changedRows > 0){
                                       alert('장바구니 수량 변견 완료');
                                       //this.$router.push({path:'card'})
                                    }                          
                                 }else{
                                    let carts2 = await axios.post(`/api/savingCart`,obj)
                                    .catch(err=>console.log(err))                           
                                    if(carts2.data.insertId>0){ 
                                       alert('장바구니에 담겼습니다');
                                       console.log('장바구니에 담겼습니다' +this.counter)
                                       this.cart.cart_no = carts2.data.insertId; 
                                       //this.$router.push({path:'cart'})
                                    }
                                 }               
                              }                        
                           }else{
                              let carts2 = await axios.post(`/api/savingCart`,obj)
                                    .catch(err=>console.log(err))                           
                                    if(carts2.data.insertId>0){ 
                                       alert('장바구니에 담겼습니다');
                                       this.cart.cart_no = carts2.data.insertId; 
                                       //this.$router.push({path:'cart'})
                                    }
                           }
                        },
      
      async liked(){
      //찜하기눌러서 저장하는 곳
      
            if(this.isShow == true ){ //찜한상태라는 말
               let dellike = await axios.delete(`/api/prodDisike/${this.$store.state.user.user_id}/${this.pno}`)
                                       .catch(err=>console.log(err));
                  if(dellike.data.affectedRows>0){                        
                     alert('삭제성공')
                     this.isShow= false
                  }else{
                     console.log(err)
                  }
            }else{
               let obj = {
                  param:{
                     user_id:this.$store.state.user.user_id,
                     prod_no:this.pno
                  }
               }
               let likes = await axios.post(`/api/prodLike`,obj)
                                       .catch(err=>console.log(err));
               if(likes.data.affectedRows>0){
                 // this.like.like_no = likes.data.insertId;
                  alert('찜한상태')
                  this.isShow= true
                  
               }                         
             }      
         
     },

   },
     
     
    
}
</script>

<style scoped>
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