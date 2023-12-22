


<template>
  <Header/>
  <div>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <h1>메인페이지입니다!</h1>
    <button @click="clickEvent">로딩 오버레이 테스트 버튼</button>
  </div>
  <Footer/>
</template>

<script>
import Header from '../layouts/MainHeader.vue'
import Footer from '../layouts/MainFooter.vue'
export default {
  methods: {
    async clickEvent() {
      this.$showLoading();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.$hideLoading();
    },
  },
  components : {
    Header,
    Footer
  }
};
</script>

<style></style>
