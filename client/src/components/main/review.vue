<template>
  <div>
    <v-card class="my-card" style="padding:30px;"  >
      <v-row justify="start" class="hi">
        <v-col style=" font-size:20px">
          <span style="color:gray;">{{review.user_id}}</span><span> 님께서 남기신 리뷰 입니다.</span>
        </v-col>
      </v-row>
      <v-row justify="space-between"  style="cursor: pointer;"  @click="$router.push({path:'/detailPage', query:{pno : review.prod_no}})">
        <v-col cols="4">
          <span><p style="font-size:30px; font-weight: 700;">{{  review.review_title}}</p></span>  
          <span><p style="font-size:24px">{{  review.review_content}}</p></span>
          
          <span style="font-size: 40px;" v-for="star in 5" :key="star">
            
          <span class="mdi mdi-star" :style="{ color: star <= review.review_grade ? 'coral' : 'grey' }"></span>
          </span>
          
          <p style="font-size: 25px; margin-top:150px;">{{ review.prod_name + '에 관한 내용입니다.' }}</p>
          <p style="color:gray" >클릭시 상품 페이지로 이동합니다.</p>
        </v-col>
        <v-col cols="5" >

          <v-img style="position:relative;
        "
        height="500"
        width="700"
       
        :src="`/api/test/`+review.reviewfile"
        ></v-img
        ><v-img
        class="align-center text-white"
        height="250"
          width="250"
          style="border-radius: 50%; position:absolute; bottom:10px;
    right: 500px;"
        :src="`/api/test/`+review.prodfile"
          cover
          ></v-img
          >
        </v-col>
        </v-row>
      </v-card>
    </div>
  </template>

<script>
import axios from "axios"
export default {
  data(){
    return{
      review : {}
    }
  },
  created(){
    this.getReview();
  },
  methods:{
  
     async getReview(){
      const response = await axios.get('/api/mainreview');
      this.review = response.data[0]
      if(this.review.review_content.length > 25){
        this.review.review_content = this.review.review_content.substring(0, 25) + ' ...더보기'
      }
     this.review.user_id = this.review.user_id.substring(0, 3) + '*'.repeat(this.review.user_id.length - 3)
    }
  }
};
</script>

<style scoped>
.my-card {
  height: 700px; /* 또는 원하는 값으로 조정 */
}
.hi{
  height: 100px; /* 또는 원하는 값으로 조정 */
  
}


</style>