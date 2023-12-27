<template>
  <div style="width: 300px; margin-left: 40px">
    <v-container>
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
        :class="{ active: currentIndex === index }"
        @click="handleClick(index)"
        elevation="0"
        >{{ item }}</v-btn
      >
      <hr />
      <p>가격</p>
      <v-radio-group>
        <v-radio value="reset" label="초기화"></v-radio>
        <v-radio value="Radio One" label="10,000원 미만"></v-radio>
        <v-radio value="Radio Two" label="10,000~20,000원"></v-radio>
        <v-radio value="Radio Three" label="20,000원 이상"></v-radio>
      </v-radio-group>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
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
    async handleClick(index) {
      let first = '';
      let last = '';

      if(index == 1){
        first = '가'
        last = '나'
        let filterWord = await axios.get(`/api/filter/${first}/${last}`).catch(err=>{console.log(err)})
        console.log(filterWord.data);
      }
    },
  },
};
</script>

<style scoped>
button {
  background-color: #ccc;
}

button.active {
  background-color: #999;
}
</style>
