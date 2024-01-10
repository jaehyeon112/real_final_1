<template>
    <div class="container-fluid" style:width="50px">
    <div class="row">
        <side/>
    <main class="col-md-9 col-lg-10 px-md-4">
    <v-card flat title="탈퇴한 회원목록">
      
      <v-data-table
        :headers="headers"
        :items="outList"
        :search="search"
      ></v-data-table>
    </v-card>
    </main>
    </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import side from '../components/admin/SideBar.vue';

    export default {
      data () {
        return {
          startNo : '',
          lastNo : '',
          search: '',
          order : '',
          headers: [
            {
              align: 'start',
              key: 'user_id',
              sortable: false,
              title: '아이디',
            },
            { key: 'withdrawal_date', title: '탈퇴날짜' },
            { key: 'withdrawal_reason', title: '탈퇴사유' },
          ],
          outList : [],
        }
      },
      created () {
        window.scrollTo(0, 0);
        this.list();
      },
    methods : {
        async list() {
            let total = await axios.get(`/api/outUser`).catch((err) => {
                console.log(err);
            });
            for(let i=total.data.length-1;i>=0;i--){
              total.data[i].withdrawal_date = this.dateFormat(total.data[i].withdrawal_date,'yyyy년 MM월 dd일');
              if(total.data[i].withdrawal_reason=='w1'){
                total.data[i].withdrawal_reason = '사고싶은 제품이 없어서'
              }else if(total.data[i].withdrawal_reason=='w2'){
                total.data[i].withdrawal_reason = '더 좋은 사이트를 발견해서'
              }else if(total.data[i].withdrawal_reason=='w3'){
                total.data[i].withdrawal_reason = '가격이 너무 비싸서'
              }else{
                if(total.data[i].withdrawal_detail_reason==null){
                  total.data[i].withdrawal_detail_reason = '사유없음'
                }
                total.data[i].withdrawal_reason = '기타 : '+ total.data[i].withdrawal_detail_reason
              }
            }
            this.outList = total.data;
        },
        dateFormat(value, format) {
          let date = value == "" ? new Date() : new Date(value);
          let year = date.getFullYear();
          let month = ("0" + (date.getMonth() + 1)).slice(-2);
          let day = ("0" + date.getDate()).slice(-2);

          let result = format
            .replace("yyyy", year)
            .replace("MM", month)
            .replace("dd", day);
          return result;
        },
    },
    components : {
        side
    },
}
</script>
<style scoped>
.col-md-9 {
  margin: 0 auto;
  padding: 10px;
}
</style>