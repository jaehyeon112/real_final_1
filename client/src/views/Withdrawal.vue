<template>
<v-app dark>
<div class="container">
  <h2 class="font-weight-bold" >❝ 탈퇴 사유를 알려주세요 ❞</h2>
  
  <v-container class="box" fluid>
    <!-- <p>Selected Button: {{ radios }}</p> -->
    <v-radio-group v-model="radios">
      <v-radio label="1. 마음에 드는 제품이 없음" value="w1" > </v-radio>
      <v-radio label="2. 타사이트 이용 " value="w2" ></v-radio>
      <v-radio label="3. 저렴하지 않은 가격" value="w3" ></v-radio>
      <v-radio label="기타 (사유를 입력해주세요.)" value="w4" ></v-radio>
    </v-radio-group>
    <v-textarea
      v-if="this.radios === 'w4'"
      label="기타 사유 작성해주세요."
      v-model="textarea"
    ></v-textarea>

    <v-checkbox
      label="(동의)탈퇴하겠습니다." 
      v-model="checkbox"
      
    ></v-checkbox>

   <div class="button">
   <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <router-link to="/main">
        <v-btn 
          height="50"
          min-width="80"
          color="orange"
        >
          홈으로
        </v-btn>
        </router-link>
      </v-col>

      <v-col cols="auto">
        <v-btn
          :ripple="false"
          height="50"
          min-width="80"
          @click="deleteUser"
          :disabled="!checkbox"
        >
          탈퇴하기
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  </div>
  </v-container>
  </div>
    </v-app>
</template>




<script>
import axios from 'axios';

export default {
  data() {
    return {
      radios: '',
      textarea: '',
      checkbox: false,
      withdrawalReason: '',
    };
  },

  methods: {
   async deleteUser() {
    if (!this.checkbox) {
      alert('탈퇴 동의 체크박스를 선택하세요.');
      return;
    }

    if (!this.radios) {
      alert('탈퇴 사유를 선택하세요.');
      return;
    }

    let data = {
      param: {
        user_id: this.$store.state.user.user_id,
        withdrawal_reason: null,
        withdrawal_detail_reason: null,
      },
    };

    if (this.radios === 'w1' || this.radios === 'w2' || this.radios === 'w3') {
      data.param.withdrawal_reason = this.radios;
    } else if (this.radios === 'w4') {
      data.param.withdrawal_reason = this.radios;

      if (!this.textarea.trim()) {
        alert('기타 사유를 입력해주세요.');
        return;
      }

      data.param.withdrawal_detail_reason = this.textarea;
    }

    if (confirm('탈퇴 시 30일 간 재가입이 불가능합니다. 정말 탈퇴하시겠습니까?')) {
      try {
        let result = await axios.put(`/api/updateoutuser/${data.param.user_id}`);
     

        let result2 = await axios.post(`/api/insertwithdrawal`, data);

        if (result2.data.affectedRows > 0) {
          alert('탈퇴 성공');
          this.$store.commit('logout');
          this.$router.push({ name: 'realmain' });
          return;
        }
      } catch (error) {
        console.error(error);
        alert('탈퇴 실패');
        return;
      }
    }
  },
},
};
</script>

<style scoped>
.container{
  width: 550px;
  height : auto;
  margin: 50px auto;
  padding: 20px;
  /* border: 1px solid #000000; */
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(88, 88, 88, 0.705);
}
.theme--dark.v-label,
.theme--dark.v-checkbox {
  color: #000000;
}
</style>