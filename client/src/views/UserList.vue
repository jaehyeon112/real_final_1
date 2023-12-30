<template>
<list @changeemit="changeChildData" @search="search">
    <template #filterSearch>
        <div><a @click="this.order='user_id'">기본순 | </a><a @click="this.order='join_date'">가입날짜순 | </a><a @click="this.order='user_grade'">등급 높은순</a></div>
    </template>
    <template #dataList>
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
            <td v-else-if="user.user_grade=='i1'">일반 회원</td>
            <td v-else-if="user.user_grade=='i2'">실버 회원</td>
            <td v-else-if="user.user_grade=='i3'">골드 회원</td>
            <td v-if="user.user_grade=='i6'"><v-btn style="border-radius: 10px;" type="button" @click="NonStop(user.user_id)">정지풀기</v-btn></td>
            <td v-else><v-btn style="border-radius: 10px;" type="button" @click="modalCheck=true,userId=user.user_id">정지하기</v-btn></td>
        </tr>
    </tbody>
    <div class="modal-wrap" v-show="modalCheck" @click="modalOpen">
      <div class="modal-container" @click.stop="">
        <h3>이용제한 사유를 입력해주세요</h3>
        <div class="modalPop">
            <input type="text" autofocus>
        </div>
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modalCheck = false">닫기</v-btn>
            <v-btn style="border-radius: 10px;" @click="stopUser">회원에게 알리기</v-btn>
        </div>
      </div>
    </div>
</template>
</list>

</template>
<script>
import list from '../components/admin/List.vue';
import axios from 'axios';
import page from '../components/common/Pagination.vue';
export default {
    data(){
        return{
            userList : [],
            modalCheck: false,
            userId : '',
            nums : 0,
            startNum : 0,
            totalList: "",
            totals :'',
            conetnt:'',
            order : 'user_id',
        }
    },
    created(){
        this.total();
    },
    methods : {
        async total() {
                let total = await axios.get(`/api/user/${this.order}`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
                console.log('총길이'+this.totalList);
            },
        async uList(no){
            let list = await axios.get(`/api/user/${this.order}/${this.startNum}/${no}`).catch(err=>console.log(err));
            let result = list.data;
            this.userList = result;
            console.log(this.order)
        },
        async changePage(no) {
            try {
                let page = await axios.get(`/api/user/${this.order}/${no}/${this.nums}`);
                this.userList = page.data;
                this.totals = this.nums;
                console.log('페이지'+page.data);
            } catch (error) {
                console.error("Error fetching page data:", error);
            }
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
            if(confirm('정말 제한하시겠습니까?')){
                let result = await axios.put(`/api/user/i6/${this.userId}`).catch(err=>console.log(err));
                if(result.data.affectedRows==1){
                    alert('이용제한이 되었습니다');
                    this.uList(this.nums);
                    this.modalCheck = false;
                    //스케쥴러 사용--한달동안 정지시킴
                }else{
                    alert('오류가 남'); 
                }
            }else{
                alert('취소되었습니다');
                this.modalCheck = false;
            }
        },
        async NonStop(id){
            if(confirm('아직 정지 기한이 남아있습니다\n정말 해제하시겠습니까?')){
                let result = await axios.put(`/api/user/i1/${id}`).catch(err=>console.log(err));
                if(result.data.affectedRows==1){
                    alert('정지가 해제되었습니다');
                    this.uList(this.nums);
                }else{
                    alert('오류가 남'); 
                }
            }else{
                alert('이용제한이 해지되었습니다');
                this.uList(this.nums);
            }
        },
        modalOpen() {
            this.modalCheck = !this.modalCheck
        },
        changeChildData(childData){
            this.nums = childData;
            this.totals = childData;
        },
        search(searchData){
            this.content = searchData;
            this.searchList(this.content);
        },
        async searchList(cont){
            let list = await axios.get(`/api/user/${cont}/${cont}/${cont}/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
            let result = list.data;
            this.userList = result;
        }
    },
    components : {
        list,
        page
    },
    watch : {
        nums(){
            this.uList(this.nums);
        },
        content(){
            this.searchList(this.content);
        },
        order(){
            this.uList(this.nums);
        },
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
