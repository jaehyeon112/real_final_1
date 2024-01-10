<template>
    <v-container>
      <h1>배송지 정보</h1>
      <hr>
      <div v-if="orderList.length > 0">
        <p><span class="label">이름</span>
          <span>{{ orderList[0].recipient }}</span>
        </p>
        <p><span class="label">전화번호</span>
          <span>{{ orderList[0].recipient_tel }}</span>
        </p>
        <p><span class="label">받으실 주소</span>
          <span>{{ '['+orderList[0].recipient_postcode + '] ' + orderList[0].recipient_address + orderList[0].recipient_detail_address  }}</span>
        </p>
        <p><span class="label">요청사항</span>
          <span>{{ orderList[0].delivery_request }}</span>
        </p>
      </div>
      <br>
      <v-row>
        <v-col cols="2" sm="7"></v-col>
        <v-col>
          <v-btn width="150" height="60" @click="moveMypage" style="background-color: white; font-weight: 600; font-size: 20px" >마이페이지</v-btn>
        </v-col>
        <v-col cols="">
          <v-btn width="150" height="60" @click="moveMain" style="background-color: lightgrey; color: white; font-weight: 600; font-size: 20px">메인페이지</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
  export default {
    data(){
        return{

        }
        
    },
    props: {
        orderList: {
            type: Array,
        }
    },
    methods:{
      moveMypage(){
        this.$router.push('/myPage')
      },
      moveMain(){
        this.$router.push('/main')
      }
    }
  }
</script>
<style scoped>
.label {
    display: inline-block;
    width: 20%;
    font-size: large;
    font-weight: 600;
}
ul {
  display: flex;
  list-style: none;
}
</style>