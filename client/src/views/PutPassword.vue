<template>
  <v-sheet width="300" class="mx-auto">
    <v-form class="custom-form" @submit.prevent>
      <div class= "field" > <label for="password">비밀번호:</label>  
      <v-text-field
        v-model="user_password"
        type ="password"
        :rules="rules"
        label="password"
      ></v-text-field>
      </div>
      <v-btn type="button" @click="goToUpdate" block class="mt-2" color="orange">submit</v-btn>
    </v-form>
  </v-sheet>
</template>




<script>
  import axios from 'axios';

  export default {
    data: () => ({
      user_password: '',
      rules: [
        value => {
          if (value) return true
          return '비밀번호를 입력해주세요'
        },
      ],
    }), //data

    methods : {
      async goToUpdate() {

        let uid = this.$store.state.user.user_id ;

        let result = await axios.get(`/api/putpwd/${uid}/${this.user_password}`)
                                .catch(err => console.log(err));


        if(result.data[0] != null) {
   
          this.$router.push({path: 'join', query: {user_id : this.$store.state.user.user_id}})
        
        }else{
          alert(`비밀번호가 틀렸습니다.`)
        }
      }

    } //methods
  }
</script>

<style scoped>
.custom-form {
  width: 400px;
  height : auto;
  margin-top: 20px;
   margin-bottom : 20px;
  padding: 20px;
  border: 1px  #000000;
  border-radius: 5px;
   box-shadow: 0 20px 20px rgba(0, 0, 0, 0.1);
}
.field {
  display: flex; 
  align-items: center; 
  gap: 10px; 
}
</style>


