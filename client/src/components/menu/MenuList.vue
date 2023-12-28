<template>
  <v-container>
    <span>{{ prodList.prod_no }}구분!!</span>
    <v-card class="mx-auto" max-width="300">
      <!-- 해당 제품으로 이동 -->
      <router-link to="/">
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
          <div v-if="isSoldOut" class="soldout-overlay">상품 준비 중</div>
        </div>
      </router-link>

      <v-card-subtitle class="pt-4"> 1조꺼 </v-card-subtitle>

      <v-card-text>
        <div>{{ prodList.prod_name }}</div>
        <!-- 상품 부가 정보 -->
        <div>
          <span>{{ prodList.discount_rate }}%</span>
          <span>{{ prodList.discount_price }}원(판매가)</span
          ><span>{{ prodList.price }}원(원가)</span>
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
    };
  },
  props: ["prodList"],
  methods: {
    soldout() {
      if (this.prodList.soldout == 1) {
        this.isSoldOut = true;
      }
    },
    imageLoaded() {
      this.soldout();
    },
    goToCart(){
      alert("장바구니 만들고 난 뒤에~")
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
</style>
