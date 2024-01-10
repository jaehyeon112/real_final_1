<template>
  <v-sheet width="300" class="mx-auto">
  <v-form class="custom-form" fast-fail @submit.prevent>
  
    <v-row>

      <v-col cols="12">
        <div class="radio">
          <input type="radio" name="option" value="findId" checked v-model="selectedOption">
          <span class="radio-text font-weight-bold">find ID</span>
          <input type="radio" name="option" value="findPwd" v-model="selectedOption">
          <span class="radio-text">find Password</span>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="field">
          <label for="name">이름 :</label>
          <v-text-field v-model="user_name" label="name" :rules="firstNameRules"></v-text-field>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="field">
          <label for="email">이메일 :</label>
          <v-text-field v-model="user_email" label="email" :rules="lastNameRules"></v-text-field>
        </div>
      </v-col>

            <v-col cols="12">
        <div class="field" v-if="selectedOption === 'findPwd'">
          <label for="phone"> Tel :</label>
          <v-text-field v-model="user_tel" label="tel" :rules="lastNameRules"></v-text-field>
        </div>
      </v-col>

      <v-col cols="12" v-if="selectedOption === 'findPwd'">
        <div class="field">
          <label for="id">ID :</label>
          <v-text-field v-model="user_id" label="userid" :rules="lastNameRules"></v-text-field>
        </div>
      </v-col>

      <v-col cols="12">
        <v-btn type="button" block class="mt-2 submit-button" @click="findIdPass()" color="orange">Submit</v-btn>
      </v-col>

    </v-row>

  </v-form>
</v-sheet>
</template>


<script>
import axios from 'axios'

  export default {
    data: () => ({
      no : '',
      selectedOption : 'findId',  
      user_name: '',
      firstNameRules: [
        value => {
          if (value?.length > 1) return true
          return '두 글자 이상 입력해주세요'
        },
      ],
      user_email: '',
      lastNameRules: [
        value => {
          if (/[^0-9]/.test(value)) return true

          return 'Last name can not contain digits.'
        },
      ],
      user_id : '',
      user_tel : '',
    }), //data

    methods : {
      async findIdPass(){

        if(this.selectedOption == 'findId'){
          //const result = await axios.get(`/api/find/findId/${this.user_name}/${this.user_email}/${this.user}`)
          const result = await axios.get(`/api/find/findid/${this.user_name}/${this.user_email}`)
                                    .catch(err => console.log(err))
          console.log(result.data);
          console.log(result.data[0]);


          let uid = result.data[0]
          console.log('uid in findingvue : ', uid); 

          if(uid != null){
            this.$router.push({name : 'message', params : {message: `찾으신 아이디는 " ${uid.user_id} " 입니다`}})
          }else{
            alert(`입력하신 정보와 일치하는 id가 없습니다.`)
          }


        } else if(this.selectedOption == 'findPwd'){
          const result2 = await axios.get(`/api/find/findPass/${this.user_name}/${this.user_email}/${this.user_id}`)
                                              .catch(err => console.log(err))
          console.log(result2.data);
          console.log(result2.data[0]);

          let upass = result2.data[0];
          if(upass != null){

         
                //이메일에 랜덤값 보내서 이 랜덤값이랑 일치하는지 확인
                
                let num = JSON.stringify(Math.ceil((Math.random()*100000000)+1))
                this.no = num;
                console.log(num);

/*
                let data = {
                
                    to :  this.user_email,
                    subject : "이메일 인증 메일입니다.",
                    body : `비밀번호 변경을 위한 인증번호 : ${num}`
                  
                }
                */


                 let data = {
                      "param" : {
                          to :  this.user_tel,
                          from : "01088988034",
                          text : num
                      }
                      }

 let result = await axios.post(`/api/phonecheck`, data);
 if(result.data.statusCode == "2000" ){
          alert('휴대폰 인증번호 보내기 성공');
       
       const newMsg = prompt('인증번호를 입력해주세요')
                      console.log('confirm창', newMsg)
                      if(newMsg == this.no){
                        this.$router.push({path : 'changePass', query: {user_id : this.user_id}})
                      }else{
                        alert(`인증번호가 일치하지 않습니다.`)
                      }
          
          return;
       }else{
          alert('휴대폰 인증번호 보내기 ');
         const newMsg = prompt('인증번호를 입력해주세요')
                      console.log('confirm창', newMsg)
                      if(newMsg == this.no){
                        this.$router.push({path : 'changePass', query: {user_id : this.user_id}})
                      }else{
                        alert(`인증번호가 일치하지 않습니다.`)
                      }
  
          return;
        }
/*
                let result = await axios.post(`/api/send-email`, data);
                console.log('email result:', result);
                console.log(result.data);
                  if(result.status == "200" ){
                    alert('이메일로 인증번호 보내기 성공');
                    //this.isEmailSent = true;
                    //this.$router.push({path : 'emailnum'})

                    const newMsg = prompt('인증번호를 입력해주세요')
                      console.log('confirm창', newMsg)
                      if(newMsg == this.no){
                        this.$router.push({path : 'changePass', query: {user_id : this.user_id}})
                      }else{
                        alert(`인증번호가 일치하지 않습니다. 이메일 다시 한번 확인해주세요.`)
                      }

                    }
                
                    return;


*/
                    
                }else{
                    alert(' 인증번호 보내기 실패');
                    
                    return;
                  }
              

            
          }else{
            alert(`입력하신 정보와 일치하는 비밀번호가 없습니다.`)
          } //end if2

        }, //end findpass

            changeMessage (emailNum) {
                    // data의 msg를  받은 새로운 value로 update
                      this.no = emailNum;
                    }
      } 



    }
  


</script>




<style scoped>
.custom-form {
  width: 550px;
  height : auto;
  margin-top: 20px;
   margin-bottom : 20px;
  padding: 20px;
  border: 1px  #000000;
  border-radius: 5px;
   box-shadow: 0 5px 10px rgba(1, 1, 1, 0.1);
}
.label-margin {
  margin-right: 20px;  
}
.field {
  display: flex; /* 가로로 배열*/
  align-items: center; 
  gap: 10px; 
}


.field label {
  font-size: 15px; 
  font-weight: bold; 
}

.v-text-field input {
  text-align: left; /* 텍스트 필드 내용 오른쪽정렬*/
}


.radio-text {
  font-size: 17px; 
  font-weight: bold; 
   margin-left: 10px;

  margin-right: 30px;

}

.submit-button {
 width: 30%;
  font-size: 14px; /* Adjust font size */

  border-radius: 10px; /* Add some border-radius for a slightly rounded corner */
}
</style>