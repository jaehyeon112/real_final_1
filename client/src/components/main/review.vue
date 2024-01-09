<template>
  <v-card style="position: relative;">
    <v-row>
      <v-col>
        <span><p>상품명</p></span>
        <span><p>리뷰내용(2줄넘으면...)</p></span>
        <span><p>별점</p></span>
      </v-col>
      <v-img style="position:relative;margin:100px"
        class="align-end text-white"
        height="500"
        
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >리뷰사진</v-img
      ><v-img
          class="align-center text-white"
          height="250"
          width="250"
          style="border-radius: 50%; position:absolute; bottom:10px;
    right: 100px;"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
          >원본사진</v-img
        >
    </v-row>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
