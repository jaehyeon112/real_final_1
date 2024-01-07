<template>
  <div>
    <Header />
    <router-view :key="$route.fullPath" />
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
    this.$socket.on('alert',(m)=>{
      this.showNotification(m)
    })
    this.$socket.on('login',(m)=>{
      this.showNotification(m)
    })
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    

   
    // this.$router.push({ path: "/main" });
  },mounted(){
    //알람 표시
     
   
  },
  methods:{
    
    

    showNotification(message) {
  // 사용자가 알림을 허용했는지 확인
  if (Notification.permission === 'granted') {
    // 알림 생성 및 표시
    const notification = new Notification('새 알람', {
      body: message, // 메시지 본문
    })}},
  }
  
};
</script>

<style></style>
