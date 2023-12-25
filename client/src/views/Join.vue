<template>
<div class="login-wrap">
  <div class="login-html">
    <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
    <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
    <div class="login-form">

    <!-- 로그인     
      <div class="sign-in-htm">
        <div class="group">
          <label for="user" class="label">Username</label>
          <input id="user" type="text" class="input">
        </div>
        <div class="group">
          <label for="pass" class="label">Password</label>
          <input id="pass" type="password" class="input" data-type="password">
        </div>
        <div class="group">
          <input id="check" type="checkbox" class="check" checked>
          <label for="check"><span class="icon"></span> Keep me Signed in</label>
        </div>
        <div class="group">
          <input type="submit" class="button" value="Sign In">
        </div>
        <div class="hr"></div>
        <div class="foot-lnk">
          <a href="#forgot">Forgot Password?</a>
        </div>
      </div>

 END 로그인-->

   

      <div class="sign-up-htm">

        <div class="group">
          <label for="user" class="label"> ID </label>
          <input id="user" type="text" class="input">
          <button type="button">중복체크</button>
        </div>

        <div class="group">
          <label for="pass" class="label">Password</label>
          <input id="pass" type="password" class="input" data-type="password">
        </div>

        <div class="group">
          <label for="pass" class="label"> Password CHECK</label>
          <input id="pass" type="password" class="input" data-type="password">
        </div>

        <div class="group">
          <label for="pass" class="label">Name</label>
          <input id="pass" type="text" class="input">
        </div>


        <div class="group">
          <label for="pass" class="label">Email Address</label>
          <input id="pass" type="text" class="input">
          <button type="button">인증하기</button>
        </div>

         <div class="group">
          <label for="pass" class="label">인증번호입력하기</label>
          <input id="pass" type="text" class="input">
          <button type="button">확인</button>
        </div>

         <div class="group">
          <label for="pass" class="label">TEL</label>
          <input id="pass" type="text" class="input">
          <button type="button">휴대폰 인증</button>
        </div>
                            


        <div class="group">
          <label for="pass" class="label">주소</label>
          <input id="pass" type="text" class="input">
          <button type="button">주소지찾기</button>

<input type="text" v-model="postcode" placeholder="우편번호">
<input type="button" @click="execDaumPostcode()" value="우편번호 찾기"><br>
<input type="text" id="address" placeholder="주소"><br>
<input type="text" id="detailAddress" placeholder="상세주소">
<input type="text" id="extraAddress" placeholder="참고항목">
        </div>

         <div class="group">
          <label for="pass" class="label">생년월일</label>

            <select>
                    <option value="year">년</option>
            </select>

            <select>
                    <option value="month">월</option>
            </select>

           <select>
                    <option value="date">일</option>
            </select>
        </div>

        <div class="group">
          <input id="check" type="checkbox" class="check" checked>
          <label for="check"><span class="icon"></span> 전체 동의합니다.</label>
        </div>

        <div class="group">
          <input id="check" type="checkbox" class="check" >
          <label for="check"><span class="icon"></span> 약관1</label>
        </div>

        <div class="group">
          <input id="check" type="checkbox" class="check" checked>
          <label for="check"><span class="icon"></span> 약관2</label>
        </div>


        <div class="group">
          <input type="submit" class="button" value="Sign Up">
        </div>

        <div class="hr"></div>
        
        <div class="foot-lnk">
          <label for="tab-1">Already Member?</label>
        </div>

      </div>



     
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      postcode: "",
      address: "",
      extraAddress: "",
  }
  }, 

  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }
 
          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },

    
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
  transform:rotateY(180deg);
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
  color:#ee7e06;
  border-color:#ee7e06;
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

.hr{
  height:2px;
  margin:60px 0 50px 0;
  background:rgba(255,255,255,.2);
}
.foot-lnk{
  text-align:center;
}
</style>