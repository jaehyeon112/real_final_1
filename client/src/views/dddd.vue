<template>
    <div class="container-fluid" style:width="50px">
    <div class="row">
        <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <v-card
      flat
      title="Nutrition"
    >
    
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hide-details
        ></v-text-field>
      </template>

      <v-data-table
        :headers="headers"
        :items="productList"
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
          search: '',
          headers: [
            {
              align: 'start',
              key: 'prod_no',
              sortable: false,
              title: '상품 번호',
            },
            { key: 'prod_name', title: '상품명' },
            { key: 'price', title: '원가' },
            { key: 'discount_price', title: '판매가' },
            { key: 'stock', title: '재고' },
            { key: 'main_category', title: '메인 카테고리' },
          ],
          productList : []
        }
      },
      created () {
        this.list();
      },
      methods : {
        async list() {
                let total = await axios.get(`/api/prod`).catch((err) => {
                    console.log(err);
                });
                this.productList = total.data;
            },
      },
      components : {
        side
      }
    }
  </script>