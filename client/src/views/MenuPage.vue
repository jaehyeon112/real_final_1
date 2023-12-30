<template>
  <div>
    <v-row>
      <v-col cols="3">
<<<<<<< HEAD
        <filterSide @getSearch="setinput" />
=======
        <filterSide />
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="4" v-for="test in list" :key="test">
<<<<<<< HEAD
            <menulist :prodList="test">
            </menulist>
          </v-col>
          <v-container v-if="list.length==0" justify="">
            <p >찾는 상품이 없습니다.</p> 
          </v-container>
=======
            <menulist :prodList="test"> </menulist>
          </v-col>
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
        </v-row>
      </v-col>
    </v-row>
    <v-container>
<<<<<<< HEAD
      <pagination @changePage="changePage" v-bind:list="totalList" :totals="totals" ></pagination>
    </v-container>
  
=======
      <pagination @changePage="changePage" :list="totalList"></pagination>
    </v-container>
    <button @click="changePage(5)">리스트 다르게?</button>
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
  </div>
</template>

<script>
import filterSide from "@/components/menu/filter.vue";
import menulist from "@/components/menu/MenuList.vue";
import pagination from "@/components/common/Pagination";
import axios from "axios";

export default {
  data() {
    return {
<<<<<<< HEAD
      totals:6,
      totalList: "",
      list: "",
      pageNo: 0,
      test : [],
      first:'',
      last:'',
      price:'',
      isWord : false,
      isFilter : false,
      betweenA : '',
      betweenB : '',
      mainCategory:'',
=======
      totalList: "",
      list: "",
      pageNo: 0,
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
    };
  },
  methods: {
    async total() {
      let total = await axios.get("/api/show").catch((err) => {
        console.log(err);
      });
<<<<<<< HEAD
      this.totalList = total.data;
    },
    async setinput(first,last,price){
      this.first = first;
      this.last = last;
      this.price = price;
      if(price == 'top'){
          this.betweenA = 20001;
          this.betweenB = 100000000;
        }else if(price == 'middle'){
          this.betweenA = 10000;
          this.betweenB = 20000;
        }else{
          this.betweenA = 0;
          this.betweenB = 9999;
        }
        console.log(first,last,price);
        if(first == '' && price ==''){
          this.total();
          this.productList();
          return;
        }
        if(price == '' && first != ''){
          this.pageNo = 0;
        this.$showLoading();
        let pageResult = await axios.get(`/api/wordFilter/${first}/${last}`).catch((err) => {console.log(err)});
        let listResult = await axios.get(`/api/wordFilter/${first}/${last}/${this.pageNo}`).catch((err) => {console.log(err)});
        this.$hideLoading();
        this.totalList = pageResult.data; // 페이징맞추고..
        this.list = listResult.data; // 리스트를 맞추자..

      }
      if(first=='' && price != ''){
      this.pageNo = 0;
        
          let pageResult = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
          return;
      }
      if(price != '' && first != ''){
          let pageResult = await axios.get(`/api/bothFilter/${first}/${last}/${this.betweenA}/${this.betweenB}`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/bothFilter/${first}/${last}/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
          return;
      }

}
    ,
=======

      console.log("Total");
      this.totalList = total.data;
      console.log(this.totalList);
    },

>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
    async productList() {
      try {
        let proList = await axios.get("/api/show/" + this.pageNo);
        this.list = proList.data;
      } catch (error) {
        console.error("Error fetching initial page data:", error);
      }
    },
    async changePage(no) {
<<<<<<< HEAD
      if(this.first == '' && this.price == ''){
        let page = await axios.get("/api/show/" + no).catch (err=>{console.log(err)})
        this.list = page.data;
        return;
      }
      if(this.first != '' && this.price == ''){
        let page = await axios.get(`/api/wordFilter/${this.first}/${this.last}/${no}`).catch(err=>{console.log(err)})
        this.list=page.data;
        return;
      }
      if(this.first == '' && this.price != ''){
        let page = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)});
        this.list = page.data;
        return;
      }
      if(this.first != '' && this.price != ''){
        let listResult = await axios.get(`/api/bothFilter/${this.first}/${this.last}/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)});
        this.list = listResult.data;
      }


    },
  
    
=======
      try {
        let page = await axios.get("/api/show/" + no);
        this.list = page.data;
        console.log(page.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    },
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
  },
  created() {
    this.productList();
    this.total();
  },
  components: {
    filterSide,
    menulist,
    pagination,
  },
};
</script>

<style></style>
