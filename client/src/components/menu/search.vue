<template>
  <v-container>
    <v-row justify="center">
      
      <h1>{{ word }}을(를) 검색한 내용입니다.</h1>
    </v-row>
    <v-row>
          <v-col cols="4" v-for="test in list" :key="test">
            <menulist :prodList="test"/>
          </v-col>
    </v-row>
    <pagination ref="pagenation1" @changePage="changePage" v-bind:list="page" :totals="6" ></pagination>
    
  </v-container>
</template>

<script>
  import menulist from '@/components/menu/MenuList.vue'
  import pagination from '@/components/common/Pagination.vue'
  import axios from 'axios'
export default {
  components: { menulist,pagination },

  data(){
    return{
      list : [],
      page : [],
      no : 0
    }
  },
  methods : {
    async test(){
      this.$showLoading()
      this.list = (await axios.get(`/api/searchHeader/${this.word}/${this.no}`).catch(err=>{console.log(err)})).data
      this.page = (await axios.get(`/api/searchHeader/${this.word}`).catch(err=>{console.log(err)})).data
      this.$refs.pagenation1.currentPage1()
      this.$hideLoading()
    }
    ,
  async changePage(no){
    let test = await axios.get(`/api/searchHeader/${this.word}/` + no).catch (err=>{console.log(err)})
          this.list = test.data;
    }
  },
  created(){
    this.test();
  }
  ,
  props:['word']
}
</script>

<style>

</style>