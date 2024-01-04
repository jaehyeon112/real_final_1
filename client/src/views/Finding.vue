<template>
  <v-sheet width="300" class="mx-auto">
  <v-form fast-fail @submit.prevent>
    <v-row>

      <v-col cols="12">
        <div class="radio">
          <input type="radio" name="option" value="findId" checked v-model="selectedOption">
          <span class="radio-text">아이디찾기</span>
          <input type="radio" name="option" value="findPwd" v-model="selectedOption">
          <span class="radio-text">비밀번호찾기</span>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="field">
          <label for="name">이름 :</label>
          <v-text-field v-model="firstName" label="name" :rules="firstNameRules"></v-text-field>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="field">
          <label for="email">이메일 :</label>
          <v-text-field v-model="lastName" label="email" :rules="lastNameRules"></v-text-field>
        </div>
      </v-col>

      <v-col cols="12" v-if="selectedOption === 'findPwd'">
        <div class="field">
          <label for="id">ID :</label>
          <v-text-field v-model="userId" label="userid" :rules="lastNameRules"></v-text-field>
        </div>
      </v-col>

      <v-col cols="12">
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
      </v-col>

    </v-row>

  </v-form>
</v-sheet>
</template>


<script>
  export default {
    data: () => ({

      selectedOption : '',  


      firstName: '',
      firstNameRules: [
        value => {
          if (value?.length > 1) return true

          return '두 글자 이상 입력해주세요'
        },
      ],
      lastName: '입력값들어가는거',
      lastNameRules: [
        value => {
          if (/[^0-9]/.test(value)) return true

          return 'Last name can not contain digits.'
        },
      ],
      //userId: '', // 아이디찾기와 관련된 변수 추가
    }), //data
    
    methods : {
    submitForm() {
      // 여기서 선택된 옵션에 따라 데이터를 서버로 전송하거나 다른 로직을 수행할 수 있습니다.
      if (this.selectedOption === 'findId') {
        // 아이디 찾기 옵션 선택 시 firstName과 lastName을 서버로 전송
        console.log('Find ID', this.firstName, this.lastName);
      } else if (this.selectedOption === 'findPwd') {
        // 비밀번호 찾기 옵션 선택 시 firstName, lastName, userId를 서버로 전송
        console.log('Find Password', this.firstName, this.lastName, this.userId);
      }
    },
    } //methods
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


.radio-text {
  font-size: 17px; 
  font-weight: bold; 
   margin-left: 10px;

  margin-right: 30px;

}
</style>