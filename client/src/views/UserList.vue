<template>
    
<list @changeemit="changeChildData" @search="search">
    <template #title>회원 목록</template>
    <template #searchData>
        <div class="datatable-input" style="width: 30%;float: right;">
            가입 날짜  <input class="datatable-input" type="date" v-model="days">
            <v-select
            label=" 등급"
            :items="['일반회원','실버회원','골드회원','정지회원']"
            v-model = grade
            variant="underlined"
            return-object
            >등급</v-select>
            <v-btn @click="filterData(this.grade,this.days)">검색</v-btn>     <v-btn @click="refresh">초기화</v-btn></div>
        </template>
        <template #filterSearch>
        <div style="width: 600px;"><a @click="this.order='user_id'">기본순 | </a><a @click="this.order='join_date'">최근 가입일순 | </a><a @click="this.order='user_grade'">등급 높은순</a></div>
        <br><input v-model="word" @keyup.enter="search(this.word)" style="border-bottom: 1px black solid;float: left;width: 400px;height: 50px;" placeholder="회원 아이디나 이름을 검색하세요">
        
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
            <th></th>
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
            <td v-else-if="user.user_grade=='i4'||user.user_grade=='i5'"></td>
            <td v-else><v-btn style="border-radius: 10px;" type="button" @click="modalCheck=true,this.userId=user.user_id">정지하기</v-btn></td>
        </tr>
    </tbody>
    <div class="modal-wrap" v-show="modalCheck" @click="modalOpen">
      <div class="modal-container" @click.stop="">
        <h3>이용제한 사유를 입력해주세요</h3>
        <div class="modalPop">
            <textarea type="text" autofocus class="form-control"></textarea>
        </div>
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modalCheck = false">닫기</v-btn>
            <v-btn style="border-radius: 10px;" @click="stopUser">회원에게 알리기</v-btn>
        </div>
      </div>
    </div>
    <tbody v-if="userList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 회원이 없습니다.</h3></td><td></td><td></td></tr>
        </tbody>
    <v-container v-if="this.totalList.length!=0">
        <page @changePage="changePage" :list="totalList" :totals="this.nums"></page>
    </v-container>
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
            word : '',
            days : this.dateFormat('','yyyy-MM-dd'),
            userList : [],
            filterList : [],
            modalCheck: false,
            userId : '',
            nums : 10,
            startNum : 0,
            totalList: [],
            totals :'',
            conetnt:'',
            order : 'user_id',
            grade : '',
            
        }
    },
    created(){
        window.scrollTo(0, 0);
        this.total();
        this.uList();
    },
    methods : {
        //전ㅊㅔ리스트 불러오기
        async total() {
                let total = await axios.get(`/api/user`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
        async uList(){
            let list = await axios.get(`/api/user/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
            let result = list.data;
            this.userList = result;
            this.total();
        },
        //페이지네이션
        async changePage(no) {
            this.startNum = no;
            try {
                let page = await axios.get(`/api/user/${this.word}/${this.word}/${this.order}/${no}/${this.nums}`);
                console.log(page.data)
                this.userList = page.data;
            } catch (error) {
                console.error("Error fetching page data:", error);
            }
        },
        //헤더에서 리스트 몇개씩 불러올 것인가
        changeChildData(childData){
            this.nums = childData;
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
                    //여기에 유저에게 정지되었다고 알람주기
                    this.$socket.emit('report', `${this.userId}  정지!`)
                    this.uList();
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
                    this.uList();
                }else{
                    alert('오류가 남'); 
                }
            }else{
                alert('취소되었습니다.');
                this.uList();
            }
        },
        modalOpen() {
            this.modalCheck = !this.modalCheck
        },
        search(searchData){
            if(searchData==''){
                this.uList();
            }
            this.searchList(searchData);
        },
        async searchList(cont){
            this.grade = '';
            this.days = this.dateFormat('','yyyy-MM-dd');
            let AllList = await axios.get(`/api/user/${cont}/${cont}`).catch(err=>console.log(err));
            this.totalList = AllList.data;
            let list = await axios.get(`/api/user/${cont}/${cont}/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
            let result = list.data;
            this.userList = result;
        },
        async filterData(grade,day){
            this.filterList = [];
            if(grade==''){
                this.word = '';
                let AllList = await axios.get(`/api/user/${day}`).catch(err=>console.log(err));
                this.totalList = AllList.data;
                let list = await axios.get(`/api/user/${day}/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                this.userList = list.data;
            }else{
                if(grade=='일반회원'){
                    grade = 'i1'
                }else if(grade=='실버회원'){
                    grade = 'i2'
                }
                else if(grade=='골드회원'){
                    grade = 'i3'
                }
                else if(grade=='정지회원'){
                    grade = 'i6'
                }

                let AllList = await axios.get(`/api/user/${day}`).catch(err=>console.log(err));
                this.totalList = []
                let list = await axios.get(`/api/user/${day}/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                for(let i=0;i<list.data.length;i++){
                    if(list.data[i].user_grade==grade){
                        this.filterList.push(list.data[i]);
                    }
                }
                for(let i=0;i<AllList.data.length;i++){
                    if(AllList.data[i].user_grade==grade){
                        this.totalList.push(AllList.data[i]);
                    }
                }
                this.userList = this.filterList;
                this.word = '';
            }
        },
        refresh(){
            this.word ='';
            this.grade = '';
            this.days = this.dateFormat('','yyyy-MM-dd');
            this.uList();
            this.filterList = [];
            this.startNum = 0;
        },
    },
    components : {
        list,
        page
    },
    watch : {
        order(){
            this.uList();
        },
        nums(){
            if(this.grade==''&&this.word==''){
                this.uList();
            }else if(this.grade!=''){
                this.filterData(this.grade,this.days);
            }else if(this.word!=''){
                this.search(this.word)
            }
        }
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
