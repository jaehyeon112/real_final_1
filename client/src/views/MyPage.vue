<template>
<div>
        <main class="d-flex flex-nowrap">
            <sidebar class="sidebar"/>
        
        <div class="row" style="width:900px;">
            <div class="col-sm-5">
                        <div class="col p-4 d-flex flex-column position-static">
                            <div class="grade">
                            <strong class="d-inline-block mb-2 text-body-secondary text-success-emphasis" v-if="member.user_grade=='i1'"> 일반</strong>
                            <strong class="d-inline-block mb-2 text-body-secondary text-success-emphasis" v-else-if="member.user_grade=='i2'">  실버</strong>
                            <strong class="d-inline-block mb-2 text-body-secondary text-success-emphasis" v-else> 골드</strong></div>
                            <div>
                            <h3 class="mb-0">{{ member.user_id}}님</h3> <v-btn  fav small id="withdrawl"   color="white" @click="goTodelete">탈퇴하기</v-btn>
                        </div>
                            <p class="mb-auto"></p>
                            <a href="#" class="icon-link gap-1 icon-link-hover ">
                                <div class="text-center">
                                    <v-btn color="#FF9100" @click="dialog = true">다음달 소멸 포인트 조회</v-btn>
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
                <div class="col-sm-3 "  style=" margin:10px">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis  text-center">잔여포인트</strong>
                        <h3 class="mb-0">{{ member.point }} p</h3>
                        <p class="mb-auto"></p>
                    </div>
                </div>

                <div class="col-sm-3"  style= "margin:10px">
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2 text-success-emphasis  text-center">잔여쿠폰</strong>
                        <router-link to="/myPage/coupon"><h3 class="mb-0">{{ member.couponCnt }} 개</h3></router-link>
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
            if(this.$store.state.user.user_id==null){
                this.$router.push({path : '/login'});
                return
            }
          
            this.member = (await axios.get(`/api/member/${this.$store.state.user.user_id}`)
                                      .catch(err=>console.log(err))).data
         
               console.log(`${this.$store.state.user.user_id}`)
               console.log(this.member)
                                                          
        },
        goTodelete(){
            this.$router.push('/withdrawal')
        }
        
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
.grade{
   
  background-color : #FF9100;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: table-cell;
  padding : 15px 0;
  vertical-align: text-bottom;
  text-align:center;

}
#withdrawl{
    width: 50px;
    height: 50px;
    
}
.col-sm-3{
    border:3px solid  #FF9100;
}

</style>