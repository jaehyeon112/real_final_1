
<template>
<div class = "container">
<h1> 아이디 비밀번호 찾기 페이지 </h1>
<div class="radio">
     <!-- 아이디 비번 선택 - 라디오버튼 -->
                <input type="radio" v-bind:value="아이디찾기">아이디찾기
                <input type="radio" v-bind:value="비밀번호찾기">비밀번호찾기
</div>

  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="이메일"
        label-for="input-1"
        description="가입 시 등록한 이메일을 입력해주세요."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="이름" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-2" label="아이디" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>



      <b-button type="submit" variant="primary">확인</b-button>
      <b-button type="reset" variant="danger">초기화</b-button>
    </b-form>
    
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>