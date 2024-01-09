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