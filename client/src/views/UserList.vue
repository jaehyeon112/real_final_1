<template>
<list #dataList>
    <thead>
        <tr>
            <th>회원 아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>가입일</th>
            <th>등급</th>
        </tr>
    </thead>
                    
    <tbody>
        <tr :key="idx" v-for="(user,idx) in userList">
            <td>{{ user.user_id }}</td>
            <td>{{ user.user_name }}</td>
            <td>{{ user.user_email }}</td>
            <td>{{ user.user_tel }}</td>
            <td>{{ dateFormat(user.join_date,'yyyy년 MM월 dd일') }}</td>

            <td v-if="user.user_grade=='i6'">사용정지 회원</td>
            <td v-else="user_grade=='i6'">{{ user.user_grade }}</td>
            <td v-if="user.user_grade=='i6'"><button type="button" @click="">정지풀기</button></td>
            <td v-else><button type="button" @click="modalCheck=true,userId=user.user_id">정지하기</button></td>
        </tr>
    </tbody>
    <div class="modal-wrap" v-show="modalCheck" @click="modalOpen">
      <div class="modal-container" @click.stop="">
        <h3>이용제한 사유를 입력해주세요</h3>
        <div class="modalPop">
            <input type="text" autofocus>
        </div>
        <div class="modal-btn">
            <button @click="modalCheck = false">닫기</button>
            <button @click="stopUser">회원에게 알리기</button>
        </div>
      </div>
    </div>
</list>

</template>
<script>
import list from '../components/admin/List.vue';
import axios from 'axios';
export default {
    data(){
        return{
            userList : [],
            modalCheck: false,
            userId : ''
        }
    },
    created(){
        this.uList();
    },
    methods : {
        async uList(){
            let list = await axios.get('/api/user').catch(err=>console.log(err));
            let result = list.data;
            console.log(result)
            this.userList = result;
        },
        dateFormat(value,format){
            let date = value == '' ? new Date() : new Date(value);
            let year = date.getFullYear();
            let month = ('0'+(date.getMonth()+1)).slice(-2);
            let day = ('0'+date.getDate()).slice(-2);
            let result = format.replace('yyyy',year).replace('MM',month).replace('dd',day);
            return result;
       },
        async stopUser(){
            let result = await axios.put(`/api/user/${this.userId}`).catch(err=>console.log(err));
            if(result.data.affectedRows==1){
                    alert('이용제한이 되었습니다');
                }else{
                    alert('오류가 남'); 
                }
       },
        modalOpen() {
            this.modalCheck = !this.modalCheck
        }
    },
    components : {
    list
    }
}
</script>
<style scoped>
.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  /* modal or popup */
  .modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
  }
  .modalPop{
    border: 1px solid;
  }

  .modal-btn button{
    margin: 10px;
    padding : 5px;

  }
</style>