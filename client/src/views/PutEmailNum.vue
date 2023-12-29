

<template>
  <div class = "container">
    <h1>이메일 인증번호 입력</h1>
    <label>인증번호</label>
    <b-form-input v-model="text" placeholder="이메일에서 인증번호 어떻게 보내지 하"></b-form-input>

    <div>
          <b-button  type="submit" squared variant="success">입력</b-button>
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
  }
</script>