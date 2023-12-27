<template>
  <div>
    <carousel />
    <v-container justify="center">
      <h1>실시간 베스트</h1>
      <v-row>
        <v-col v-for="count in 6" :key="count" cols="4">
          <!--  <menulist /> -->
        </v-col>
      </v-row>
      <h1>생생한 리뷰</h1>
      <review />
      <upload />
      <button @click="clickEvent">로딩 오버레이 테스트 버튼</button>
    </v-container>
  </div>
</template>

<script>
import carousel from "@/components/main/MainCarousel.vue";
import menulist from "@/components/menu/MenuList.vue";
import review from "@/components/main/review.vue";
import upload from "@/components/menu/upload.vue";
export default {
  components: {
    carousel,
    menulist,
    review,
    upload,
  },
  methods: {
    async clickEvent() {
      this.$showLoading();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.$hideLoading();
    },
  },
};
</script>

<style></style>
