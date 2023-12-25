<template>
  <v-container>
    <v-card class="mx-auto" max-width="300">
      <!--해당 제품으로 이동-->
      <router-link to="/">
        <v-img class="align-end text-white" height="300" src="/api/test" cover>
          <v-row justify="end" style="margin-right: 30px; margin-bottom: 30px">
            <v-btn icon="mdi mdi-cart" variant="tonal"> </v-btn>
          </v-row>
        </v-img>
      </router-link>

      <v-card-subtitle class="pt-4"> 1조꺼 </v-card-subtitle>

      <v-card-text>
        <div>상품명</div>
        <!-- 상품 부가 정보-->
        <div><span>할인율%</span> <span>가격</span><span>원가</span></div>
        <div><span id="type-time">냉동/냉장 | 조리시간</span></div>
        <v-row justify="end"><span>별점</span></v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
#type-time {
  background-color: ;
}
</style>
