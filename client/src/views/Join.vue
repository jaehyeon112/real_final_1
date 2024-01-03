<template>
<div class="login-wrap">
  <div class="login-html">
    <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
    <div class="login-form">
      <div class="sign-up-htm">

        <div class="group">
          <label for="user" class="label"> ID </label>
          <input id="user" type="text" class="input" v-model="userInfo.user_id" autofocus placeholder="영문+숫자 조합 6자이상 11자 이하" >
          <div>
          <v-btn type="button" v-if="!validId" @click="checkId(userInfo.user_id)">중복체크</v-btn >
           <p v-if="validId" style="color: green;">사용 가능한 아이디입니다.</p>
           
        </div>

        </div>

        <div class="group">
          <!-- type 두개 password로 바꾸기 -->
          <label for="pass" class="label">Password</label>
          <input id="pass" type="text" class="input" data-type="text" maxlength=16 v-model="userInfo.user_password" @blur="passwordValid">
          <div v-if="!passwordValidFlag"  style="color: red;">
            유효하지 않은 비밀번호 입니다.
          </div>
        </div>

        <div class="group">
          <label for="pass" class="label"> Password CHECK</label>
          <input id="pass" type="text" class="input" data-type="text" maxlength=16 v-model="userInfo.userChPass" @blur="passwordCheckValid">
          
            <div v-if="!passwordCheckFlag"  style="color: red;">
              비밀번호가 동일하지 않습니다.
            </div>
        </div>

        <div class="group">
          <label for="name" class="label" > Name </label>
          <input id="name" type="text" class="input" v-model="userInfo.user_name">
        </div>


        


<div class="group">
  <label for="email" class="label">Email Address</label>
  
  <input id="email" type="text" class="input" v-model="userInfo.user_emailid" placeholder="이메일아이디 입력">
<span>@</span>
  <select v-model="userInfo.email_domain" class="input">
    <option disabled value="">도메인 선택</option>
    <option>직접입력</option> <!-- 입력할 수 있게 바꾸기! -->
    <option>gmail.com</option>
    <option>naver.com</option>
    <option>daum.net</option> 
  </select>
  <input v-if="userInfo.email_domain === '직접입력'" type="text" class="input" v-model="userInfo.direct_input_domain" placeholder="도메인 직접 입력">
  <v-btn type="button" @click="checkEmail"> 이메일 중복확인</v-btn>
  <v-btn type="button" @click="sendVerificationEmail"> 이메일 인증 메일 전송</v-btn>
</div>


         <div class="group" v-if="isEmailSent">
          <label for="email" class="label">인증번호입력하기</label>
          <input id="email" type="text" class="input" v-model="userInfo.verificationCode" placeholder="인증 코드를 입력하세요">
          <v-btn type="button" @click="verifyEmail">확인</v-btn>
        </div>

         <div class="group">
          <label for="tel" class="label">TEL</label>
          <input id="tel" type="text" class="input" v-model="userInfo.user_tel">
          <button type="button">휴대폰 인증</button>
        </div>
                            


        <div class="group">
          <label for="address" class="label">주소</label>
            <div class="address">
             <v-btn @click="search()">우편번호 찾기</v-btn><br>
              <input type="text" id="postcode"  class="input" placeholder="우편번호" v-model="userInfo.postcode">
              
              <!-- 도로명주소 -->
                    <input type="text" id="roadAddress" class="input" placeholder="도로명주소" v-model="userInfo.address" v-if="!isJibunAddressSelected">

              <!-- 지번주소 -->
               <input type="text" id="jibunAddress" class="input" placeholder="지번주소" v-model="userInfo.address" v-if="isJibunAddressSelected">
 <span id="guide" style="color:#000;display:none"></span>
              <input type="text" id="detailAddress"  class="input" placeholder="상세주소" v-model="userInfo.detail_address">

            
  </div>
        </div>

      <div class="group"> 
        <label for="birth" class="label">생년월일</label>
          <input type="date" v-model="userInfo.birth" class="input" >
      </div>




        <div class="group">
          <input id="check" type="checkbox" class="check"  v-model="userInfo.allCh">
          <label for="check"><span class="icon"></span> 전체 동의합니다.</label>
        </div>




        <div class="group">
          <input id="check1" type="checkbox" class="check"   v-model="userInfo.ch1">
          <label for="check1"><span class="icon"></span> 약관1</label>
        </div>

        <div class="group">
          <input id="check2" type="checkbox" class="check"   v-model="userInfo.ch2">
          <label for="check2"><span class="icon"></span> 약관2</label>
        </div>


        <div class="group">
          <input type="submit" class="button" @click="joinInsert()" value="Sign Up">
        </div>


      </div>



     
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';


export default {
  
  name: "회원가입",

  data() {
    return {

    
      isEmailSent : false, //이메일인증창

      //회원가입 v-model
      userInfo : {
        user_id : "",
        user_password : "",
        userChPass : "",
        user_name : "",
        user_email : "",
        user_emailid: "",  // 이메일 아이디 저장 필드
        email_domain: "",  // 이메일 도메인 저장 필드
        direct_input_domain : "",
        verificationCode : "",
        user_tel : "",
        postcode : "",
        
        address : "", // 
      
        detailAdd : "", //상세주소
        birth : "",
       
        allCh : "false",
        ch1 : "false",
        ch2 : "false",

      },

      //비밀번호
     passwordValidFlag: true,
      //passwordCheck: '',
      passwordCheckFlag: true,
    
    // 사용가능한아이디메세지하려고 만든 애
    validId: false, 
     
     // 주소 지번 선택 플래그
     isJibunAddressSelected: false, 


  }

  }, 

computed: {


   userEmailFull: function() {
      if (this.userInfo.email_domain === '직접입력') {
        return `${this.userInfo.user_emailid}@${this.userInfo.direct_input_domain}`;
      } else {
        return `${this.userInfo.user_emailid}@${this.userInfo.email_domain}`;
      }
    }

  
 
},
  created() {



  }, //created

  watch:{
    // 아이디 입력값 변화 감지해서 변경되면 false로 설정
    'userInfo.user_id': function() {
        this.validId = false;
    },


    'userInfo.user_emailid': function(newEmailId, oldEmailId) {
      this.updateUserEmail();
    },
    'userInfo.email_domain': function(newDomain, oldDomain) {
      this.updateUserEmail();
    }
  },


  methods: {
    //아이디 중복체크: db에 아이디 있으면 중복되는 아이디 있다고 메세지 띄우기! 
    async checkId(id){

      let result = await axios.get(`/api/join-id/${id}`)
                  .catch(err => console.log(err));
              console.log(result.data)
      //let list = result.data.length;
      console.log(result.data);
      let list = result.data;
      console.log(list);


      // 아이디 공백 입력시 경고창
    if(id == ""){
      console.log(id);
      alert(`아이디를 입력해주세요`);
       this.validId = false;
    
    // 아이디가 대소문자 영어와 숫자로 6글자 이상 12자 이하로 이루어지지 않았을 경우 경고창
    } else if(!this.validation(id)){
      alert(`아이디는 영문 대소문자와 숫자로 6글자 이상 12자 이하로 구성해주세요`);
       this.validId = false;
    // } else if(list.includes(id)){
    }else if(list.length == 1){
      alert(`중복된 아이디입니다.`);
       this.validId = false;
    } else {
      alert(`사용 가능한 아이디입니다.`);
       this.validId = true;
    }
  }, //checkID,

  // 유효성 검사
  validation(id){
    var ch = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;  // 영어대소문자+숫자 6~12글자 정규표현식 쓰는 법.
    return ch.test(id); // 정규표현식이랑 일치하는지-> t/f
  },


  //비밀번호
  checkPwd(pwd){

  // 영어(대소문자)와 숫자만 정규표현식
  var onlyEngNum = /^[a-zA-Z0-9]*$/;

  // 비밀번호 유효성 검사
  if(!this.validationPwd(pwd)){
    alert("비밀번호는 영어 대문자 혹은 소문자, 숫자, 특수문자를 반드시 포함하는 8자 이상이어야 합니다."); 
  } else if(!onlyEngNum.test(pwd)){
    alert("비밀번호에는 영어와 숫자 외의 문자가 포함될 수 없습니다."); 
  } else {
    alert("비밀번호가 유효합니다."); 
  }
},

//비번
passwordValid() {
   if (this.userInfo.user_password === '') {
    this.passwordValidFlag = true;
  } else {
    this.passwordValidFlag = this.validationPwd(this.userInfo.user_password);
  }
  },

  //비번일치
  passwordCheckValid() {
    this.passwordCheckFlag = (this.userInfo.user_password === this.userInfo.userChPass);
  },
  
  validationPwd(pwd){
    var pwdCh = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;  //영어대소문자, 숫자, 특수문자 all 포함 최소 8자 이상. 
    return pwdCh.test(pwd);
  },
 
 

 //Email

    updateUserEmail: function() {
      if (this.userInfo.email_domain === '직접입력') {
        this.userInfo.user_email = `${this.userInfo.user_emailid}@${this.userInfo.direct_input_domain}`;
      } else {
        this.userInfo.user_email = `${this.userInfo.user_emailid}@${this.userInfo.email_domain}`;
      }
},


    async checkEmail(email){
      let result = await axios.get(`/api/join-email/${email}`)
                  .catch(err => console.log(err));
                  console.log("result.data", result.data)
      let list = result.data;
      console.log(list);

      if(email == ''){
        alert(`이메일을 입력해주세요`);
      } else if(list.length == 1){
        alert(`중복된 이메일 입니다.`);
      }else{ alert(`사용가능한 이메일입니다.`)};
    },

    //이메일 인증

  
  




  async joinInsert(){
    //
//필드가 모두 채워져 있는지 확인 - 일단! 나중ㅇ에 바꿔야함
  if (
    !this.userInfo.user_id ||
    !this.userInfo.user_password ||
    !this.userInfo.userChPass ||
    !this.userInfo.user_name ||
    !this.userInfo.user_emailid ||
    !this.userInfo.email_domain ||
    //!this.userInfo.verificationCode ||
    !this.userInfo.user_tel ||
    !this.userInfo.postcode ||
   
    !this.userInfo.address ||
   
    !this.userInfo.detail_address ||
    !this.userInfo.birth ||
    !this.userInfo.allCh ||
    !this.userInfo.ch1 ||
    !this.userInfo.ch2
  ) {
    alert('모든 필드를 입력해주세요.');
    return;
  }


    let info = this.userInfo;
    let data = {

      param : {
        "user_id" : this.userInfo.user_id,
        "user_name" : this.userInfo.user_name,
        "user_password" : this.userInfo.user_password,
        "user_email" : this.userInfo.user_email,
        "user_tel" : this.userInfo.user_tel,
        "birth" : this.userInfo.birth,
        "address" : this.userInfo.address,
        "detail_address" : this.userInfo.detail_address,
        "postcode" : this.userInfo.postcode
      }
    };

    let result = await axios.post(`/api/join/joinIn`, data);
    if(result.data.affectedRows > 0 ){
      alert('가입 성공');
      this.$router.push({name : 'message'});
      return;
    }else{
      alert('가입 실패');
      return;
  }
  },



    //주소api
            search(){ //
            const vueObj = this;

            new window.daum.Postcode({
            oncomplete: (data) => { 
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수
                var jibunAddr = data.jibunAddress; //지번 주소 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                vueObj.userInfo.postcode = data.zonecode;
                //vueObj.userInfo.address = roadAddr;
                //vueObj.userInfo.address = jibunAddr;

              // 사용자가 도로명 주소를 선택한 경우
          if (data.userSelectedType === 'R') {
            vueObj.userInfo.address = roadAddr;
            vueObj.isJibunAddressSelected = false; // 도로명주소를 선택했음을 나타내는 플래그를 설정

          // 사용자가 지번 주소를 선택한 경우
          } else if (data.userSelectedType === 'J') {
            vueObj.userInfo.address = jibunAddr;
            vueObj.isJibunAddressSelected = true; // 지번주소를 선택했음을 나타내는 플래그를 설정
          }
                
    
                var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();
      
        }
  }

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
  max-width:700px;
  min-height:1500px;
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
  backface-visibility:hidden;
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
  color:#0a0601;
  border-color:#0e0701;
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
.login-form .group .input,
.login-form .group .button{
  width:100%;
  color:#130101;
  display:block;
}
.login-form .group .input,
.login-form .group .button{
  border:none;
  padding:15px 20px;
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
  color:#1e0303;
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

css
/* 체크박스 크기 변경 */
.check {
  transform: scale(1.5); /* 원하는 크기로 조절 */
}

/* 전체 동의합니다 라벨 텍스트 크기 변경 */
#check + label {
  font-size: 20px; /* 원하는 크기로 조절 */
}

/* 약관1, 약관2 라벨 위치 변경 */
#check1 + label, #check2 + label {
  margin-left: 30px; /* 원하는 거리로 조절 */
}

.hr{
  height:2px;
  margin:60px 0 50px 0;
  background:rgba(255,255,255,.2);
}
.foot-lnk{
  text-align:center;
}
</style>