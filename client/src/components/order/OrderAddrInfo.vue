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
        <v-col cols="2">
          <v-btn @click="moveMypage" style="background-color: bisque">마이페이지</v-btn>
        </v-col>
        <v-col>
          <v-btn @click="moveMain" style="background-color: lightgrey;">메인페이지</v-btn>
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
  width : 20%;
  font-weight: bold;
}
</style>