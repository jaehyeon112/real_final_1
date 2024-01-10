<template>
  <v-sheet width="300" class="mx-auto">
    <v-form class="custom-form" @submit.prevent>
      <div class= "field" > <label for="password">비밀번호:</label>  
      <v-text-field
        v-model="user_password"
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
              console.log(result);
            
              
        // let info = result.data;           
        // console.log(info);             


        if(result.data[0] != null) {
              console.log(this.user_password);
              console.log(result.data[0].user_password);
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
  display: flex; /* 라벨과 텍스트 필드 가로 배열 */
  align-items: center; 
  gap: 10px; 
}
</style>



<!--
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
-->