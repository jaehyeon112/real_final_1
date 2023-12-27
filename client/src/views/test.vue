<template>
  <div>
    <h1>test.vue </h1>
      <tr>
        <th>비밀번호</th>
        <td>
          <input v-model="signup.password" type="password" maxlength="16" @blur="passwordValid">
          <div v-if="!passwordValidFlag">
            유효하지 않은 비밀번호 입니다.
          </div>
        </td>
      </tr>

      <tr>
      <th>비밀번호 확인</th>
      <td>
        <input v-model="passwordCheck" type="password" maxlength="16" @blur="passwordCheckValid">
        <div v-if="!passwordCheckFlag">
          비밀번호가 동일하지 않습니다.
        </div>
      </td>
    </tr>



  </div>
</template>

<script>
export default {
  


  data(){
    return{
      signup: {
        id: null,
        password: null,
        pwhint: '',
        pwhintans: null
      },
      
      passwordValidFlag: true,
      passwordCheck: '',
      passwordCheckFlag: true

    }
  },

  methods : {
    passwordValid () {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(this.signup.password)) {
        this.passwordValidFlag = true
      } else {
        this.passwordValidFlag = false
      }
    },

     passwordCheckValid () {
      if (this.signup.password === this.passwordCheck) {
        this.passwordCheckFlag = true
      } else {
        this.passwordCheckFlag = false
      }
    }
  }
  }

</script>
signup: {
        id: null,
        password: null,
        pwhint: '',
        pwhintans: null
      },
      passwordValidFlag: true
    }
  },
출처: https://hjh0827.tistory.com/24 ['알'아두면 '쓸'모있고픈 '신'나는 '잡'지식:티스토리]