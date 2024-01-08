<template>
  <div>
    <Header v-if="this.$store.state.user.user_id!=null"/>
    <router-view/>
    <Footer v-if="this.$store.state.user.user_id!=null"/>
  </div>
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
    if(this.$store.state.user.user_id == null){
      this.$router.push({path : "/admin/login"})
    }else{
      this.$router.push({path : "/admin/Main"})
    }
  }
}
</script>