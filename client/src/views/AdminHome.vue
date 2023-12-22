<template>
  
  <div>
    <Header/>
    <div>
    <side/>
  </div>
관리자 페이지입니다
<Footer/>
  </div>
  
</template>
<script>
import Header from '../layouts/AdminHeader.vue';
import Footer from '../layouts/MainFooter.vue';
import side from '../layouts/SideBar.vue';
export default {
    components : {
    Header,
    Footer,
    side
  }
}
</script>