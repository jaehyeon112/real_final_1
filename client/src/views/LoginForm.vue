<template>
<div class="login-wrap">
  <div class="login-html">
    <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
    <!-- <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label> -->
    <div class="login-form">
      <div class="sign-in-htm">
        <div class="group">
          <label for="user" class="label">ID</label>
          <input id="user" type="text" class="input" v-model="user_id">
        </div>
        <div class="group">
          <label for="pass" class="label">PASSWORD</label>
          <input id="pass" type="password" class="input" data-type="password" v-model="user_password">
        </div>

        <!-- <div class="group">
          <input id="check" type="checkbox" class="check" checked>
          <label for="check"><span class="icon"></span> Keep me Signed in</label>
        </div> -->

        <div class="group">
            <b-button variant="link" a href="finding">ID/PASSWORD 찾기</b-button>
          <input type="submit" class="button" @click="doLogin()" value="로그인버튼">
          
 
        </div>



        <div class="hr"></div>
        
        <div class="foot-lnk">
        <b-button variant="link" a href="finding">ID/PASSWORD 찾기</b-button>
          <router-link to="/join"> <v-btn squared variant="success" a href="join">회원가입</v-btn></router-link>

        </div>

    

        <div class="foot-lnk" >

      <a id="custom-login-btn" @click="kakaoLogin()">
      <router-link to="/join">카카오회원가입하고회원가입페이지로<img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      /></router-link></a>
      <div><v-btn @click="kakaoLogout()">카카오 로그아웃</v-btn></div>

        <img src="../assets/naverLogo.png" @click="naverLogin" />

            
        </div>

      <div>
      <router-link to="/finding" class="button"> 아이디비번찾기페이지로 </router-link> 
      <router-link to="/test" class="button"> test 페이지로 </router-link> 
      <router-link to="/putpass" class="button"> 비번입력창 </router-link> 
      <router-link to="/withdrawal" class="button"> 탈퇴페이지 </router-link> 
      
      </div>  

      </div>

    </div>
  </div>


</div>


</template>

<script>

  var onloadCallback = function() {
    alert("grecaptcha is ready!");
  };
import axios from 'axios';

export default {

  data(){
    return{
        user_id : "",
        user_password : ""
    }
  },



  methods: {

//Login 버튼



async doLogin(){
  if(this.user_id == "" || this.user_password==""){
    alert(`아이디와 비밀번호 모두 입력해`)
    return;
  }

let ipList = await axios.get(`/api/dologin/${this.user_id}/${this.user_password}`)  
                .catch(err => console.log(err));
     let users = ipList.data;
      console.log('users는?', users);
       
    
   
    if(users == ''){
      this.failedAttemps++;
      alert(`ID나 Password 확인하기!`)
    }

    //로그인 5회이상 실패시 보안프로그램 실행! 
    if(this.failedAttempts >= 5){

    alert(`보안프로그램 실행하기`)
    
  }
  // else{
  //   alert(users[0].user_name +'님 환영합니다');
  // }
  
       


       if(users == ''){
        alert('아디 비번 확인;')
        return;
       }else{
         alert(users[0].user_name +'님 환영합니다');
       }
 

this.$store.commit('login',users[0]) // (함수명, 전달인자)


 this.$router.push({name : 'realmain'}); // 메인화면으로

}, //doLogin







//1. 카카오
    kakaoLogin() {
      window.Kakao.Auth.login({
     
        scope: "profile_nickname",
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          const ninkname = kakao_account.profile.ninkname;
          console.log("ninkname", ninkname);

          //로그인처리구현
          alert("로그인 성공!");
          
        },
        fail: (error) => {
          console.log(error);
        },
      });
    }, //end getKakaoAccount

    kakaoLogout() {
      window.Kakao.Auth.logout((res) => {
        console.log(res);
      });
    },

  //네이버로그인
   

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

.login-wrap{
  width:100%;
  margin:auto;
  max-width:525px;
  min-height:1000px;
  position:relative;
  
  box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
  width:100%;
  height:100%;
  position:absolute;
  padding:90px 70px 50px 70px;
  background:rgba(239, 233, 183, 0.9);
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
  color:#130b02;
  border-color:#0f0902;
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
  text-security:circle;
  -webkit-text-security:circle;
}
.login-form .group .label{
  color:#0b0000;
  font-size:12px;
}
.login-form .group .button{
  background:#c5b438;
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