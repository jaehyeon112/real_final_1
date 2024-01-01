<template>
    <div class="container-fluid" style:width="50px">
    <div class="row">
        <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <v-card
      flat
      title="리뷰 리스트"
    >
      <div style="float: right;"><a @click="this.order='review_writedate'">기본순 | </a><a @click="this.order='review_grade'">별점 높은순 | </a><a @click="this.order='desc'">별점 낮은순 | </a><a @click="this.order='like_cnt'">좋아요 많은 순</a></div><br>
      
      <v-data-table
        :headers="headers"
        :items="reviewList"
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
          order : 'review_writedate',
          headers: [
            {
              align: 'start',
              key: 'prod_name',
              sortable: false,
              title: '상품명',
            },
            { key: 'order_detail_no', title: '주문상세번호' },
            { key: 'user_id', title: '회원명' },
            { key: 'review_title', title: '제목' },
            { key: 'review_content', title: '내용' },
            { key: 'review_writedate', title: '작성일' },
            { key: 'review_grade', title: '별점' },
            { key: 'like_cnt', title: '좋아요 수' },
          ],
          reviewList : [],
          orderList : []
        }
      },
      created () {
        this.list();
      },
      methods : {
        async list() {
          if(this.order=='desc'){
            let total = await axios.get(`/api/review/review_grade`).catch((err) => {
                console.log(err);
            });
            for(let i=total.data.length-1;i>=0;i--){
              total.data[i].review_writedate = this.dateFormat(total.data[i].review_writedate,'yyyy년 MM월 dd일');
              this.orderList.push(total.data[i]);
            }
            this.reviewList = this.orderList;
          }else{
            let total = await axios.get(`/api/review/${this.order}`).catch((err) => {
                console.log(err);
            });
            for(let i=0;i<total.data.length;i++){
              total.data[i].review_writedate = this.dateFormat(total.data[i].review_writedate,'yyyy년 MM월 dd일');
            }
            this.reviewList = total.data;
          }
          this.orderList = []
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
        async orderDate(){
          let total = await axios.get(`/api/orders/${this.startNo}/${this.lastNo}`).catch((err) => {console.log(err);});
          for(let i=0;i<total.data.length;i++){
              total.data[i].order_date = this.dateFormat(total.data[i].order_date,'yyyy년 MM월 dd일');
            }
          this.reviewList = total.data;
        },
        refresh(){
          this.list();
          this.startNo ='';
          this.lastNo = ''
        }
      },
      components : {
        side
      },
      watch:{
        order(){
          this.list();
        }
      }
    }
  </script>