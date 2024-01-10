<template>
  <v-sheet width="300" class="mx-auto">
  <v-form class="custom-form" fast-fail @submit.prevent>
   
    <v-row>



      <v-col cols="12">
        <div class="field">
          <label for="oldPass">변경 비밀번호 :</label>
          <v-text-field v-model="oldPass" label="new pass" :rules="firstNameRules"></v-text-field>
        <div v-if="!passwordValidFlag"  style="color: red;">
            유효하지 않은 비밀번호 입니다. </div>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="field">
          <label for="newPass"> 변경비밀번호 확인:</label>
          <v-text-field v-model="newPass" label="new pass check" :rules="lastNameRules"></v-text-field>
            <div v-if="!passwordCheckFlag"  style="color: red;">
              비밀번호가 동일하지 않습니다.
            </div>
        </div>
      </v-col>


      <v-col cols="12">
        <v-btn type="button" block class="mt-2 submit-button" @click="changePass()" color="orange" >Submit</v-btn>
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
                             return '비밀번호를 입력해주세요'
                            
                            },
                        ],

      newPass: '',
      lastNameRules: [
                            value => {
                            if (/[^0-9]/.test(value)) return true

                            return '동일하게 입력해주세요'
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
    //console.log('result: ', result);
    //console.log(result.data);
    if(this.oldPass == this.newPass){
      alert(`비밀번호 변경 성공`);
      this.$router.push({name : 'login'});
    }else{
      alert(`변경 실패. 일치하는 비번 입력해주세요!`)
    }




     },
  


    }
  }


</script>




<style scoped>
.custom-form {
  width: 550px;
  height : auto;
  margin-top: 20px;
   margin-bottom : 20px;
  padding: 20px;
  border: 1px  #000000;
  border-radius: 5px;
   box-shadow: 0 5px 10px rgba(1, 1, 1, 0.1);
}
.submit-button {
 width: 30%;
  font-size: 14px; /* Adjust font size */

  border-radius: 10px; /* Add some border-radius for a slightly rounded corner */
}
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