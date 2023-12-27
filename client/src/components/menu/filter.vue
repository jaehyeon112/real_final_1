<template>
  <div style="width: 300px; margin-left: 40px">
    <v-container>
      <v-card  variant="tonal">

        <v-row>
          <v-col>
            <h3>필터</h3>
          </v-col>
        </v-row>
        <hr />
        <p>상품명</p>
        <v-btn 
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: currentIndex == index }"
        @click="handleClick(index)"
        elevation="0"
        >{{ item }}</v-btn
        >
        <hr />
        <p>가격</p>
        <v-radio-group>
          <v-radio @click="priceCheck" value="bottom" label="10,000원 미만"></v-radio>
          <v-radio value="middle" label="10,000~20,000원"></v-radio>
          <v-radio :price="price" value="top" label="20,000원 이상"></v-radio>
      </v-radio-group>
      <v-btn :click="result">검색</v-btn>
    </v-card>
    {{ price }}asdf
      
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      first : '',
      last : '',
      price : 5,
      select: false,
      items: [
        "전체",
        "ㄱ",
        "ㄴ",
        "ㄷ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅅ",
        "ㅇ",
        "ㅈ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
        "A-Z",
      ], 
      currentIndex: null,
    };
  },
  methods: {
    async priceCheck(){
      let vaule = asdf;
    },

    async handleClick(index) {
      this.currentIndex = index;
      // let filterWord = await axios.get(`/api/filter/${first}/${last}`).catch(err=>{console.log(err)})
      //   this.$emit('wordFilter',filterWord.data);
      if(index == 1){
        this.first = '가'
        this.last = '나'
      }else if(index == 2){
        this.first = '나'
        this.last = '다'
      }else if(index == 3){
        this. first = '다'
        this. last = '라'
      }else if(index == 4){
        this. first = '라'
        this. last = '마'
      }else if(index == 5){
        this. first = '마'
        this. last = '바'
      }else if(index == 6){
        this. first = '바'
        this. last = '사'
      }else if(index == 7){
        this.first = '사'
        this.last = '아'
      }else if(index == 8){
        this.first = '아'
        this.last = '자'
      }else if(index == 9){
        this.first = '자'
        this.last = '차'
      }else if(index == 10){
        this.first = '차'
        this.last = '카'
      }else if(index == 11){
        this.first = '카'
        this.last = '타'
      }else if(index == 12){
        this.first = '타'
        this.last = '파'
      }else if(index == 13){
        this.first = '파'
        this.last = '하'
      }else if(index == 14){
        this.first = '하'
        this.last = '힣'
      }else if(index == 15){
        this.first = 'a'
        this.last = 'Z'
      }else{
        this.first = '가'
        this.last = 'Z'
      }
      console.log(this.first, this.last);

    },
  },
};
</script>

<style scoped>

button {
  background-color: whitesmoke;
}

button.active {
  background-color: #999;
}
</style>
