
<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <div class= "field"> <label for="emailNum">이메일 인증번호</label>  
      <v-text-field
        v-model="firstName"
        :rules="rules"
        label="emailNum"
      ></v-text-field>
      </div>
      <v-btn type="submit" block class="mt-2">입력하기</v-btn>
    </v-form>
  </v-sheet>
</template>




<script>
  export default {
    data: () => ({
      firstName: '',
      rules: [
        value => {
          if (value) return true

          return '이메일로 전송된 인증번호를 입력해주세요'
        },
      ],
    }),
  }
</script>

<style>
.field {
  display: flex; /* 가로로 배열. */
  align-items: center; /*  수직 방향으로 가운데 정렬 */
  gap: 10px; 
}
</style>


