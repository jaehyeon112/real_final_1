<template>
    <div class="container-fluid" style:width="50px">
    <div class="row">
        <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <v-card
      flat
      title="주문목록"
    >

      <div style="float: right;">날짜별 주문내역 : <input v-model="startNo" type="date"> ~ <input v-model="lastNo" type="date"><v-btn @click="orderDate">검색하기</v-btn></div>
      <v-data-table
        :headers="headers"
        :items="orderList"
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
          headers: [
            {
              align: 'start',
              key: 'order_no',
              sortable: false,
              title: '주문번호',
            },
            { key: 'order_date', title: '주문날짜' },
            { key: 'user_id', title: '주문회원' },
            { key: 'recipient', title: '받는사람' },
            { key: 'recipient_detail_address', title: '주소' },
            { key: 'total_payment', title: '결제금액' },
            { key: 'real_payment', title: '실결제금액' },
            { key: 'payment_method', title: '결제방법' },
            { key: 'order_status', title: '주문상태' },
          ],
          orderList : []
        }
      },
      created () {
        this.list();
      },
      methods : {
        async list() {
                let total = await axios.get(`/api/order`).catch((err) => {
                    console.log(err);
                });
                for(let i=0;i<total.data.length;i++){
                  total.data[i].order_date = this.dateFormat(total.data[i].order_date,'yyyy년 MM월 dd일');
                  if(total.data[i].order_status=='c1'){
                    total.data[i].order_status = '주문완료'
                  }else if(total.data[i].order_status=='c2'){
                    total.data[i].order_status = '상품준비중'
                  }else if(total.data[i].order_status=='c3'){
                    total.data[i].order_status = '출고완료'
                  }
                }
                this.orderList = total.data;
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
                  if(total.data[i].order_status=='c1'){
                    total.data[i].order_status = '주문완료'
                  }else if(total.data[i].order_status=='c2'){
                    total.data[i].order_status = '상품준비중'
                  }else if(total.data[i].order_status=='c3'){
                    total.data[i].order_status = '출고완료'
                  }
                }
          this.orderList = total.data;

        }
      },
      components : {
        side
      }
    }
  </script>