<template>
<div class="login-wrap">
  <div class="login-html">
    <!-- <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label> -->
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
          <input id="user" type="text" class="input" v-model="userId" autofocus placeholder="영문+숫자 조합 6자이상 11자 이하" >
          <button type="button" @click="checkId()">중복체크</button>
        </div>

        <div class="group">
          <label for="pass" class="label">Password</label>
          <input id="pass" type="password" class="input" data-type="password" v-model="userPass">
        </div>

        <div class="group">
          <label for="pass" class="label"> Password CHECK</label>
          <input id="pass" type="password" class="input" data-type="password" v-model="userChPass">
        </div>

        <div class="group">
          <label for="name" class="label" > Name </label>
          <input id="name" type="text" class="input" v-model="userName">
        </div>


        <div class="group">
          <label for="email" class="label">Email Address</label>
          <input id="email" type="text" class="input" v-model="userEmail">
          <button type="button">인증하기</button>
        </div>

         <div class="group">
          <label for="email" class="label">인증번호입력하기</label>
          <input id="email" type="text" class="input" v-model="chEmail">
          <button type="button">확인</button>
        </div>

         <div class="group">
          <label for="tel" class="label">TEL</label>
          <input id="tel" type="text" class="input" v-model="userTel">
          <button type="button">휴대폰 인증</button>
        </div>
                            


        <div class="group">
          <label for="address" class="label">주소</label>
            <div class="address">
             
              <input type="text" id="postcode" placeholder="우편번호">
              <button @click="search()">우편번호 찾기</button><br>
              <!--onclick이 아니라 @click으로 바꿔야한다. -->
              <input type="text" id="roadAddress" placeholder="도로명주소">
              <input type="text" id="jibunAddress" placeholder="지번주소">
              <span id="guide" style="color:#000;display:none"></span>
              <input type="text" id="detailAddress" placeholder="상세주소">
              <!-- <input type="text" id="extraAddress" placeholder="참고항목"> -->
  </div>
        </div>

         <div class="group">
          <label for="birth" class="select">생년월일</label>

            <select v-model="bthYear">
                    <option value="year">년</option>
                    <option v-for ="(item, index) in yyyyList" :key="index" :value="item.value" >
                  {{ item.text }}
                    </option> 
            </select>

            <select v-model="bthMonth">
                    <option value="">월</option>
                <option
                  v-for="(item, index) in mmlist"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.text }}
                </option>
            </select>

           <select v-model="bthDate">
                    <option value="date">일</option>
            </select>
        </div>

        <div class="group">
          <input id="check" type="checkbox" class="check" checked v-model="allCh">
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


      </div>



     
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  //주소api때 쓴거
  name: "Address",

  data() {
    return {
      yyyyList: [],
      mmlist: [],
      
      userInfo : {
        userId : "",
        userPass : "",
        userChPass : "",
        userName : "",
        userEmail : "",
        chEmail : "",
        userTel : "",
        userAdd : "",
        bthYear : "",
        bthMonth : "",
        bthDate : "",
        allCh : "",
      },
      
     

  }

  }, 

  created() {
    //생년월일
    const nowYear = new Date().getFullYear();
    for (let i = 0; i < 100; i++) {
      let date = nowYear - i;
      this.yyyyList.push({ value: date, text: date });
    }

    for (let i = 1; i < 13; i++) {
      this.mmlist.push({
        value: i,
        text: i,
      });
    }
  


  },

  methods: {
    //아이디 중복체크: db에 아이디 있으면 중복되는 아이디 있다고 메세지 띄우기! 
    async getUserId(){
      let result = await axios.get(`api/join`)
                  .catch(err => console.log(err))
      let list = result.data;

      this.checkId(list);
      console.log("getuserid함수" + list);
    },

    checkId(id){

      if(this.userInfo.userId == ""){
        alert(`아이디를 입력해주세요`);
      } else if(this.userInfo.userId == this.id){
        alert(`중복된 아이디 입니다.`);
      }

    }, //checkID,

  //유효성검사
    validation(){
      //id
      if(this.userInfo.userId.length < 6 || this.iserInfo.userId.length > 17){
        alert(`아이디는 6글자 이상 17자 이하로 입력해주세요`);
        this.userInfo.userId.focus();
        return false;
      }else if(!idChVal(this.userId)){
        alert(`영어 대·소문자와 숫자만 입력가능합니다.`);
        this.userId.focus();
        return false;
      }

 

    },

  //유효성 검사 - 문자열 check
  idChVal(id){
    var count = 0;
    //영어, 숫자 체크
    for(let i=0; i<id.length; i++){
      if((id.charCodeAt(i)>=65 && id.charCodeAt(i)<=90) || (id.charCodeAt(i)>=97 && value.charCodeAt(i)<=122) || (id.charCodeAt(i)>=48 && id.charCodeAt(i)<=57)){
                count += 1;
            }

      if(count == id.length){
        return true;
      }else{
        return false;
      }
    }
  },


    //주소api
            search(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
            new window.daum.Postcode({
            oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

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
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("roadAddress").value = roadAddr;
                document.getElementById("jibunAddress").value = data.jibunAddress;
                
                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                // if(roadAddr !== ''){
                //     document.getElementById("extraAddress").value = extraRoadAddr;
                // } else {
                //     document.getElementById("extraAddress").value = '';
                // }

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