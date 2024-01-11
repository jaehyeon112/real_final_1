<template>
  <div>
    <carousel />
    <v-container justify="center">
      <h1 style="margin-bottom: 20px;  margin-top: 100px; font-weight: 700;">생생한 리뷰</h1>
      <review />
      <h1 style="margin-bottom: 20px; margin-top: 100px; font-weight: 700;">실시간 베스트</h1>
      <v-row>
        <v-col cols="4" v-for="test in list" :key="test">
            <menulist :prodList="test" /> 
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import carousel from "@/components/main/MainCarousel.vue";
import menulist from "@/components/menu/MenuList.vue";
import review from "@/components/main/review.vue";
import upload from "@/components/menu/upload.vue";
import axios from "axios"
export default {
  components: {
    carousel,
    menulist,
    review,
    upload,
  },
  data(){
    return{
      list : []
    }
  },
  methods: {
    async productList(){
      let proList = await axios.get("/api/mainbest/#");
      this.list = proList.data;
    }
    
  },
  created(){
    this.productList();
  }
};
</script>

<style></style>
