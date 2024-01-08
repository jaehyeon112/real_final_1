<template>
<div>
        <main class="d-flex flex-nowrap">
        <sidebar class="sidebar"/>
        <div >
        <div class="row" style="width:900px;">
            <div class="col-sm-5">
                        <div class="col p-4 d-flex flex-column position-static">
                            <strong class="d-inline-block mb-2 text-success-emphasis" v-if="member.user_grade=='i1'"> 등급 : 일반</strong>
                            <strong class="d-inline-block mb-2 text-success-emphasis" v-else-if="member.user_grade=='i2'"> 등급 : 실버</strong>
                            <strong class="d-inline-block mb-2 text-success-emphasis" v-else> 등급 : 골드</strong>
                            <h3 class="mb-0">{{ member.user_id}}님</h3>
                            <div class="mb-1 text-body-secondary">일반</div>
                            <p class="mb-auto"></p>
                            <a href="#" class="icon-link gap-1 icon-link-hover ">
                                <div class="text-center">
                                    <v-btn color="primary" @click="dialog = true">다음달 소멸 포인트 조회</v-btn>
                                    <v-dialog v-model="dialog" persistent width="300px">
                                    <v-card>
                                        <v-card-text style="text-align: center;">
                                        {{  member.showNextMonth.sump }}Point
                                        </v-card-text>
                                        <v-card-actions>
                                        <v-btn color="primary" block @click="dialog = false">닫기</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                </div>
                                <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
                            </a>
                        </div>
            </div>
                <div class="col-sm-3 " style="background-color: rgb(138, 38, 215); margin:10px">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis">잔여포인트</strong>
                        <h3 class="mb-0">{{ member.point }} p</h3>
                        <p class="mb-auto"></p>
                    </div>
                </div>
           
                <div class="col-sm-3"  style="background-color: rgb(138, 38, 215); margin:10px">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis">잔여쿠폰</strong>
                        
                        <router-link to="/myPage/coupon"><h3 class="mb-0" >{{ member.couponCnt }} 개</h3></router-link>
                         
                           
                    </div>
                </div>
            </div>
            <!--자식컴포넌트 자리-->
        <router-view :key="$route.fullPath" />
        
        </div>
        
     
    
    </main>
    

    
</div>
    
</template>

<script>
import sidebar from'../components/MyPage/sidebar.vue'
import axios from 'axios'

export default{
    data() {
        return {
            member:{},
            couponList:[],
            
            dialog:false
        } 
    },
    components : {
     
        sidebar
    },
    created(){
        this.getMember();
        //this.getNextMontPoint();
    },
    watch: {
       
    },
    methods: {
        //일단 멤버 정보를 셀렉트 해오는걸로 시험 중 나중에 로그인 세션그걸로 바꿔야 함
        async getMember(){
            
            this.member = (await axios.get(`/api/member`)
                                      .catch(err=>{console.log(err)})).data
                                      console.log( '포인트소멸'+this.member.showNextMonth.sump)                          
        },
        // async getNextMontPoint(){
        //     let member_id = this.$store.state.user.user_id;
        //     this.NextMonthPoint = (await axios.get(`/api/nextMonthPoint/${member_id}`)
        //                               .catch(err=>{console.log(err)})).data
        //                               console.log(this.NextMonthPoint.sump)
        // }
    }
}
</script>

<style scope>
.container{
    margin-left: 200px;
}
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
.sidebar{
    position:sticky;
    top: 10px;
}

</style>