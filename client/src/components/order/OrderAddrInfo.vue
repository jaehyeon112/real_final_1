<template>
    <v-container>
      <h1>배송지 정보</h1>
      <hr>
      <div v-if="orderList.length > 0">
        <p>이름
          <span>{{ orderList[0].recipient }}</span>
        </p>
        <p>전화번호
          <span>{{ orderList[0].recipient_tel }}</span>
        </p>
        <p>받으실 주소
          <span>{{ '['+orderList[0].recipient_postcode + '] ' + orderList[0].recipient_address + orderList[0].recipient_detail_address  }}</span>
        </p>
        <p>요청사항
          <span>{{ orderList[0].delivery_request }}</span>
        </p>
      </div>
      <div>
        <v-btn @click="moveMypage" style="background-color: lightgreen;">마이페이지</v-btn>
        <v-btn @click="moveMain" style="background-color: lightgreen;">메인페이지</v-btn>
      </div>
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
        this.$router.push('/')
      },
      moveMain(){
        this.$router.push('/main')
      }
    }
  }
</script>
