<template>
  <v-container>
    <h1>{{ word }}을(를) 검색한 내용입니다.</h1>
    <v-row>
          <v-col cols="4" v-for="test in list" :key="test">
            <menulist :prodList="test">
            </menulist>
          </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import menuList from '@/components/menu/MenuList.vue'
export default {
  components: { menuList },

  data(){
    return{
      list : []
    }
  },
  components : {menuList}
  ,
  methods : {
    async test(){
      this.list = await this.$store.state.searchList
      console.log(tthis.list[0].prod_name+" 뭐뜨나?요/*  */")
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