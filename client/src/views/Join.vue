
<template>
<div class="login-wrap">
  <div class="login-html">
    <h2>{{ mode === 'edit' ? '회원 정보 수정' : '회원 가입' }}</h2>
    <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
    <div class="login-form">
      <div class="sign-up-htm">

        <!-- 회원 수정 시 id랑 이름은 readonly로 수정못하게 해야함 -->
        <div class="group" v-if="!$store.state.kakaoId">
          <label for="user" class="label"> ID </label>
          <p>{{ $store.state.kakaoId != '' ? '카카오로로그인함' : '걍로그인함' }}</p>
      
          <div>
          <input  id="user" type="text" class="input" v-model="userInfo.user_id" :readonly="mode =='edit'" autofocus placeholder="영문+숫자 조합 6자이상 11자 이하" 
           ></div>
          <div>
          <v-btn type="button" v-if="!validId " @click="checkId(userInfo.user_id)">중복체크</v-btn >
           <p v-if="validId" style="color: green;">사용 가능한 아이디입니다.</p>
           <div v-if="!userInfo.user_id && !isFieldValid.user_id" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.user_id }}</div>

           
        </div>

        </div>

        <div class="group" v-if="!$store.state.kakaoId">
          <!-- type 두개 password로 바꾸기 -->
          <label for="pass" class="label">Password</label>
          <input id="pass" type="text" class="input" data-type="text" maxlength=16 v-model="userInfo.user_password" @input="passwordValid" v-bind:="isUpdated">
          <div v-if="!userInfo.user_password && !passwordValidFlag"  style="color: red;">
            유효하지 않은 비밀번호 입니다.
          </div>
             <div v-if="!userInfo.user_password && !isFieldValid.user_password" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.user_password }}</div>
        </div>

        <div class="group" v-if="!$store.state.kakaoId">
          <label for="pass" class="label"> Password CHECK</label>
          <input id="pass" type="text" class="input" data-type="text" maxlength=16 v-model="userInfo.userChPass" @blur="passwordCheckValid">
          
            <div v-if="!passwordCheckFlag"  style="color: red;">
              비밀번호가 동일하지 않습니다.
            </div>
        </div>

        <div class="group">
          <label for="name" class="label" > Name </label>
          <input id="name" type="text" class="input" v-model="userInfo.user_name" :readonly="mode =='edit'">
              <div v-if="!userInfo.user_name &&!isFieldValid.user_name" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.user_name }}</div>
        </div>


        


    <div class="group">
      <label for="email" class="label">Email Address</label>
      {{userInfo}}
      <input id="email" type="text" class="input" v-model="userInfo.user_emailid" placeholder="이메일아이디 입력" v-bind:="isUpdated"> 
              <div v-if="!userInfo.user_emailid && !isFieldValid.user_emailid" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.user_emailid }}</div>
    <span>@</span>
      <select v-model="userInfo.email_domain" class="input">
        <option disabled value="">도메인 선택</option>
        <option>직접입력</option> <!-- 입력할 수 있게 바꾸기! -->
        <option>gmail.com</option>
        <option>naver.com</option>
        <option>daum.net</option> 
      </select>
      <input v-if="userInfo.email_domain === '직접입력'" type="text" class="input" v-model="userInfo.direct_input_domain" placeholder="도메인 직접 입력" v-bind:="isUpdated">

            <div v-if="!userInfo.email_domain && !isFieldValid.email_domain" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.email_domain }}</div>
      <v-btn type="button" @click="checkEmail"> 이메일 중복확인</v-btn>
      <v-btn type="button" @click="sendVerificationEmail"> 이메일 인증 메일 전송</v-btn>
    </div>


         <div class="group" v-if="isEmailSent">
          <label for="email" class="label">인증번호입력하기</label>
          <input id="email" type="text" class="input" v-model="userInfo.verificationCode" placeholder="인증 코드를 입력하세요">
          <v-btn type="button" v-if="!validEmailNum" @click="verifyEmailNum()" >확인</v-btn>
          <p v-if="validEmailNum" style="color: green;">인증이 완료되었습니다.</p>
          <!-- 남은 시간 표시 -->
        <p v-if="emailVerifTimerRemain > 0">
          남은 시간: {{ this.emailVerifTimerRemain }}초
        </p>
        <p v-else style="color: red;">인증 시간이 초과되었습니다. 다시 시도해주세요.</p>
      
        </div>

         <div class="group">
          <label for="tel" class="label">TEL</label>
          <input id="tel" type="text" class="input" v-model="userInfo.user_tel" v-bind:="isUpdated">
          
          <v-btn type="button" @click ="sendVerificationPhone">휴대폰 인증</v-btn >
          <div v-if="!userInfo.user_tel && !isFieldValid.user_tel" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.user_tel }}</div>
        </div>

<!-- ** 휴대폰인증번호 입력칸 해야됨-->
        <div class="group" v-if="isTextSent">
          <label for="tel" class="label">인증번호입력하기</label>
          <input id="tel" type="text" class="input" v-model="userInfo.verificationText" placeholder="인증 번호를 입력하세요">
          <v-btn type="button" v-if="!validTextNum" @click="verifyTextNum()" >확인</v-btn>
          <p v-if="validTextNum" style="color: green;">인증이 완료되었습니다.</p>

             <p v-if="textVerifTimerRemain > 0">
          남은 시간: {{ this.textVerifTimerRemain }}초
        </p>
        <p v-else style="color: red;">인증 시간이 초과되었습니다. 다시 시도해주세요.</p>

        </div>                    


        <div class="group">
          <label for="address" class="label">주소</label>
            <div class="address">
             <v-btn @click="search()">우편번호 찾기</v-btn><br>
              <input type="text" id="postcode"  class="input" placeholder="우편번호" v-model="userInfo.postcode" v-bind:="isUpdated">
              
              <!-- 도로명주소 -->
                    <input type="text" id="roadAddress" class="input" placeholder="도로명주소" v-model="userInfo.address" v-if="!isJibunAddressSelected" v-bind:="isUpdated">

              <!-- 지번주소 -->
               <input type="text" id="jibunAddress" class="input" placeholder="지번주소" v-model="userInfo.address" v-if="isJibunAddressSelected" v-bind:="isUpdated">
              <span id="guide" style="color:#000;display:none"></span>
              <input type="text" id="detailAddress"  class="input" placeholder="상세주소" v-model="userInfo.detail_address" v-bind:="isUpdated">
                 <div v-if="!userInfo.postcode && !isFieldValid.postcode" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.postcode }}</div>
            </div>
        </div>

            
  
        

      <div class="group"> 
        <label for="birth" class="label">생년월일</label>
          <input type="date" v-model="userInfo.birth" :max="today" class="input" v-bind:="isUpdated">
      </div>
    <div v-if="!isAgeValid">
      <p style="color: red;">14세 미만은 가입할 수 없습니다.</p>
    </div>
        <div v-if="!userInfo.birth&& !isFieldValid.birth" class="error-message"  :style="{ color: 'red' }">{{ fieldErrorMessages.birth }}</div>



        <div class="group">
          <input id="check" type="checkbox" class="check"  v-model="userInfo.allCh" @change="updateAll">
          <label for="check"><span class="icon"></span> 전체 동의합니다.</label>
        </div>
<!-- -->

    <div class="group">
          <input id="check1" type="checkbox" class="check"   v-model="userInfo.ch1"  @change="updateCheck">
          <label for="check1"><span class="icon"></span>
           <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" text="이용약관 동의(필수)"> </v-btn>
            </template>

              <template v-slot:default="{ isActive }">
              <v-card title="Dialog">
                <v-card-text> 
                  <pre>
제1조(목적) 이 약관은 업체 회사(전자상거래 사업자)가 운영하는 업체 사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
 
  ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」
 
제2조(정의)
 
  ① “몰”이란 업체 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
 
  ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
 
  ③ ‘회원’이라 함은 “몰”에 회원등록을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
 
  ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
 
제3조 (약관 등의 명시와 설명 및 개정) 
 
  ① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 00 사이버몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
 
  ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
 
  ③ “몰”은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
 
  ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.  이 경우 "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 
 
  ⑤ “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “몰”에 송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
 
  ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 「전자상거래 등에서의 소비자 보호지침」 및 관계법령 또는 상관례에 따릅니다.
   </pre>

                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="닫기" @click="isActive.value = false" ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          </label>
    </div>


        <div class="group">
          <input id="check2" type="checkbox" class="check"   v-model="userInfo.ch2"  @change="updateCheck">
          <label for="check2"><span class="icon"></span> 
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" text="개인정보 수집 및 이용 동의(필수)"> </v-btn>
            </template>

              <template v-slot:default="{ isActive }">
              <v-card title="Dialog">
                <v-card-text> 
                  개인정보처리방침

[차례]
1. 총칙
2. 개인정보 수집에 대한 동의
3. 개인정보의 수집 및 이용목적
4. 수집하는 개인정보 항목
5. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
6. 목적 외 사용 및 제3자에 대한 제공
7. 개인정보의 열람 및 정정
8. 개인정보 수집, 이용, 제공에 대한 동의철회
9. 개인정보의 보유 및 이용기간
10. 개인정보의 파기절차 및 방법
11. 아동의 개인정보 보호
12. 개인정보 보호를 위한 기술적 대책
13. 개인정보의 위탁처리
14. 의겸수렴 및 불만처리
15. 부 칙(시행일) 

1. 총칙

본 업체 사이트는 회원의 개인정보보호를 소중하게 생각하고, 회원의 개인정보를 보호하기 위하여 항상 최선을 다해 노력하고 있습니다. 
1) 회사는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을 비롯한 모든 개인정보보호 관련 법률규정을 준수하고 있으며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
2) 회사는 「개인정보처리방침」을 제정하여 이를 준수하고 있으며, 이를 인터넷사이트 및 모바일 어플리케이션에 공개하여 이용자가 언제나 용이하게 열람할 수 있도록 하고 있습니다.
3) 회사는 「개인정보처리방침」을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
4) 회사는 「개인정보처리방침」을 홈페이지 첫 화면 하단에 공개함으로써 귀하께서 언제나 용이하게 보실 수 있도록 조치하고 있습니다.
5) 회사는  「개인정보처리방침」을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

2. 개인정보 수집에 대한 동의

귀하께서 본 사이트의 개인정보보호방침 또는 이용약관의 내용에 대해 「동의 한다」버튼 또는 「동의하지 않는다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의 한다」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.

3. 개인정보의 수집 및 이용목적

본 사이트는 다음과 같은 목적을 위하여 개인정보를 수집하고 있습니다.
서비스 제공을 위한 계약의 성립 : 본인식별 및 본인의사 확인 등
서비스의 이행 : 상품배송 및 대금결제
회원 관리 : 회원제 서비스 이용에 따른 본인확인, 개인 식별, 연령확인, 불만처리 등 민원처리
기타 새로운 서비스, 신상품이나 이벤트 정보 안내
단, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 등)는 수집하지 않습니다.

4. 수집하는 개인정보 항목

본 사이트는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다. 
1) 개인정보 수집방법 : 홈페이지(회원가입)
2) 수집항목 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 전화번호 , 주소 , 휴대전화번호 , 이메일 , 주민등록번호 , 접속 로그 , 접속 IP 정보 , 결제기록

                  </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="닫기" @click="isActive.value = false" ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          </label>
        </div>


        <div class="group">
          <input type="submit" class="button" 
          :class="{ 'disabled-button': isAnyFieldEmpty || !isAgeValid }"
          :disabled="isAnyFieldEmpty || !isAgeValid" @click="isUpdated? joinUpdate(): joinInsert() " :value="isUpdated ? '수정하기' : 'Sign Up'">
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


      mode: 'sign-up', //모드에 따라서 가입창, 수정창 바뀜
      isUpdated : false, // 수정?등록? => 수정일때 true
      oneUserId : '', //수정용 - 개인 아이디찾으려고

      phoneNo : '',
      no : '', //이메일 인증번호
      isEmailSent : false, //이메일인증창
      isTextSent : false,

      today : '', //생년월일 오늘날짜까지만 선택하게 하려고
      isAgeValid : true,

      isAnyFieldEmpty : false,

      //인증번호 제한시간 주기! 아아앙맘ㅇㄴ랑라;너ㅓ;ㅏ인ㄹㄹ
      emailVerifTimer : null,
      textVerifTimer : null,
      emailVerifTimerRemain : 10, // 이메일 인증 남은시간 10초
      textVerifTimerRemain : 10,





      //회원가입 v-model
      userInfo : {
        //kakaoid : "kakao" + this.$store.state.kakaoId, 
        user_id : "",
        user_password : "",
        userChPass : "",
        user_name : "",
        user_email : "",
        user_emailid: "",  // 이메일 아이디 저장 필드
        email_domain: "",  // 이메일 도메인 저장 필드
        direct_input_domain : "",
        verificationCode : "", // 이메일인증
        verificationText : "", // 휴대폰인증
        user_tel : "",
        postcode : "",
        address : "", // 
        detailAdd : "", //상세주소
        birth : "",
        allCh : false,
        ch1 : false,
        ch2 : false,

      },

      //비밀번호
     passwordValidFlag: true,
      //passwordCheck: '',
      passwordCheckFlag: true,
    
    // 사용가능한아이디메세지하려고 만든 애
    validId: false, 
    
    validEmailNum : false, //이메일인증완료 플래그
    validTextNum : false, // 휴대폰 인증완료 플래그
     // 주소 지번 선택 플래그
     isJibunAddressSelected: false, 


      // 입력칸 채워진거 확인하고 플래그 띄워줌
      errorMessage : '', // 플래그용
      isFieldValid: {
      user_id: true,
      user_password: true,
      userChPass: true,
      user_name: true,
      user_emailid: true,
      email_domain: true,
      user_tel: true,
      postcode: true,
      address: true,
      detail_address: true,
      birth: true,
      allCh: true,
      ch1: true,
      ch2: true
    },
    fieldErrorMessages: {
      user_id: "아이디를 입력하세요.",
      user_password: "비밀번호를 입력하세요.",
      userChPass: "비밀번호 확인을 입력하세요.",
      user_name: "이름을 입력하세요.",
      user_emailid: "이메일 아이디를 입력하세요.",
      email_domain: "이메일 도메인을 입력하세요.",
      user_tel: "전화번호를 입력하세요.",
      postcode: "우편번호를 입력하세요.",
      address: "주소를 입력하세요.",
      detail_address: "상세주소를 입력하세요.",
      birth: "생년월일을 입력하세요.",
      allCh: "전체동의를 해주세요.",
      ch1: "1번 동의를 해주세요.",
      ch2: "2번 동의를 해주세요."
    }
  }

  }, 

  //렌더링이 완료된 후에 실행되니까...
  mounted (){
    //오늘날짜 설정하기
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2,'0'); //date니까 숫자 문자열로 반환하고, 문자열길이 2되도록.
    const day = now.getDate().toString().padStart(2,'0');
    this.today = `${year}-${month}-${day}`
  },






  created() {
    // $route.params.id로 전달된 파라미터에 접근
    this.oneUserId = this.$route.query.user_id;


    // userId가 존재하면 회원 수정 모드로 변경
    if (this.oneUserId) {
      this.mode = 'edit';
      this.getUserInfo();
      // 기존정보 불러오거나 수정작업 수행하기.
      this.isUpdated = true;
    }

   // 카카오 사용자 ID가 있을 때만 ID 입력란을 자동으로 채움
  if(this.$store.state.kakaoId) {
    console.log('카톡로그인 회원ㄱ입폼')
    console.log(this.$store.state.kakaoId);
    this.userInfo.user_id = this.$store.state.kakaoId;
    this.$store.commit('kakaoLogin', 'kakao') 
    //this.$store.commit('kakaoLogin', this.userInfo.user_name) 
  }
   
  }, //created
computed: {

   userEmailFull: function() {
      if (this.userInfo.email_domain === '직접입력') {
        return `${this.userInfo.user_emailid}@${this.userInfo.direct_input_domain}`;
      } else {
        return `${this.userInfo.user_emailid}@${this.userInfo.email_domain}`;
      }
    },


  
 
},


  watch:{
    // 아이디 입력값 변화 감지해서 변경되면 false로 설정
    'userInfo.user_id': function() {
        this.validId = false;
    },

//이메일
    'userInfo.user_emailid': function(newEmailId, oldEmailId) {
      this.updateUserEmail();
    },
    'userInfo.email_domain': function(newDomain, oldDomain) {

      if(newDomain !== '직접입력'){
        this.userInfo.direct_input_domain = "";
      }
      this.updateUserEmail();
    },
    'userInfo.direct_input_domain' : function(newDirecInput, OldDirectInput){
      this.updateUserEmail();
    },

    //생년월일- 변경될때 함수 호출! 
    'userInfo.birth' : function(newBirth, oldBirth){
      this.checkAge();
    }

  },


  methods: {

    updateCheck(){
      console.log("updateCheck function is called");
       // ch1과 ch2가 모두 체크되면 allCh도 체크
      if (this.userInfo.ch1 && this.userInfo.ch2) {
        this.userInfo.allCh = true;
      } else {
        this.userInfo.allCh = false;
      }

    },

        updateAll() {
      // 전체동의 체크/해제에 따라 약관1과 약관2도 업데이트
      if (this.userInfo.allCh) {
        this.userInfo.ch1 = true;
        this.userInfo.ch2 = true;
      } else {
        this.userInfo.ch1 = false;
        this.userInfo.ch2 = false;
      }
    },




    //아이디 중복체크: db에 아이디 있으면 중복되는 아이디 있다고 메세지 띄우기! 
    async checkId(id){
    let list;

     if(!this.userInfo.user_id.trim()){
      console.log(id);
      alert(`아이디를 입력해주세요`);
       this.validId = false;
     } else{
      let result = await axios.get(`/api/join-id/${id}`)
                  .catch(err => console.log(err));
             
      //let list = result.data.length;
      console.log(result.data);
      list = result.data;
      console.log(list);
     }

      // 아이디 공백 입력시 경고창
   
    
    // 아이디가 대소문자 영어와 숫자로 6글자 이상 12자 이하로 이루어지지 않았을 경우 경고창
   if(!this.validation(id)){
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

// *, !, ^, $, @, ? 특수문자만 포함하여 영어(대소문자)와 숫자만 정규표현식
var allowedSpecialChars = /^[a-zA-Z0-9*!^$@?]*$/;

// 비밀번호 유효성 검사
if (!this.validationPwd(pwd)) {
  alert("비밀번호는 영어 대문자 혹은 소문자, 숫자, *, !, ^, $, @, ? 특수문자를 반드시 포함하는 8자 이상이어야 합니다.");
} else if (!allowedSpecialChars.test(pwd)) {
  alert("비밀번호에는 영어와 숫자, *, !, ^, $, @, ? 특수문자 외의 문자가 포함될 수 없습니다.");
} else {
  alert("비밀번호가 유효합니다.");
}
  },

//비번
passwordValid() {
  
   if (this.userInfo.user_password.trim() === '') {
    this.passwordValidFlag = true;
  } else {
    this.passwordValidFlag = this.validationPwd(this.userInfo.user_password);
    if(this.passwordValidFlag) {
      this.checkPwd(this.userInfo.user_password);
    }
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
      this.userInfo = this.userInfo || {};  //객체가 아니면 초기화 (changedRows 떄문에)

      if (this.userInfo.email_domain === '직접입력') {
     
        this.userInfo.user_email = `${this.userInfo.user_emailid}@${this.userInfo.direct_input_domain}`;
         // console.log(this.userInfo.user_email )
      } else {
           //console.log('여기보세요1')
        //console.log(`${this.userInfo.user_emailid}@${this.userInfo.direct_input_domain}`)
       // console.log('여기보세요')
        this.userInfo.user_email = `${this.userInfo.user_emailid}@${this.userInfo.email_domain}`;
        //console.log(this.userInfo.user_email )
      }
},
  // 이메일 인증 시간제한 걸기! 
    goEmailVerifTimer(){
      this.emailVerifTimer = setInterval(() => {
        //시간 초과 -> 타이머 초기화하고 인증번호 재전송하기
        this.emailVerifTimerRemain -= 1; 
        if(this.emailVerifTimer == 0) {
          clearInterval(this.emailVerifTimer);
          this.isEmailSent = false;
         alert(`이메일 인증시간 초과. 인증번호 재발급 하세요.`)
        }
      }, 10000) // 30초 ! / 3분(180,000 milliseconds), 1분(60000)
    },

      // 휴대폰 문자 인증 시간제한 걸기! 
    goTextVerifTimer(){
      this.textVerifTimer = setInterval(() => {
        //시간 초과 -> 타이머 초기화하고 인증번호 재전송하기
         this.textVerifTimerRemain -= 1;

        if(this.textVerifTimer == 0) {
          clearInterval(this.textVerifTimer);
          this.isEmailSent = false;
         alert(`휴대폰 인증시간 초과. 인증번호 재발급 하세요.`)
        }

      }, 30000) // 3초 3분(180,000 milliseconds)
    },

    async checkEmail(email){

      if(!this.userInfo.user_email.trim()){
        alert(`이메일을 입력해주세요`);
        return;
      }

      if(!this.userInfo.user_emailid || (!this.userInfo.email_domain && !this.userInfo.direnct_input_domain )){
        alert(`이메일 아이디와 도메인을 모두 입력하세요! `);
        return;
      }

  //      if (!this.userInfo.user_email.trim()) {
  //   alert(`이메일을 입력해주세요`);
  //   return;
  // }

  if (!this.userInfo.user_emailid || (!this.userInfo.email_domain && !this.userInfo.direnct_input_domain)) {
    alert(`이메일 아이디와 도메인을 모두 입력하세요! `);
    return;
  }

  try {
    let result = await axios.get(`/api/join-email/${this.userInfo.user_email}`);
    
    console.log(result);
    console.log(result.data);
    let list = result.data;
    console.log(list);


    if (list.length >= 1) {
      alert(`중복된 이메일 입니다.`);
    } else {
      alert(`사용가능한 이메일입니다.`);
    }
  } catch (err) {
    console.log(err);
  }
      },

    //이메일 인증
    async sendVerificationEmail(){
      //이메일에 랜덤값 보내서 이 랜덤값이랑 일치하는지 확인
      
      let num = JSON.stringify(Math.ceil((Math.random()*10000)+1))
      this.no = num;
      console.log(num);
      let data = {
       
          to :  this.userInfo.user_email,
          subject : "이메일 인증 메일입니다.",
          body : num
        
      }

      let result = await axios.post(`/api/send-email`, data);
      console.log(result);
         if(result.data.status == "200" ){
          alert('이메일로 인증번호 보내기 성공');
          this.isEmailSent = true;
          this.emailVerifTimerRemain = 10; //남은시간 초기화
          this.goEmailVerifTimer(); //타이머 시작! 
          return;
       }else{
          alert('이메일 인증번호 보내기');
          this.isEmailSent = true;
          return;
        }
    },

    //
    verifyEmailNum(){
      if(this.userInfo.verificationCode == this.no){
        console.log(this.no);
        alert(`인증성공`);
        this.validEmailNum = true;
        clearInterval(this.emailVerifTimer); // 타이머 초기화
      }
    },
  

//휴대폰인증
  async sendVerificationPhone(){

  if (!this.userInfo.user_tel) {
    alert('휴대폰 번호를 입력해주세요.');
    return;
  }

  let phoneNum = JSON.stringify(Math.ceil((Math.random()*10000)+1))
  this.phoneNo = phoneNum;
    console.log(phoneNum);

  let data = {
       "param" : {
          to :  this.userInfo.user_tel,
          from : "01063373744",
          text : phoneNum
       }
      }

      let result = await axios.post(`/api/phonecheck`, data);
        console.log(result);
         if(result.data.statusCode == "2000" ){
          alert('휴대폰 인증번호 보내기 성공');
          this.isTextSent =true;
          this.goTextVerifTimer(); //타이머 시작! 
          return;
       }else{
          alert('휴대폰 인증번호 보내기 ');
          this.isTextSent =true;
  
          return;
        }
    },

    verifyTextNum(){
      if(this.userInfo.verificationText == this.phoneNo){
        console.log(this.phoneNo);
        alert(`인증성공`);
        this.validTextNum = true;
        this.textVerifTimerRemain = 10; //남은시간 
        clearInterval(this.textVerifTimer); //타이머초기화
      }
    },

//생년월일 체크 - 14세미만 가입불가..
checkAge(){
  let birth = new Date(this.userInfo.birth);

  let currentD = new Date();

  let userAge = currentD.getFullYear() - birth.getFullYear() //나이계산

  //하.. 생일 지났는지 안지나는지도 확인해야되는구만
  if(currentD.getMonth() < birth.getMonth() || (currentD.getMonth() == birth.getMonth() && currentD.getMonth() < birth.getMonth())){
    userAge --;
  }

  if(userAge < 14){
    this.isAgeValid = false;
   
  }else{
    this.isAgeValid = true;
  }
},






  async joinInsert(){
    //필드 채워진거 확인
    this.isAnyFieldEmpty = false;  // 초기화
     for(let field in this.isFieldValid){
      if(!this.userInfo[field]){
        this.isFieldValid[field] = false;
        this.isAnyFieldEmpty = true;  // 필드 비어있으면 true
        this.errorMessage = this.fieldErrorMessages[field]; // 플래그 메세지용
      }else {
        this.isFieldValid[field] = true;
      }
     }

     // user_password와 userChPass 추가
if (!this.$store.state.kakaoId) {
  // 카카오로 로그인하지 않은 경우에만 비밀번호와 비밀번호 확인 필드 체크
  if (!this.userInfo.user_password || !this.userInfo.userChPass) {
    this.isFieldValid.user_password = false;
    this.isFieldValid.userChPass = false;
    this.isFieldValid.verificationCode = false;
     this.isFieldValid.verificationText = false;
    this.isAnyFieldEmpty = true;
    this.errorMessage = this.fieldErrorMessages.user_password; // 또는 userChPass에 맞는 에러 메세지로 설정
  }
}

 
//필드가 모두 채워져 있는지 확인 - 일단! 나중ㅇ에 바꿔야함
  if (this.$store.state.kakaoId) {
    // 카카오로 로그인한 경우, 필요한 필드 초기화
    this.userInfo.user_password = '';
    this.userInfo.userChPass = '';
  } else {
    if(
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
    ){
    alert('모든 필드를 입력해주세요.');
    return;
  }
  }


  //나이체크 - 만 14세미만 가입불가
  if(!this.isAgeValid){
     this.errorMessage = "14세 미만 가입 불가"
    alert(`14세 미만 가입 불가! `)
    return;
  }

    let info = this.userInfo;
    let data = {

      param : {
        "user_id" : this.userInfo.user_id,
        "user_name" : this.userInfo.user_name,
        "user_password" : this.userInfo.user_password,
        //"user_emailid" : this.userInfo.user_emailid,
       // "email_domain" : this.userInfo.email_domain,
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
       
     
      this.$router.push({ name: 'message', params: { message: '회원가입이 완료되었습니다.' } });
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
      
        }, //주소api

        //회원수정시 id 정보 뿌릴거
        async getUserInfo(){
            let result = await axios.get(`/api/selectid/${this.oneUserId}`)
                                    .catch(err => console.log(err));
            console.log(this.oneUserId);
            console.log(result);
            console.log(result.data);
            this.userInfo  = result.data[0];   
            //console.log(result.data);
            this.userInfo.birth = this.$dateFormat(this.userInfo.birth, 'yyyy-MM-dd');

            let email = this.userInfo.user_email;
            console.log(email);
            console.log(email.split('@'));
            this.userInfo.user_emailid = email.split('@')[0];
            this.userInfo.email_domain =  email.split('@')[1];

            

            //this.userInfo.email = `${this.userInfo.emailid}@${this.userInfo.email_domain}`;
            console.log("이메일뭐냐고");
            console.log( this.userInfo.user_emailid);
            console.log( this.userInfo.email_domain);
            console.log( this.userInfo.user_email);
                console.log(this.userInfo);

        },

  

       

        // 회원정보수정 - 
      async joinUpdate(){

        let obj = {
          param : {
            user_password : this.userInfo.user_password,
            //user_emailid : this.userInfo.user_emailid,
            //email_domain : this.userInfo.email_domain,
            user_email : this.userInfo.user_email,
            user_tel : this.userInfo.user_tel,
            address : this.userInfo.address,
            detail_address : this.userInfo.detail_address,
            birth : this.userInfo.birth
          }
        }

        let result = await axios.put(`/api/join/${this.oneUserId}`, obj)
                                .catch(err => console.log(err));
          console.log('회원수정 result : ', result);                     
          console.log(result);      
         
         if(result.data.changedRows > 0){
          alert(`수정성공! `)
          console.log('changedRows')
          console.log(result.data.changedRows);
          //this.userInfo = result.data.changedRows;
          this.$router.push({name : 'realmain'})
         }else{
          alert(`수정실패`)
         }
      }




  } //endmethods

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
  min-height:1600px;
  position:relative;
  
  box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
  width:100%;
  height:100%;
  position:absolute;
  padding:90px 70px 50px 70px;
  background:rgba(252, 252, 252, 0.9);
  border-color : rgba(142, 4, 184, 0.9);
  border : 2px solid;
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
  background:#ca7dd9;
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

 .disabled-button {
    background-color: grey; /* 원하는 회색 색상으로 변경 가능 */
    cursor: not-allowed;
    /* 기타 필요한 스타일 조절 가능 */
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