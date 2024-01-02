<template>
<div class="container">
  <h2>탈퇴 사유를 알려주세요.</h2>
  <v-container fluid>
    <p>Selected Button: {{ radios }}</p>
    <v-radio-group v-model="radios">
      <v-radio label="사유1" value="one"></v-radio>
      <v-radio label="사유2 (string)" value="2"></v-radio>
      <v-radio label="사유3 (integer)" :value="3"></v-radio>
      <v-radio label="사유4 (integer)" :value="4"></v-radio>
    </v-radio-group>
    <v-textarea
      v-if="this.radios === 4"
      label="기타 사유 작성해주세요."
      v-model="textarea"
    ></v-textarea>

    <v-checkbox
      label="탈퇴 시 30일간 재 가입이 불가능합니다. 동의하십니까? "
      v-model="checkbox"
      
    ></v-checkbox>

   <div class="button">
   <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          height="50"
          min-width="80"
        >
          홈으로
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          :ripple="false"
          height="50"
          min-width="80"
          @click="deleteUser"
        >
          탈퇴하기
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  </div>
  </v-container>
  </div>
</template>




<script>
import axios from 'axios'

  export default {
    data() {
      return {
        radios: 'one',
        textarea: '',
        checkbox: false,
      }
    },

    methods : {
      async deleteUser(){
        if(!this.checkbox ){
           alert('탈퇴 시 30일간 재 가입이 불가능하다는 사항에 동의해주세요.');
        }else{
          
          let user_id = this.$store.state.user.id;
          
          
          console.log(user_id);

          let result = await axios.delete(`/api/deleteUser/${uid}`)
                              .catch(err => console.log(err));
                console.log(result);
         }
      }
    }
  }
</script>