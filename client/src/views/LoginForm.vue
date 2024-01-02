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
      </div>  

      </div>

    </div>
  </div>


</div>


</template>

<script>
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
                console.log(ipList.data)
     let users = ipList.data;
     
       
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

