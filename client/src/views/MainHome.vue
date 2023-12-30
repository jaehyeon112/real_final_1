<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "../layouts/MainHeader.vue";
import Footer from "../layouts/MainFooter.vue";
export default {
  components: {
    Header,
    Footer,
  },
  created() {
    // this.$router.push({ path: "/main" });
  },
};
</script>

<style></style>
