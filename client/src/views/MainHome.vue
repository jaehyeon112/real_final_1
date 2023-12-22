<template>
  <div>
  <Header/>
  <div>
    <router-view/>
  </div>
  <Footer/>
</div>
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
