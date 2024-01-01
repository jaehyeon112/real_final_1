
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
  display: flex; /* 라벨과 텍스트 필드를 가로로 배열합니다. */
  align-items: center; /* 라벨과 텍스트 필드를 수직 방향으로 가운데 정렬합니다. */
  gap: 10px; /* 라벨과 텍스트 필드 사이에 간격을 만듭니다. */
}
</style>



<!--
<template>
  <div class = "container">
    <h1>비밀번호 입력</h1>
    <label>비밀번호</label>
    <b-form-input type="password" v-model="text" placeholder="비밀번호를 입력해주세요!"></b-form-input>

    <div>
          <b-button  type="submit" squared variant="success" @click="$router.push('/join')">입력</b-button>
        <!-- <input type="submit" class="button" value="입력"> -->
<!--
    </div>


    <div class="mt-2">Value: {{ text }}</div>
  </div>
</template>

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