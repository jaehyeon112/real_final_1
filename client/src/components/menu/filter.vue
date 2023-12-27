<template>
  <div style="width: 300px; margin-left: 40px">
    <v-container>
      <h3>필터</h3>
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
        <v-radio value="Radio One" label="10,000원 미만"></v-radio>
        <v-radio value="Radio Two" label="10,000~20,000원"></v-radio>
        <v-radio value="Radio Three" label="20,000원 이상"></v-radio>
      </v-radio-group>
    </v-container>
  </div>
</template>

<script>
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
      ], // 여기에 원하는 페이지 번호를 넣으세요.
      currentIndex: null,
    };
  },
  methods: {
    handleClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style>
button {
  background-color: #ccc;
}

button.active {
  background-color: #999;
}
</style>
