<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <div class= "field"> <label for="password">비밀번호:</label>  
      <v-text-field
        v-model="firstName"
        :rules="rules"
        label="password"
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

          return '비밀번호를 입력해주세요'
        },
      ],
    }),
  }
</script>

<style>
.field {
  display: flex; /* 라벨과 텍스트 필드 가로 배열 */
  align-items: center; 
  gap: 10px; 
}
</style>



<!--
<script>
  export default {
    data() {
      return {
        text: ''
      }
    }

    // methods : {
    //   //지금 로그인한 사람의 비밀번호 값과 지금 비밀번호창에 입력한 값이 일치 하면 -> 회원 수정창으로 이동함
    //   if(this.text ==)
    // }
  }
</script>
-->