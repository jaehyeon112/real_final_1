<template>
    <list @changeemit="changeChildData">
        <template #searchData>
            <div style="width: 250px;float: right;"><v-select
            label="문의처리상태"
            :items="['답변대기중','답변완료']"
            v-model = reason
            variant="underlined"
            return-object
            ></v-select>
            <v-select
            label="문의카테고리"
            :items="['상품문의','배송문의','취소/환불문의','기타문의']"
            v-model = reason2
            variant="underlined"
            return-object
            ></v-select>
            <v-btn @click="search(reason,reason2)">검색하기</v-btn>
            <v-btn @click="refresh">초기화</v-btn></div>
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>문의번호</th>
                <th>문의한 회원</th>
                <th>제목</th>
                <th>내용</th>
                <th>카테고리</th>
                <th>문의날짜</th>
                <th>문의상태</th>
            </tr>
        </thead>
        <tbody>
            <tr
          v-for="inquire in inquireList"
          :key="inquire.inquire_no"
        >
          <td>{{ inquire.inquire_no }}</td>
          <td>{{ inquire.user_id }}</td>
          <td>{{ inquire.inquire_title }}</td>
          <td>{{ inquire.inquire_content }}</td>
          <td v-if="inquire.inquire_category=='j1'">상품문의</td>
          <td v-else-if="inquire.inquire_category=='j2'">배송문의</td>
          <td v-else-if="inquire.inquire_category=='j1'">환불문의</td>
          <td v-else>기타문의</td>
          <td>{{ $dateFormat(inquire.create_date,'yyyy년 MM월 dd일') }}</td>
          <td v-if="inquire.answer_state==0">답변대기중</td>
          <td v-else-if="inquire.answer_state==1">답변완료</td>
          <td v-if="inquire.answer_state==0" @click="replyInsert(inquire.inquire_no)">답변하기</td>
          <td v-else-if="inquire.answer_state==1" @click="replyInsert(inquire.inquire_no)">답변보기</td>
        </tr>
      </tbody>
      <tbody v-if="inquireList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 문의사항이 없습니다</h3></td></tr>
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
                inquireList : [],
                reason : '',
                reason2 : '',
                modalCheck: false,
                nums : 0,
                startNum : 0,
                totalList: "",
                totals :'',
                orders : '',
            }
        },
        components : {
        list,
        page
        },
        created(){
            this.total();
        },
        methods : {
            async total() {
                let total = await axios.get(`/api/inquire`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getInquireList(){
                let result = await axios.get(`/api/inquire/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                for(let i=0;i<result.data.length;i++){
                    console.log(result.data[i].inquire_content)
                    if(result.data[i].inquire_content.length>10){
                        result.data[i].inquire_content = result.data[i].inquire_content.substring(0,10)+' ... 더보기';
                    }
                }
                this.inquireList = result.data;
            },
            async changePage(no) {
                let list = await axios.get(`/api/inquire/${no}/${this.nums}`).catch(err=>console.log(err));
                let result = list.data;
                this.inquireList = result;
            },
            refresh(){
                this.getInquireList();
                this.reason = '';
                this.reason2 = '';
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
                this.totals = childData;
            },
            search(re,re2){
                this.reasonList(re,re2);
            },
            async reasonList(re,re2){
                if(re=='답변대기중'){
                    re='0'
                }else if(re=='답변완료'){
                    re='1'
                }else{
                    re=null
                }

                if(re2=='상품문의'){
                    re2='j1'
                }else if(re2=='배송문의'){
                    re2='j2'
                }else if(re2=='취소/환불문의'){
                    re2='j3'
                }else if(re2=='기타문의'){
                    re2='j4'
                }else{
                    re2=null
                }
                console.log('답변상태 : '+re,'카테고리'+re2)
                if(re==null||re2==null){
                    let list = await axios.get(`/api/inquire/${re2}/${re}/''/''/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                    let result = list.data;
                    console.log(result)
                    this.inquireList = result;
                }else if(re!=null&&re2!=null){
                    let list = await axios.get(`/api/inquire/''/''/${re2}/${re}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                    let result = list.data;
                    console.log(result)
                    this.inquireList = result;
                }
            },
            replyInsert(ino){
                this.$router.push({path : "reply",query : {ino:ino}})
            }
        },
        watch : {
            nums(){
                this.getInquireList();
            },
            orders(){
                this.orderState(this.orders);
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
  v-btn{
    border-radius: 10px;
  }
</style>