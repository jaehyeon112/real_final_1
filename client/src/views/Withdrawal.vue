<template>
<div class="container">
  <h2>탈퇴 사유를 알려주세요.</h2>
  <v-container fluid>
    <p>Selected Button: {{ radios }}</p>
    <v-radio-group v-model="radios">
      <v-radio label="사고싶은 제품이 없어서" value="r1" ></v-radio>
      <v-radio label="더 좋은 site를 발견해서" value="r2" ></v-radio>
      <v-radio label="가격이 너무 비싸서" value="r3" ></v-radio>
      <v-radio label="기타 (사유를 입력해주세요.)" value="r4" ></v-radio>
    </v-radio-group>
    <v-textarea
      v-if="this.radios === 'r4'"
      label="기타 사유 작성해주세요."
      v-model="textarea"
    ></v-textarea>

    <v-checkbox
      label="탈퇴동의합니다." 
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
        radios: '',
        textarea: '',
        checkbox: false,
        withdrawalReason: ''
      }
    },

    methods : {
      async deleteUser(){

     if (!this.checkbox) {
      alert('체크박스 동의해주세요.');
      return;
    } else {
      if (this.radios === "r4") {
        // 기타가 선택된 경우 textarea의 값을 withdrawalReason에 저장
        if (!this.textarea.trim()) {
          alert('기타 사유를 입력해주세요.');
          return;
        }
        this.withdrawalReason = this.textarea;
      } else {
        // 다른 라디오가 선택된 경우 withdrawalReason에 라디오 값 저장
        this.withdrawalReason = this.radios;
      }
    }
  //       if(!this.checkbox ){
  //          alert('체크박스동의해주세요.');
  //       }else{
  //         this.withdrawalReason = this.radios;
  //         }

  //  if (this.radios === 4) {
  //       if (!this.textarea.trim()) {
  //         alert('기타 사유를 입력해주세요.');
  //         return;
  //       }
  //       this.withdrawalReason = this.textarea;
  //     }
      
          let uid = this.$store.state.user.user_id ;

          if(confirm('탈퇴 시 30일 간 재가입이 불가능합니다. 정말 탈퇴하시겠습니까?')){
            let result = await axios.put(`/api/updateoutuser/${uid}`)
                              .catch(err => console.log(err));
                console.log(result);

                let data = {
                  param : {
              
                      "user_id" : this.$store.state.user.user_id,
                      "withdrawal_reason" : this.withdrawalReason,
                    
                    }
          } //data

          let result2 = await axios.post(`/api/insertwithdrawal`, data);
              if(result2.data.affectedRows > 0 ){
                alert('탈퇴 성공');
                // +로그아웃처리하기
                this.$store.commit('logout');
                this.$router.push({name : 'realmain'});
                return;
              }
          }else{
                alert('탈퇴 실패');
                return;
          }
          
        

         }
      }
    
  } //methods
</script>
