<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" width="auto">
        <template v-slot:activator="{ props }">
          <!--여기를 장바구니 버튼으로~-->
          <v-btn color="primary" v-bind="props">From the top</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-text>
              <v-row justify="space-between">
                <v-col cols="1">
                  <v-img width="50" height="50"></v-img>
                </v-col>
                <v-col cols="auto">
                  <span>상품명이 어쩌고..</span>
                </v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col>
                  수량 표시
                </v-col>
                <v-col>
                  가격
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-col>
                  <v-btn variant="text" @click="isActive.value = false"
                  >취소</v-btn
                  >
                </v-col>
                <v-col>
                  <v-btn variant="text" @click="isActive.value = false"
                  >장바구니</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>