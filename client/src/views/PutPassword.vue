
<template>
  <div class = "container">
    <h1>비밀번호 입력</h1>
    <label>비밀번호</label>
    <b-form-input v-model="text" placeholder="비밀번호 입력하면 글자 안보이고 특수문자로 보이게 해라 현아야"></b-form-input>

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