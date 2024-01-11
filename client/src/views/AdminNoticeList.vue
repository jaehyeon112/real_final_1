<template>
    <list @changeemit="changeChildData">
        <template #title>공지사항 목록</template>
        <template #searchData>
            <div style="width: 250px;float: right;"><v-select
            label="중요도"
            :items="['중요','일반']"
            v-model = reason
            variant="underlined"
            return-object
            ></v-select>
            <v-btn @click="refresh">초기화</v-btn>           
            <v-btn @click="insertNotice">공지사항 등록</v-btn></div>
        </template>
        <template #filterSearch>
            <div><a @click="this.order='notice_no'">기본순 | </a><a @click="this.order='notice_views'">조회수 많은 순</a></div>
            
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>공지번호</th>
                <th>작성일</th>
                <th>공지제목</th>
                <th>공지내용</th>
                <th>조회수</th>
                <th>중요도</th>
            </tr>
        </thead>
        <tbody>
            <tr
          v-for="notice in noticeList"
        >
          <td>{{ notice.notice_no }}</td>
          <td>{{ $dateFormat(notice.notice_writedate,'yyyy년 MM월 dd일') }}</td>
          <td>{{ notice.notice_title }}</td>
          <td @click="modNotice(notice.notice_no)" class="cur">{{ notice.notice_content }}</td>
          <td>{{ notice.notice_views }}</td>
          <td v-if="notice.importance=='l1'">중요</td>
          <td v-else-if="notice.importance=='l2'">일반</td>
          <td><v-btn @click="modNotice(notice.notice_no)">수정</v-btn>   <v-btn>삭제</v-btn></td>
        </tr>
      </tbody>
      <tbody v-if="noticeList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 데이터가 없습니다</h3></td></tr>
        </tbody>
        <v-container>
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
                noticeList : [],
                order : 'notice_no',
                reason : '',
                modalCheck: false,
                nums : 0,
                startNum : 0,
                totalList: "",
                totals :'',
                re1 : '',
                re2 : ''
            }
        },
        components : {
        list,
        page
        },
        created(){
            window.scrollTo(0, 0);
            this.total();
        },
        methods : {
            async total() {
                let total = await axios.get(`/api/notice`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getInquireList(){
                let result = await axios.get(`/api/notice/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                for(let i=0;i<result.data.length;i++){
                    if(result.data[i].notice_content.length>10){
                        result.data[i].notice_content = result.data[i].notice_content.substring(0,10)+' ... 더보기';
                    }
                }
                this.noticeList = result.data;
            },
            async changePage(no) {
                let list = await axios.get(`/api/notice/${this.order}/${no}/${this.nums}`).catch(err=>console.log(err));
                for(let i=0;i<list.data.length;i++){
                    if(list.data[i].notice_content.length>10){
                        list.data[i].notice_content = list.data[i].notice_content.substring(0,10)+' ... 더보기';
                    }
                }
                this.noticeList = list.data;
            },
            insertNotice(){
                this.$router.push({path : "insertNotice"})
            },
            refresh(){
                this.getInquireList();
                this.reason = '';
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
                this.totals = childData;
            },
            async reasonList(){
                if(this.reason=='중요'){
                    this.re1='l1'
                    this.re2='l1'
                }else if(this.reason=='일반'){
                    this.re2='l2'
                    this.re1='l2'
                }else if(this.reason==''){
                    this.re1 = 'l1';
                    this.re2 = 'l2';
                }
                console.log('실행..'+this.re1,this.re2)

            let list = await axios.get(`/api/notice/${this.re1}/${this.re2}/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
            for(let i=0;i<list.data.length;i++){
                    if(list.data[i].notice_content.length>10){
                        list.data[i].notice_content = list.data[i].notice_content.substring(0,10)+' ... 더보기';
                    }
                }
            this.noticeList = list.data;
            },
            modNotice(no){
               this.$router.push({path : "insertNotice", query : {no : no}}) 
            }
        },
        watch : {
            nums(){
                this.getInquireList();
            },
            order(){
                this.reasonList();
            },
            reason(){
                this.reasonList();
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
  v-btn{
    border-radius: 10px;
  }
  .cur{
    cursor: pointer;
  }
</style>