<template>
  <div>
    <Header />
    <bread />
    <router-view :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
import Header from "../layouts/MainHeader.vue";
import Footer from "../layouts/MainFooter.vue";
import bread from '@/components/common/BreadCrumb.vue'
export default {
  components: {
    Header,
    Footer,
    bread
  },
  created() {
    // this.$router.push({ path: "/main" });
  },
};
</script>

<style></style>
