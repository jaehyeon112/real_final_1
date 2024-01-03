<template>
    <v-container>
      <h1>배송지 정보</h1>
      <hr>
      <div>
        <p>배송지 <span style="font-size: 30px;">{{ this.$store.state.user.address }}  {{ this.$store.state.user.detail_address }} {{ this.$store.state.user.postcode }}</span></p>
      </div>
      <v-btn @click="moveMypage">마이페이지</v-btn>
      <v-btn @click="moveMain">메인페이지</v-btn>
    </v-container>
</template>
<script>
  export default {
    data(){
        return{

        }
    },
    methods:{
      moveMypage(){
        this.$router.push('/')
      },
      moveMain(){
        this.$router.push('/main')
      }
    }
  }
</script>
