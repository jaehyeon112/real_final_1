<template>
  <v-sheet class="v-sheet" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="400" elevation="10">
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

        <v-row>
          <v-col class="text-right">
            <div class="font-italic"> Forget your ID/PASSWORD?</div>
          </v-col>
        </v-row>
        <br>
            <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="orange"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
         <v-divider class="mt-4"></v-divider> <!-- Divider with top margin -->


        <v-row justify="center" align="center"> <!-- Center both the image and Join button -->
          <v-col class="text-center">
            <div>
              <img src="https://cdn.imweb.me/thumbnail/20220403/a8e484f2dfe39.png" width="35" alt="카카오 로그인 버튼">
            </div>
          </v-col>
          
          <v-col class="text-right">
            <v-btn color="green" class="headline" block>Join</v-btn>
          </v-col>
        </v-row>
    

        


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
.v-sheet{
 margin-top: 20px;
   margin-bottom : 20px;
}
</style>