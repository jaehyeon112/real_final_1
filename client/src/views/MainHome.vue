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
  methods: {
    async clickEvent() {
      this.$showLoading();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.$hideLoading();
    },
  },
  components: {
    Header,
    Footer,
  },
  created() {
    this.$router.push({ path: "/main" });
  },
};
</script>

<style></style>
