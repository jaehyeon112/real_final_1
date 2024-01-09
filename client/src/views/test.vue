<template>

  <v-sheet class="v-sheet" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >

       <v-card-title class="font-weight-bold">LOGIN</v-card-title>

        <v-text-field
          v-model="user_id"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="ID"
          placeholder="아이디를 입력해주세요."
        ></v-text-field>

        <v-text-field
          v-model="user_password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="비밀번호를 입력해주세요."
        ></v-text-field>

        <br>
       
        <div class="font-italic"> Forget your ID/PASSWORD?</div>
        <br>
        <div><img src="https://cdn.imweb.me/thumbnail/20220403/a8e484f2dfe39.png">카카오로그인</div>
        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
        <div class = "join-btn"> 회원가입 </div>
    
      </v-form>
    </v-card>
  </v-sheet>

</template>


<script>
  export default {
    name : "login",

    data: () => ({ 
      form: false,
      user_id: null,
      user_password: null,
      loading: false,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>



<style scoped>
.big_login_char{

}

</style>