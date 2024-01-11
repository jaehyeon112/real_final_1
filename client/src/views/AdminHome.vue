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
  methods:{
    showNotification(message) {
      // 사용자가 알림을 허용했는지 확인
      if (Notification.permission == 'granted') {
        // 알림 생성 및 표시
        const notification = new Notification('새 알람', {
          body: message, // 메시지 본문
        })}}
  },
  created() {
   
    this.$socket.on('test', (m)=>{
        this.showNotification(m);
      })
      this.$socket.on('report', (m)=>{
        this.showNotification(m);
      })

      this.$socket.on('order', (m)=>{
      this.showNotification(m)
      })

      this.$socket.on('report', (m)=>{
      this.showNotification(m)
      })

      if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    if(this.$store.state.user.user_id == 'admin2'){
      this.$socket.emit('joinRoom', 'ADMIN');
      this.$router.push({path : "/admin/Main"})
    }else{
      this.$router.push({path : "/admin/Adminlogin"});
      this.$store.commit('logout');
    }
  },

}
</script>