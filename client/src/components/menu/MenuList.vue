<template>
  <v-container>
    <v-card class="mx-auto" max-width="300">
      <!-- 해당 제품으로 이동 -->
      <span @click.stop="goToDetail">
        <div class="image-container">
          <v-img
            class="align-end text-white"
            height="300"
            src="/api/test"
            @load="imageLoaded"
            
          >
            <v-row justify="end" style="margin-right: 30px; margin-bottom: 30px">
              <v-btn icon="mdi mdi-cart" variant="tonal" @click.prevent="goToCart"> </v-btn>
            </v-row>
          </v-img>
          <div v-if="isSoldOut" class="soldout-overlay">품절</div>
          <div v-if="isStock" class="isStock-overlay">상품준비중</div>
        </div>
      </span>

      <v-card-subtitle class="pt-4"> 1조꺼 </v-card-subtitle>

      <v-card-text>
        <div class="title">{{ prodList.prod_name }}</div>
        <!-- 상품 부가 정보 -->
        <div>
          <span id="rate" v-if="prodList.discount_rate!=0">{{ prodList.discount_rate }}<span class="text">%</span></span>
          <span id="discount">{{ $wonComma(prodList.discount_price) }}<span class="text">원</span></span
          ><span id="price" v-if="prodList.discount_price != prodList.price">{{  $wonComma(prodList.price) }}<span class="text">원</span></span>
        </div>
        <div id="type-time">
          <span>냉동 | 조리시간</span>
        </div>
        <v-row justify="end"><span>별점</span> <slot></slot></v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isSoldOut: false,
      isStock: false,
    };
  },
  props: ["prodList"],
  created(){
    this.soldout();
  }
  ,

  methods: {
    soldout() {
      if (this.prodList.soldout == 1) {
        this.isSoldOut = true;
        return;
      }else if(this.prodList.stock < 1){
        this.isStock=true;
      }

      
    },
    goToDetail(){
      this.$router.push({path:'/detailPage', query:{pno : this.prodList.prod_no}})
    },
    goToCart(){
      alert("비회원인데 넣었다 가정!")
      this.$store.commit('addCart',this.prodList)
      console.log(this.$store.state.cart)
    }
  },
};
</script>

<style scoped>
#type-time {
  background-color: coral;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  width: 100px;
  text-align: center;
  margin-top: 10px;
}
.title{
  margin-bottom:10px;
}

#rate{
font-size: 20px;
color: coral;
font-weight: 600;
margin-right: 10px;
}

#discount{
  font-weight: 600;
margin-right: 10px;
font-size: 16px;
}
#price{
  font-weight: 500;
  text-decoration:line-through;
  color:gray;
font-size: 16px;
}
.text{
  font-weight: 400;
  font-size:15px;
}

.image-container {
  position: relative;
  text-align: center;
  line-height: 300px;
  color : red;
  font-size:24px;
}

.soldout-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;

}
.isStock-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
</style>
