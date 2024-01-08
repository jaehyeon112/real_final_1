<template>
  <v-sheet width="300" class="mx-auto">
  <v-form fast-fail @submit.prevent>
   
    <v-row>



      <v-col cols="12">
        <div class="field">
          <label for="oldPass">변경할 비밀번호 :</label>
          <v-text-field v-model="oldPass" label="oldPass" :rules="firstNameRules"></v-text-field>
        <div v-if="!passwordValidFlag"  style="color: red;">
            유효하지 않은 비밀번호 입니다. </div>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="field">
          <label for="newPass">변경비밀번호 확인 :</label>
          <v-text-field v-model="newPass" label="newPass" :rules="lastNameRules"></v-text-field>
            <div v-if="!passwordCheckFlag"  style="color: red;">
              비밀번호가 동일하지 않습니다.
            </div>
        </div>
      </v-col>


      <v-col cols="12">
        <v-btn type="button" block class="mt-2" @click="changePass()">Submit</v-btn>
      </v-col>

    </v-row>

  </v-form>
</v-sheet>
</template>


<script>
import axios from 'axios'

  export default {
   

    data: () => ({

        userId : 'this.$route.query.user_id',
        oldPass : '',
        firstNameRules: [
                            value => {
                             if (value?.length > 1) return true
                             return '이전 비밀번호를 입력해주세요'
                            
                            },
                        ],

      newPass: '',
      lastNameRules: [
                            value => {
                            if (/[^0-9]/.test(value)) return true

                            return '새로운 비밀번호를 입력해주세요'
                            },
                        ],

       //비밀번호
    passwordValidFlag: true,
    passwordCheckFlag: true,
      
    }), //data

    created(){
        this.userId = this.$route.query.user_id;
        console.log('???'+this.userId);

    },

    methods : {
      

async changePass(){

    let result = await axios.put(`/api/changepass/${this.oldPass}/${this.userId}`)
                            .catch(err => console.log(err))
    console.log('result: ', result);
    console.log(result.data);





//   // 영어(대소문자)와 숫자만 정규표현식
//   var onlyEngNum = /^[a-zA-Z0-9]*$/;

//   // 비밀번호 유효성 검사
//   if(!this.validationPwd(pwd)){
//     alert("비밀번호는 영어 대문자 혹은 소문자, 숫자, 특수문자를 반드시 포함하는 8자 이상이어야 합니다."); 
//   } else if(!onlyEngNum.test(pwd)){
//     alert("비밀번호에는 영어와 숫자 외의 문자가 포함될 수 없습니다."); 
//   } else {
//     alert("비밀번호가 유효합니다."); 
//   }
// },

// //비번
// passwordValid() {
//    if (this.oldPass === '') {
//     this.passwordValidFlag = true;
//   } else {
//     this.passwordValidFlag = this.validationPwd(this.oldPass);
//   }
//   },

//   //비번일치
//   passwordCheckValid() {
//     this.passwordCheckFlag = (this.oldPass === this.newPass);
//   },
  
//   validationPwd(pwd){
//     var pwdCh = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;  //영어대소문자, 숫자, 특수문자 all 포함 최소 8자 이상. 
//     return pwdCh.test(pwd);
     },
  


    }
  }


</script>




<style scoped>

.label-margin {
  margin-right: 20px;  
}
.field {
  display: flex; /* 가로로 배열*/
  align-items: center; 
  gap: 10px; 
}


.field label {
  font-size: 15px; 
  font-weight: bold; 
}

.v-text-field input {
  text-align: left; /* 텍스트 필드 내용 오른쪽정렬*/
}


</style>