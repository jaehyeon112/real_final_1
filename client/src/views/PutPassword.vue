
<template>
  <div class = "container">
    <h1>비밀번호 입력</h1>
    <label>비밀번호</label>
    <b-form-input type="password" v-model="text" placeholder="비밀번호를 입력해주세요!"></b-form-input>

    <div>
          <b-button  type="submit" squared variant="success" @click="$router.push('/join')">입력</b-button>
        <!-- <input type="submit" class="button" value="입력"> -->
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