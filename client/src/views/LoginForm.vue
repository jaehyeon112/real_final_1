<template>
  <div class="login-wrap">
    <div class="login-html">
      <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
  
      <div class="login-form">
        <div class="sign-in-htm">
          <div class="group">
            <label for="user" class="label" >ID</label>
            <input id="user" type="text"  autocomplete="off" class="input" v-model="user_id">
          </div>
          <div class="group">
            <label for="pass" class="label">PASSWORD</label>
            <input id="pass" type="password" class="input" data-type="password" v-model="user_password">
          </div>
   <div v-if="isBlocked">남은 차단 시간: {{ remainingBlockTime }}초</div>
      <div style="line-height:180%">
        <v-row>
          <v-col class="text-right">
            <div class="font-italic"> <router-link to="/finding"> Forgot your ID/PASSWORD?</router-link></div>
            
          </v-col>
        </v-row> 
      </div>

          <div class="group" style="line-height:130%;  margin-top: 10px;">
            <input type="submit" class="button" color="orange" @click="doLogin()" value="SIGN UP">
          </div>
  
         <v-divider class="mt-4"></v-divider>

          <div class="foot-lnk">
         
     <v-row justify="center" align="center">
          <v-col class="text-center">
            <div
              id="custom-login-btn" @click="kakaoLogin()">
              <a><img src="https://cdn.imweb.me/thumbnail/20220403/a8e484f2dfe39.png" width="30" alt="카카오 로그인 버튼"></a>
            </div>
          </v-col>
          
          <v-col class="text-right">
           <v-btn color="green" class="headline"  block @click="goToJoin()"> Join</v-btn>
          </v-col>
        </v-row>

          
          </div>


        </div>
  
      </div>
    </div>
  
  
  </div>
  

  
</template>


 

  
 
 <script>
  import axios from 'axios';
  import { io } from 'socket.io-client';
  export default {
  
    data(){
      return{
          user_id : "",
          user_password : "",
          failedAttempts: 0,
          isBlocked: false,
          remainingBlockTime: 0, // 남은 차단 시간 
      }
    },
  
  
  
    methods: {

      // 회원가입 버튼
       goToJoin(){
        this.$router.push({name : 'join'})
       },
  
  //Login 버튼

  async doLogin(){
      if (this.isBlocked) {
        alert(`로그인이 ${this.remainingBlockTime}초 동안 차단되었습니다. 잠시 후 다시 시도해주세요.`);
        return;
      }

      if (this.user_id == "" || this.user_password == "") {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
      }
    
      let obj = {
        param: {
          user_id: this.user_id,
          user_password: this.user_password,
        }
      };
  
    try {
        let ipList = await axios.post(`/api/dologin/`, obj);
        

        
        let users = ipList.data.user;
      if(ipList.data.auth){
      localStorage.setItem('token', ipList.data.token);
      console.log(localStorage.getItem('token')+' 이게 토큰 값')
      }   
        if (users.length === 0) {
          this.failedAttempts++;

          if (this.failedAttempts >=  5) {
            this.isBlocked = true;
            this.remainingBlockTime = 10; // 차단 시간(초) 설정
            const timer = setInterval(() => {
              if (this.remainingBlockTime > 0) {
                this.remainingBlockTime--;
              } else {
                this.isBlocked = false;
                this.failedAttempts = 0;
                clearInterval(timer);
              }
            }, 1000); // 1초 간격 타이머 업데이트
            alert(`로그인이 5회 실패하여 ${this.remainingBlockTime}초 동안 차단되었습니다.`);
          } else {
            alert("ID나 Password 확인하기!");
          }

          return;
        }

// 로그인 성공 로직 추가...
if (users.length > 0) {
  alert(`${users[0].user_name}님 환영합니다.`);


           //만약 비로그인시 장바구니에 안 담았다면, 그냥 넘어가게
          let cartList =  (await axios.get(`/api/cartList`).catch(err=>console.log(err))).data
          let vuexCart = this.$store.state.cart;
          console.log(cartList.length + ' 로그인 장바구니 갯수')
          console.log(this.$store.state.cart.length+ '비회원 장바구니 갯수') 
          if(cartList.length != 0 && this.$store.state.cart.length != 0){ // 로그인한 아이디의 장바구니가 비어있지 않고, 비회원 장바구니도 비어있지 않을때
            let processedProdNos = new Set();
            for(let i = 0; i < cartList.length; i++){
            for(let j = 0; j < this.$store.state.cart.length; j++){
              if(cartList[i].prod_no == this.$store.state.cart[j].prod_no){ // 만약 로그인 장바구니 안에 있는 내용과 겹칠경우, 수량 변경.
                let sumQuantity = vuexCart[j].quantity + cartList[i].quantity >= vuexCart[j].stock ? vuexCart[j].stock : vuexCart[j].quantity + cartList[i].quantity

                let obj = {
                  param : {
                    quantity : sumQuantity,
                  }
                }
                 axios.put(`/api/cartAfterLogin/${cartList[i].prod_no}`,obj).catch(err=>console.log(err));
                processedProdNos.add(cartList[i].prod_no); // 그 장바구니의 번호를 기억하는 set 메서드
              } 
            }
          }
            //새로운 상품만 추가
            for (let i = 0; i < this.$store.state.cart.length; i++) {
      if (!processedProdNos.has( this.$store.state.cart[i].prod_no)) { // 아직 처리되지 않은 상품인 경우
        let obj = {
          param: {
            prod_no:  this.$store.state.cart[i].prod_no,
            quantity:  this.$store.state.cart[i].quantity,
            user_id:  users[0].user_id
                  }
        }
         axios.post('/api/cartAfterLogin', obj).catch(err => console.log(err)); // 새 상품을 장바구니에 추가하는 API 호출
        
      }
    }
          }else if(this.$store.state.cart.length != 0){ // 로그인 장바구니는 비어있고, 
            for(let i = 0 ; i < this.$store.state.cart.length; i++){
             let obj = {
               param: {
                   prod_no : this.$store.state.cart[i].prod_no,
                   quantity : this.$store.state.cart[i].quantity,
                   user_id : users[0].user_id
               }
            }
           axios.post(`/api/cartAfterLogin`, obj).catch(err=>{console.log(err)})
           }
          }
      }
   
      this.$socket.disconnect();
      const token = localStorage.getItem('token'); // localStorage에서 토큰 가져오기
        const serverUrl = 'http://localhost:3000'; // 여러분의 실제 소켓 서버 주소로 변경해주세요.
// 새 토큰으로 소켓 재연결
this.$socket = io(serverUrl, {
  query: { token }
});
this.$socket.on('connect', () => {
  console.log('새 토큰으로 소켓 연결 성공');
});
this.$socket.emit('authenticate', token);
  this.$store.commit('login',users[0]) // (함수명, 전달인자)
  this.$store.commit('cartEmpty')
 
  if(users[0].user_grade == 'i4'){

              this.$store.commit('login',users[0]) // (함수명, 전달인자)
              this.$store.commit('cartEmpty')
                        this.$router.push('/admin/Main')
                        return;
                      }
  
  this.$router.push({name : 'realmain'}); // 메인화면으로
  
  }catch (error) {
        console.error("로그인 시 에러 발생:", error);
        alert("로그인 중 에러가 발생했습니다.");
      }
  }, //doLogin
  
 
  
  // 카카오
  kakaoLogin() {
      window.Kakao.Auth.login({
     
        scope: "profile_nickname",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: async (res) => {
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.profile.nickname;
          
          console.log("res", res);
          console.log("res.id", res.id);
          console.log("nickname", nickname);
          console.log("kakao_account", kakao_account);

          //로그인처리구현
          alert("로그인 성공!");
          
          //db에 카카오 아이디 
          let result = await axios.get(`/api/login/kakao/${res.id}`)
                      .catch(err => console.log(err));
          
          console.log("카카오 악시오스 데이터 result ")

          this.$router.push({ name: 'realmain'  });
          let myKakao = res.id; 
          console.log("myKakao");
          console.log(myKakao);

          if(result.data.length == 0){
            
          this.$router.push({ name: 'realmain'  });   
          
        } else {
          this.$store.commit('kakaoLogin', res.id)
            this.$store.state.user.user_name = res.id
           this.$router.push({name : 'realmain'})
          }

        },
        fail: (error) => {
          console.log(error);
        },
      });
    }, //end getKakaoAccount

 async handleKakaoLogin() {
    try {
      const response = await this.kakaoLogin(); // 카카오 로그인 API 호출
      const kakaoId = response.id;

      // Vuex 스토어에 카카오 사용자 ID 업데이트
      this.$store.commit('kakaoLogin', kakaoId);

      
    } catch (error) {
      console.error('카카오 로그인 중 에러:', error);
    }
  },

    kakaoLogout() {
      window.Kakao.Auth.logout((res) => {
        console.log(res);
        alert(`카카오로그아웃`)
        this.$store.commit('kakaoLogout');

      });
    },
    

    } //methods
  };
  </script>
  
  
  
  <style scoped>
  body{
    margin:0;
    color:#f4f4f4;
    background:#fcfbfb;
    font:600 16px/18px 'Open Sans',sans-serif;
  }
  *,:after,:before{box-sizing:border-box}
  .clearfix:after,.clearfix:before{content:'';display:table}
  .clearfix:after{clear:both;display:block}
  a{color:inherit;text-decoration:none}
  
  #custom-login-btn{
    cursor: pointer;
  }
    .login-wrap{
      width:100%;
      margin:auto;
      margin-top: 30px;
      margin-bottom : 30px;
      max-width:525px;
      min-height:600px;
      position:relative;
      
      box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
    }
    .login-html{
      width:100%;
      height:100%;
      position:absolute;
      padding:90px 70px 50px 70px;
      background:rgba(245, 244, 239, 0.9);
    }
    .login-html .sign-in-htm,
    .login-html .sign-up-htm{
      top:0;
      left:0;
      right:0;
      bottom:0;
      position:absolute;
      /* transform:rotateY(180deg); */
      backface-visibility:visible;
      transition:all .4s linear;
    }
    .login-html .sign-in,
    .login-html .sign-up,
    .login-form .group .check{
      display:none;
    }
    .login-html .tab,
    .login-form .group .label,
    .login-form .group .button{
      text-transform:uppercase;
      margin : auto;
    }
    .login-html .tab{
      font-size:22px;
      margin-right:15px;
      padding-bottom:5px;
      margin:0 15px 10px 0;
      display:inline-block;
      border-bottom:2px solid transparent;
    }
    .login-html .sign-in:checked + .tab,
    .login-html .sign-up:checked + .tab{
      color:#070300;
      font-weight : bold;
      /* border-color:#0f0902; */
    }
    .login-form{
      min-height:345px;
      position:relative;
      perspective:1000px;
      transform-style:preserve-3d;
    }
    .login-form .group{
      margin-bottom:15px;
    }
    .login-form .group .label,
    .login-form .group .input
    {
      width:100%;
      color:#130101;
      display:block;
    }
    .login-form .group .button{
      width:50%;
      color:#130101;
      display:block;
    }
    .login-form .group .input,
    .login-form .group .button{
      border:none;
      padding:15px 30px;
      border-radius:25px;
      background:rgba(78, 48, 160, 0.1);
    }
    .login-form .group input[data-type="password"]{
      -text-security:circle;
      -webkit-text-security:circle;
    }
    .login-form .group .label{
      color:#0b0000;
      font-size:12px;
    }
    .login-form .group .button{
      background:#d1cca4;
    }
    .login-form .group label .icon{
      width:15px;
      height:15px;
      border-radius:2px;
      position:relative;
      display:inline-block;
      background:rgba(255,255,255,.1);
    }
    .login-form .group label .icon:before,
    .login-form .group label .icon:after{
      content:'';
      width:10px;
      height:2px;
      background:#070000;
      position:absolute;
      transition:all .2s ease-in-out 0s;
    }
    .login-form .group label .icon:before{
      left:3px;
      width:5px;
      bottom:6px;
      transform:scale(0) rotate(0);
    }
    .login-form .group label .icon:after{
      top:6px;
      right:0;
      transform:scale(0) rotate(0);
    }
    .login-form .group .check:checked + label{
      color:#0b0101;
    }
    .login-form .group .check:checked + label .icon{
      background:#1161ee;
    }
    .login-form .group .check:checked + label .icon:before{
      transform:scale(1) rotate(45deg);
    }
    .login-form .group .check:checked + label .icon:after{
      transform:scale(1) rotate(-45deg);
    }
    .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
      transform:rotate(0);
    }
    .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
      transform:rotate(0);
    }
    
    
    .hr{
      height:2px;
      margin:60px 0 50px 0;
      background:rgba(4, 0, 0, 0.2);
    }
    .foot-lnk{
      text-align:center;
    }
    .foot-lnk .img{
     height:40px; width: 40px;
    
    }
    </style>