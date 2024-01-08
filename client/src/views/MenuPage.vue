<template>
  
  
  <div>

    <bread :breadcrumb="breadcrumb" />
    <v-row>
      <v-col cols="3">
        <filterSide @getSearch="setinput" />
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="4" v-for="test in list" :key="test">
            <menulist :prodList="test">
            </menulist>
          </v-col>
          <v-container v-if="loading" justify="">
            <p>데이터를 불러오는 중입니다...</p>
          </v-container>
          <v-container v-else-if="list.length==0" justify="">
            <p>찾는 상품이 없습니다.</p> 
          </v-container>
        </v-row>
      </v-col>
    </v-row>
    <v-container>
      <pagination  ref="pagination1" @changePage="changePage" v-bind:list="totalList" :totals="totals" ></pagination>
    </v-container>
    <v-btn @click="socketTest">우하하</v-btn>
  </div>
</template>

<script>
import filterSide from "@/components/menu/filter.vue";
import menulist from "@/components/menu/MenuList.vue";
import pagination from "@/components/common/Pagination";
import axios from "axios";
import bread from '@/components/common/bread.vue'
export default {
  props: ['category','type'],
  data() {
    return {
      breadcrumb:[],
      loading:false,
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
      condition:'',
    };
  },
  methods: {
    getCategory(){
      switch(this.category){
        case 'main':
          this.mainCategory = 'main_category';
          break;
        case 'new':
          this.mainCategory = '신상품';
          break;
        case 'sub':
          this.mainCategory = 'sub_category';
          break;
        case 'frozen':
          this.mainCategory = 'refrigeration';
          break;
      }
      switch(this.type){
        case 'e1' :
          this.condition = '한식'
          break;
        case 'e2' :
          this.condition = '중식'
          break;
        case 'e3' :
          this.condition = '양식'
          break;
        case 'e4' :
          this.condition = '일식'
          break;
        case 'e5' :
          this.condition = '분식'
          break;
        case 'e6' :
          this.condition = '동남아'
          break;
      } 
    }
    ,

    async total() { // 페이지네이션
      if(this.category == null){
        let total = await axios.get("/api/show").catch((err) => {console.log(err);});
        this.totalList =  total.data;
      }else if(this.category == 'main'){
        let total = await axios.get(`/api/show/${this.mainCategory}/${this.type}`).catch((err) => {console.log(err);});
        this.totalList = total.data;
      }else if(this.category == 'new'){
        let total = await axios.get(`/api/new2/X/X/X/X/X`).catch((err) => {console.log(err);});
        this.totalList = total.data;
      }else if(this.category == 'frozen'){
        let total = await axios.get(`/api/frozen/X/X/X/X/X`).catch((err) => {console.log(err);});
        this.totalList = total.data;
      }else if(this.category == `best`){
        this.totalList = (await axios.get('/api/best')).data;
      
      }else if(this.category == `sale`){
        this.totalList = (await axios.get('/api/sale')).data;
      }

    },
    async setinput(first,last,price){ // 필터 버튼 누르면?
      this.first = first;
      this.last = last;
      this.price = price;
      this.pageNo = 0;
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
        if(first == '' && price ==''){
          this.productList();
          this.total();
          return;
        }
        this.$refs.pagination1.currentPage1()
        if(this.category == 'best'){
          let queryString = '?'
        if(this.first != ''){
          queryString += `&first=${first}&last=${last}`
        }
        if(this.price != ''){
          queryString += `&A=${this.betweenA}&B=${this.betweenB}`
        }
        
        let total = (await axios.get(`/api/best${queryString}`)).data
        this.totalList = total
        queryString += `&no=${this.pageNo}`
        this.list = (await axios.get(`/api/best${queryString}`)).data //페이지
        return;
        }
        if(this.category == 'sale'){
          let queryString = '?'
        if(this.first != ''){
          queryString += `&first=${first}&last=${last}`
        }
        if(this.price != ''){
          queryString += `&A=${this.betweenA}&B=${this.betweenB}`
        }
        
        let total = (await axios.get(`/api/sale${queryString}`)).data
        this.totalList = total
        queryString += `&no=${this.pageNo}`
        this.list = (await axios.get(`/api/sale${queryString}`)).data //페이지
        return;
        }

        if(price == '' && first != '' && this.category == null){ // 글자만 필터
          this.$showLoading();
        let pageResult = await axios.get(`/api/wordFilter/${first}/${last}`).catch((err) => {console.log(err)});
        let listResult = await axios.get(`/api/wordFilter/${first}/${last}/${this.pageNo}`).catch((err) => {console.log(err)});
        this.$hideLoading();
        this.totalList = pageResult.data; 
        this.list = listResult.data;
        return
      }else if(price == '' && first != '' && this.category != null){ //
        if(this.category == 'main' || this.category == "sub"){
          this.$showLoading();
          let pageResult = await axios.get(`/api/wordFilter/${first}/${last}/${this.mainCategory}/${this.type}`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/wordFilter/${first}/${last}/${this.mainCategory}/${this.type}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; 
          this.list = listResult.data; 
          return
        }else if(this.category == 'new'){
          this.$showLoading();
          let pageResult = await axios.get(`/api/new2/${first}/${last}/X/X/X`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/new2/${first}/${last}/X/X/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
        }else if(this.category == 'frozen'){
          this.$showLoading();
          let pageResult = await axios.get(`/api/frozen/${first}/${last}/X/X/X`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/frozen/${first}/${last}/X/X/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
        }
      }
      if(first=='' && price != ''  && this.category != null){
        if(this.category == 'main' || this.category == "sub"){
      this.$showLoading();
          let pageResult = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}/${this.mainCategory}/${this.type}`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}/${this.mainCategory}/${this.type}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
          return;
        }else if(this.category == "new"){
          this.$showLoading();
          let pageResult = await axios.get(`/api/new2/X/X/${this.betweenA}/${this.betweenB}/X`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/new2/X/X/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
        }else if(this.category == "frozen"){
          this.$showLoading();
          let pageResult = await axios.get(`/api/frozen/X/X/${this.betweenA}/${this.betweenB}/X`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/frozen/X/X/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
        }
      }else if(first=='' && price != ''  && this.category == null){
        this.$showLoading();
          let pageResult = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
          return;
      }

      if(price != '' && first != ''  && this.category == null ){
        this.$showLoading();
          let pageResult = await axios.get(`/api/bothFilter/${first}/${last}/${this.betweenA}/${this.betweenB}`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/bothFilter/${first}/${last}/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
          return;
        }else if(price != '' && first != ''  && this.category != null){
          if(this.category == 'main' || this.category == "sub"){
            this.$showLoading();
              let pageResult = await axios.get(`/api/bothFilter/${first}/${last}/${this.betweenA}/${this.betweenB}/${this.mainCategory}/${this.type}`).catch((err) => {console.log(err)});
              let listResult = await axios.get(`/api/bothFilter/${first}/${last}/${this.betweenA}/${this.betweenB}/${this.mainCategory}/${this.type}/${this.pageNo}`).catch((err) => {console.log(err)});
              this.$hideLoading();
              this.totalList = pageResult.data; // 페이징맞추고..
              this.list = listResult.data; // 리스트를 맞추자..
              return;
          }else if(this.category == "new"){
            this.$showLoading();
          let pageResult = await axios.get(`/api/new2/${first}/${last}/${this.betweenA}/${this.betweenB}/X`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/new2/${first}/${last}/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
          return;
          }else if(this.category == "frozen"){
            this.$showLoading();
          let pageResult = await axios.get(`/api/frozen/${first}/${last}/${this.betweenA}/${this.betweenB}/X`).catch((err) => {console.log(err)});
          let listResult = await axios.get(`/api/frozen/${first}/${last}/${this.betweenA}/${this.betweenB}/${this.pageNo}`).catch((err) => {console.log(err)});
          this.$hideLoading();
          this.totalList = pageResult.data; // 페이징맞추고..
          this.list = listResult.data; // 리스트를 맞추자..
          return;
          }  
      }

}
    ,
    async productList() { //물건 리스트 보여주기
      this.pageNo = 0;
      if(this.category == null){
        this.loading = true;
  this.$showLoading();
  let proList = await axios.get("/api/show/" + this.pageNo);
  this.list = proList.data;
  this.$hideLoading();
  this.loading = false;
      }else if(this.category == 'main' || this.category == 'sub'){
        let proList = await axios.get(`/api/show/${this.mainCategory}/${this.type}/${this.pageNo}`)
        this.list = proList.data;
      }else if(this.category == 'new'){
        let proList = await axios.get(`/api/new/${this.pageNo}`)
        this.list = proList.data;
      }else if(this.category == 'frozen'){
        let proList = await axios.get(`/api/frozen/X/X/X/X/${this.pageNo}`)
        this.list = proList.data;
      }else if(this.category == 'best'){
        this.list = (await axios.get(`/api/best?no=${this.pageNo}`)).data
      }else if(this.category == 'sale'){
        this.list = (await axios.get(`/api/sale?no=${this.pageNo}`)).data
      }
    },
    
    
    async changePage(no) { //페이지 눌렀을때 이동

      if(this.category == null){
        if(this.first == '' && this.price == ''){ //필터 없을 때
          let page = await axios.get("/api/show/" + no).catch (err=>{console.log(err)})
          this.list = page.data;
          return;
        }
        if(this.first != '' && this.price == '' ){ // 글자 필터 적용
          let page = await axios.get(`/api/wordFilter/${this.first}/${this.last}/${no}`).catch(err=>{console.log(err)})
          this.list=page.data;
          return;
        }
        if(this.first == '' && this.price != ''){ // 가격필터 적용
          let page = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)});
          this.list = page.data;
          return;
        }
        if(this.first != '' && this.price != ''){ // 필터 둘다 적용
          let listResult = await axios.get(`/api/bothFilter/${this.first}/${this.last}/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)});
          this.list = listResult.data;
          return
        }
      }else if(this.category=='main' || this.category == 'sub'){
        if(this.first == '' && this.price == ''){ // 필터 없이 전체
          let page = await axios.get(`/api/show/${this.mainCategory}/${this.type}/${no}`).catch (err=>{console.log(err)})
          this.list = page.data;
          return;
        }
        if(this.first != '' && this.price == '' ){ // 글자 필터 적용
          let page = await axios.get(`/api/wordFilter/${this.first}/${this.last}/${this.mainCategory}/${this.type}/${no}`).catch(err=>{console.log(err)})
          this.list=page.data;
          return;
        }
        if(this.first == '' && this.price != ''){ //가격 필터 적용
          let page = await axios.get(`/api/priceFilter/${this.betweenA}/${this.betweenB}/${this.mainCategory}/${this.type}/${no}`).catch((err) => {console.log(err)});
          this.list = page.data;
          return;
        }
        if(this.first != '' && this.price != ''){ //필터 둘다 적용
          let listResult = await axios.get(`/api/bothFilter/${this.first}/${this.last}/${this.betweenA}/${this.betweenB}/${this.mainCategory}/${this.type}/${no}`).catch((err) => {console.log(err)});
          this.list = listResult.data;
          return;
        }
      }else if(this.category=='new'){
        if(this.first == '' && this.price == ''){ // 필터 없이 전체
          let listResult = await axios.get(`/api/new2/X/X/X/X/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
        if(this.first != '' && this.price == '' ){ // 글자 필터 적용
          let listResult = await axios.get(`/api/new2/${this.first}/${this.last}/X/X/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
        if(this.first == '' && this.price != ''){ //가격 필터 적용
          let listResult = await axios.get(`/api/new2/X/X/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
        if(this.first != '' && this.price != ''){ //필터 둘다 적용
          let listResult = await axios.get(`/api/new2/${this.first}/${this.last}/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
        // queryString으로 처리하자...
      }else if(this.category=='sale'){
        let queryString = '?'
        if(this.first != ''){
          queryString += `&first=${this.first}&last=${this.last}`
        }
        if(this.price != ''){
          queryString += `&A=${this.betweenA}&B=${this.betweenB}`
        }
        queryString += `&no=${no}`
        this.list = (await axios.get(`/api/sale${queryString}`)).data
        return
      }else if(this.category=='best'){

        let queryString = '?'
        if(this.first != ''){
          queryString += `&first=${this.first}&last=${this.last}`
        }
        if(this.price != ''){
          queryString += `&A=${this.betweenA}&B=${this.betweenB}`
        }
        queryString += `&no=${no}`
        this.list = (await axios.get(`/api/best${queryString}`)).data
        return
      }else if(this.category=='frozen'){
        if(this.first == '' && this.price == ''){ // 필터 없이 전체
          let listResult = await axios.get(`/api/frozen/X/X/X/X/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
        if(this.first != '' && this.price == '' ){ // 글자 필터 적용
          let listResult = await axios.get(`/api/frozen/${this.first}/${this.last}/X/X/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
        if(this.first == '' && this.price != ''){ //가격 필터 적용
          let listResult = await axios.get(`/api/frozen/X/X/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
        if(this.first != '' && this.price != ''){ //필터 둘다 적용
          let listResult = await axios.get(`/api/frozen/${this.first}/${this.last}/${this.betweenA}/${this.betweenB}/${no}`).catch((err) => {console.log(err)})
          this.list = listResult.data
          return;
        }
      }
    },
  
    bread(){
      this.breadcrumb.push(this.$route.fullPath)
    }
      
  },
  created() {
    this.getCategory();

    this.productList();
    this.total();

    this.bread();
  },
  components: {
    filterSide,
    menulist,
    pagination,
    bread
  },
  mounted() {
    
  },
  unmounted() {
  }
};
</script>

<style></style>