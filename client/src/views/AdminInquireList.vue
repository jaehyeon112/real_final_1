<template>
    <list>
        <template #title>고객 문의목록</template>
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
          <td class=cur @click="replyInsert(inquire.inquire_no)">{{ inquire.inquire_content }}</td>
          <td v-if="inquire.inquire_category=='j1'">상품문의</td>
          <td v-else-if="inquire.inquire_category=='j2'">배송문의</td>
          <td v-else-if="inquire.inquire_category=='j1'">환불문의</td>
          <td v-else>기타문의</td>
          <td>{{ $dateFormat(inquire.create_date,'yyyy년 MM월 dd일') }}</td>
          <td v-if="inquire.answer_state==0">답변대기중</td>
          <td v-else-if="inquire.answer_state==1">답변완료</td>
          <td class=cur v-if="inquire.answer_state==0" @click="replyInsert(inquire.inquire_no)">답변하기</td>
          <td class=cur v-else-if="inquire.answer_state==1" @click="replyInsert(inquire.inquire_no)">답변보기</td>
        </tr>
      </tbody>
      <tbody v-if="inquireList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 문의사항이 없습니다</h3></td></tr>
        </tbody>
        <v-container v-if="inquireList.length!=0">
          <page ref="pagination1" @changePage="changePage" :list="totalList" :totals="10"></page>
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
                startNum : 0,
                totalList: "",
                totals :'',
            }
        },
        components : {
        list,
        page
        },
        created(){
            window.scrollTo(0, 0);
            this.total();
            this.getInquireList(this.startNum);
        },
        methods : {
            async total() {
                let total = await axios.get(`/api/inquire`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getInquireList(no){
                let result = await axios.get(`/api/inquire/${no}`).catch(err=>console.log(err));
                for(let i=0;i<result.data.length;i++){
                    console.log(result.data[i].inquire_content)
                    if(result.data[i].inquire_content.length>10){
                        result.data[i].inquire_content = result.data[i].inquire_content.substring(0,10)+' ... 더보기';
                    }
                }
                this.inquireList = result.data;
                this.total();
            },
            async changePage(no) {
                if(this.reason==''&&this.reason2==''){
                    this.getInquireList(no)
                }else if(this.reason!=''||this.reason2!=''){
                    this.reasonList(this.reason,this.reason2,no);
                }
            },
            refresh(){
                this.getInquireList(this.startNum);
                this.reason = '';
                this.reason2 = '';
            },
            search(re,re2){
                this.reasonList(re,re2,this.startNum);
            },
            async reasonList(re,re2,no){
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
                    let list = await axios.get(`/api/inquire/${re2}/${re}/''/''/${no}`).catch(err=>console.log(err));
                    let result = list.data;
                    console.log(result)
                    this.inquireList = result;
                }else if(re!=null&&re2!=null){
                    let list = await axios.get(`/api/inquire/''/''/${re2}/${re}/${no}`).catch(err=>console.log(err));
                    let result = list.data;
                    console.log(result)
                    this.inquireList = result;
                }
            },
            replyInsert(ino){
                this.$router.push({path : "reply",query : {ino:ino}})
            }
        },        
    }
    </script>
<style scoped>
  v-btn{
    border-radius: 10px;
  }
  .cur{
    cursor: pointer;
  }
</style>