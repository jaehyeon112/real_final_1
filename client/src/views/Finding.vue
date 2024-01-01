<template>
  <v-sheet width="300" class="mx-auto">
  <v-form fast-fail @submit.prevent>
    <v-row>

      <v-col cols="12">
        <div class="radio">
          <input type="radio" name="option" value="findId" v-model="selectedOption">
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
          <v-text-field v-model="lastName" label="userid" :rules="lastNameRules"></v-text-field>
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
    }),
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