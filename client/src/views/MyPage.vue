<template>
<div>
    
  
        <main class="d-flex flex-nowrap">
        <sidebar/>
        <div class="container">
        <div class="row" style="width:900px;">
            
            <div class="col-sm-5">
                
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis"> 등급 : {{ member.user_grade }}</strong>
                        <h3 class="mb-0">{{ member.user_id}}님</h3>
                        <div class="mb-1 text-body-secondary">일반</div>
                        <p class="mb-auto"></p>
                        <a href="#" class="icon-link gap-1 icon-link-hover ">
                            다음달 소멸 포인트 조회
                            <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
                        </a>
                    </div>
               
            </div>
                <div class="col-sm-3 " style="background-color: lightgreen; margin:10px">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis"><!--{{ 잔여포인트 }}-->잔여포인트</strong>
                        <h3 class="mb-0">{{ member.point }} p</h3>
                        <p class="mb-auto"></p>
                    </div>
                </div>
           
                <div class="col-sm-3"  style="background-color: lightgreen; margin:10px">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis">잔여쿠폰</strong>
                        <h3 class="mb-0" @click="modalOpen"> 잔여쿠폰</h3>
                            <!-- <div class="modal-wrap" v-show="modalCheck">
                                <div class="modal-container">
                                    <table>
                                        <tr>
                                            <th>쿠폰번호</th>
                                            <th>쿠폰내용</th>
                                            <th>쿠폰 발급일</th>
                                            <th>쿠폰 만료일</th>
                                            <th>쿠폰 사용 가능여부</th>
                                        </tr>
                                        <tr :key="idx" v-for="(coupon, idx) in couponList">
                                            <td>{{ coupon.couponinfo_no }}</td>
                                            <td>{{ coupon.start_coupon }}</td>
                                            <td>{{ coupon.end_coupon }}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                <div class="modal-btn">
                                    <button @click="modalOpen">닫기</button>
                                    <button @click="modalOpen">확인</button>
                                </div>
                                </div>
                            </div> <모달> -->
                    </div>
                </div>
            </div>
            <!--자식컴포넌트 자리-->
        <router-view :key="$route.fullPath" />
        
        </div>
        
        <!--detailOrder/-->
    
    </main>
    

    
</div>
    
</template>

<script>

// import detailOrder from '../components/Mypage/orderDetail.vue'
 import coupon from '../components/MyPage/couponList.vue'
import sidebar from'../components/MyPage/sidebar.vue'
import axios from 'axios'

export default{
    data() {
        return {
            //modalCheck: false,
            member:[],
            //point테이블의 table
            couponList:[]
        } 
    },
    components : {
       // detailOrder,
        coupon,
        sidebar
    },
    created(){
        this.getMember();
    },
    watch: {
       /*  modalCheck: function () {
        const html = document.querySelector('.mb-0');
        if( this.modalCheck === true ){
        html.style.overflow = 'hidden'
        } else {
        html.style.overflow = 'auto'
        }
        }, */
    },
    methods: {
       
        modalOpen() {
            this.modalCheck = !this.modalCheck
        },
        //일단 멤버 정보를 셀렉트 해오는걸로 시험 중 나중에 로그인 세션그걸로 바꿔야 함
        async getMember(){
            this.member = (await axios.get(`/api/member/test`)
                                      .catch(err=>{console.log(err)})).data[0]
            console.log( 'member' + this.member)                            
        }
    }
}
</script>

<style scope>
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


</style>