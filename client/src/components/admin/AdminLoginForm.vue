<template>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" max-width="500">
        <h2>Yedam 1조 관리자 로그인</h2>
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="user_id"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="ID"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            type="password"
            placeholder="Enter your password"
          ></v-text-field>
          <br>
          <div class="text-center">
            <v-otp-input
              v-model="otp"
              focus-all
              length="6"
              type="password"
              variant="underlined"
            ></v-otp-input>

            <v-btn
              :disabled="otp.length < 6"
              class="my-5"
              color="surface-variant"
              text="관리자번호 입력"
              variant="tonal"
              @click="onClick"
            ></v-btn>
          </div>
          <v-btn
            :disabled="!form||!check"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </template>
  <script>
  import axios from 'axios';
  export default {
    data: () => ({
      form: false,
      user_id: null,
      password: null,
      loading: false,
      otp: '',
      check : false
    }),

    methods: {
        onClick () {
          if(this.otp=='980924'){
            alert('인증되었습니다');
            this.check = true;
          }else{
            alert('인증번호가 틀립니다.');
            return;
            this.opt = "";
          }
        },
        async onSubmit () {
        if (!this.form) return
            
        let obj ={
        param : {
            user_id : this.user_id,
            user_password : this.password
        }
        } 
    
        let ipList = await axios.post(`/api/dologin/`,obj).catch(err => console.log(err));
        console.log(ipList)
        let users = ipList.data;
        if(users == ''){
            alert(`아아디/비밀번호가 일치하지 않습니다.`);
            this.user_id = '';
            this.password = '';
            this.otp = "";
            this.check = false;
        }else{
            this.$store.commit('login',users[0]) // (함수명, 전달인자)
            this.loading = true
            this.$router.push({path : "/admin/Main"})
        }


        setTimeout(() => (this.loading = false), 1000)
    },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>
<style scoped>
.pa-12{
    width: 1000px;
    height: 700px;
    margin: auto;
    padding-top: 1000px;
    background-color: rgb(236, 132, 236,0.5);
}
.mx-auto{
    margin-top: 10%;
}
</style>