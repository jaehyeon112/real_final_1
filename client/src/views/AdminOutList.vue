<template>
    <div class="container-fluid" style:width="50px">
    <div class="row">
        <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <v-card
      flat
      title="탈퇴한 회원"
    >
      <!-- <div style="float: right;"><a @click="this.order='review_writedate'">기본순 | </a><a @click="this.order='review_grade'">별점 높은순 | </a><a @click="this.order='desc'">별점 낮은순 | </a><a @click="this.order='like_cnt'">좋아요 많은 순</a></div><br> -->
      
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