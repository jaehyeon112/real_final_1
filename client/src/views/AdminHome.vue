<template>
  <Header/>
<router-view/>
  <Footer/>
  
</template>
<script>
import Header from '../layouts/AdminHeader.vue';
import Footer from '../layouts/MainFooter.vue';
export default {
    components : {
    Header,
    Footer
  },
  created() {
    this.$router.push({path : "/admin/Main"})
  }
}
</script>