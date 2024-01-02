<template>
  <v-container>
    <v-card class="mx-auto" max-width="300">
      <!-- 해당 제품으로 이동 -->
      <router-link to="/">
        <div class="image-container">
          <v-img
            class="text-white"
            height="300"
            src="/api/test"
            @load="imageLoaded"
            style="position: relative;"
          >
        <v-dialog transition="dialog-top-transition" width="auto">
          <template  v-slot:activator="{ props }">
            <!--여기를 장바구니 버튼으로~-->
            <div style="position:absolute; top:100px; left:200px"><v-btn  icon="mdi mdi-cart" variant="tonal"  v-on:click.prevent v-bind="props"> </v-btn></div>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card height="300" width="450">
              <v-card-text>
                <v-row >
                  <v-col>
                    <v-img width="50" height="50" src="/api/test"></v-img>
                  </v-col>
                  <v-col cols="auto">
                    <span>{{prodList.prod_name}}</span>
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-col>      <v-btn @click="decreaseQuantity">-</v-btn>
      {{ quantity }}
      <v-btn @click="increaseQuantity">+</v-btn></v-col>
                  <v-col  cols="auto">{{ $wonComma(prodList.discount_price)+'원' }}  </v-col>
                </v-row>
                
                <v-row >
                  
                  <v-col  cols="auto">총 상품금액</v-col><v-col><span style="font-weight: 700; font-size: 20px;">{{ $wonComma(prodList.discount_price*quantity) + '원' }}</span></v-col>
                </v-row>
              </v-card-text>
              <v-card-actions style="margin-bottom: 20px;"  >
                
                <v-row style="margin-left:25px">
                  <v-col>
                    <v-btn width="150" height="40" style="border:1px solid gray;" @click="isActive.value = false"
                      >취소</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn width="150" height="40" style="border:1px solid gray; color:white; background-color: black;" @click="isActive.value = false"
                      >장바구니</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
          </v-img>
          <div v-if="isSoldOut" class="soldout-overlay">품절</div>
          <div v-if="isStock" class="isStock-overlay">상품준비중</div>
        </div>
      </router-link>

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
      quantity : 1
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
        decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity() {
      this.quantity++;
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
