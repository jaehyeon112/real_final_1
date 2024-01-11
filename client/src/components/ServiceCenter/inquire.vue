<template>
    <div>
        <div >
            <br>
            <br>
        <table class="table">
            <thead>
                <tr>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>내용</th>
                    <th>답변상태</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="this.inquireList.length == 0" ><td>문의한 내역이 존재하지 않습니다</td></tr>
                <tr  v-else :key="i" v-for="(inquire, i) in inquireList" @click="goToDetail(inquire.inquire_no)">
                    
                    
                    <td v-if="inquire.inquire_category=='j1'">상품문의</td>
                    <td v-else-if="inquire.inquire_category=='j2'">배송문의</td>
                    <td v-else-if="inquire.inquire_category=='j3'">환불문의</td>
                    <td v-else>기타문의</td>

                    <td>{{ formatText(inquire.inquire_title)}}</td>
                    <td>{{ getDateFormat(inquire.create_date) }}</td>
                    <td>{{ formatText(inquire.inquire_content) }}</td>
                    <td v-if="inquire.answer_state==1">답변완료</td>
                    <td v-else>답변 대기</td>
                    <td><v-btn  @click.stop="deleteInquire(inquire.inquire_no)" >문의삭제</v-btn></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            inquireList : []
        };
    },
    created(){
        this.getInquireList();
    },
    watch(){
        
    },
    methods : {
        async getInquireList(){
            this.inquireList = (await axios.get(`/api/myInquire/${this.$store.state.user.user_id}`)
                                   .catch(err => console.log(err))).data;
                                   console.log(this.inquireList)
        },
        goToDetail(inquireNo){
            this.$router.push({path :'myInquireInfo', query : {inquireNo : inquireNo}});
        },
        getDateFormat(date){
            return this.$dateFormat(date,'yyyy년MM월dd일');
        },
        async deleteInquire(no){
        let data = await axios.delete(`/api/deleteInquire/${no}`)
                              .catch(err=>console.log(err));
                  if(data.data.affectedRows>0){                        
                     alert('문의가 삭제되었습니다')
                     this.getInquireList()
                  }
                 
      },
      formatText(text) {
      const maxLength = 10;
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...더보기';
      }
      return text;
    }
             
    }
}
</script>
<style scoped>
    table *{
        text-align: center;
    }
    th{
    background-color: #FFA726;
}
</style>
