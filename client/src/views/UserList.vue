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
            <td>{{ user.user_mail }}</td>
            <td>{{ user.user_tel }}</td>
            <td>{{ dateFormat(user.join_date,'yyyy년 MM월 dd일') }}</td>
            <td>{{ user.user_grade }}</td>
            <td><button>이용 제한</button></td>
        </tr>
    </tbody>
</list>  
</template>
<script>
import list from '../components/List.vue';
import axios from 'axios';
export default {
    data(){
        return{
            userList : []
        }
    },
    created(){
        this.uList();
    },
    methods : {
        async uList(){
            let list = await axios.get('/api/user').catch(err=>console.log(err));
            let result = list.data;
            this.userList = result;
        },
        dateFormat(value,format){
        let date = value == '' ? new Date() : new Date(value);
        let year = date.getFullYear();
        let month = ('0'+(date.getMonth()+1)).slice(-2);
        let day = ('0'+date.getDate()).slice(-2);
        let result = format.replace('yyyy',year).replace('MM',month).replace('dd',day);
        return result;
       }
    },
    components : {
    list
    }
}
</script>