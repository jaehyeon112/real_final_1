<template>
  <v-sheet class="pa-12" rounded>
      <v-alert v-show="alarm" class="alarm" closable text="아이디/비밀번호를 확인하세요" type="error" variant="tonal"></v-alert>
      <v-alert v-show="alarm2" class="alarm" closable text="인증번호가 틀렸습니다" type="error" variant="tonal"></v-alert>
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
            @click="this.alarm=false,this.alarm2=false"
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
              @click="this.alarm2=false"
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
      check : false,
      alarm : false,
      alarm2 : false,
    }),

    methods: {
        onClick () {
          if(this.otp=='980924'){
            this.check = true;
          }else{
            this.alarm2 = true;
            this.otp = "";
            return;
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
        console.log(ipList.data)
        let users = ipList.data.user;
        if(users == ''){
            this.alarm = true;
            this.user_id = '';
            this.password = '';
            this.otp = "";
            this.check = false;
        }else if(this.user_id!='admin2'||this.password!='apple0924!'){
          alert('권한이 없습니다');
          this.$store.commit('logout');
          this.$router.push({path : "/login"});
          
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
    top : 50%;
    width: 1000px;
    height: 700px;
    margin: auto;
    background-color: rgba(238, 193, 125, 0.2);
}
.mx-auto{
    margin-top: 5%;
    border: 1px solid rgb(245, 138, 51);
}
.alarm{
  position: relative;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 70px;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 50px;
}
</style>