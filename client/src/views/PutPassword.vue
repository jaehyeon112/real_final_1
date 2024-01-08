<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <div class= "field"> <label for="password">비밀번호:</label>  
      <v-text-field
        v-model="user_password"
        :rules="rules"
        label="password"
      ></v-text-field>
      </div>
      <v-btn type="button" @click=goToUpdate block class="mt-2">입력하기</v-btn>
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
      async  goToUpdate() {

      

        let uid = this.$store.state.user.user_id ;
        let result = await axios.get(`/api/putpass/${uid}`)
                                .catch(err => console.log(err));
        let info = result.data;           
        console.log(info);             

        if(this.user_password == info[0].user_password){
          
          
          this.$router.push({path: 'join', query: {user_id : this.$store.state.user.user_id}})
        
        }else{
          alert(`비밀번호가 틀렸습니다.`)
        }
      }


    } //methods
  }
</script>

<style>
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