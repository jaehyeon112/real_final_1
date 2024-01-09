<template>
<div class="container">
  <h2>탈퇴 사유를 알려주세요.</h2>
  <v-container fluid>
    <p>Selected Button: {{ radios }}</p>
    <v-radio-group v-model="radios">
      <v-radio label="사고싶은 제품이 없어서" value="r1" >  </v-radio>
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

    if (this.radios === 'r1' || this.radios === 'r2' || this.radios === 'r3') {
      data.param.withdrawal_reason = this.radios;
    } else if (this.radios === 'r4') {
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
        console.log(result);

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