<template>
  <v-container>
    <v-hover
        v-slot="{ isHovering, props }"
        open-delay="200"
      >
    <v-card 
    
    :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
          class="mx-auto"
          max-width="300"
          v-bind="props">
      <!-- 해당 제품으로 이동 -->
      <router-link @click.stop="goToDetail(prodList.prod_no)" to="/detailPage">
        <div class="image-container">
          <v-img
            class="text-white"
            height="300"
            src="/api/test"
        
            style="position: relative;"
            
          >
        <v-dialog transition="dialog-top-transition" width="auto">
          <template  v-slot:activator="{ props }">
            <!--여기를 장바구니 버튼으로~-->
            <div style="position:absolute; top:100px; left:200px"><v-btn @click="quantity=1"  icon="mdi mdi-cart" variant="tonal"  v-on:click.prevent v-bind="props"> </v-btn></div>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card height="300" width="450">
              <v-card-text>
                <v-row >
                  <v-col>
                    <v-img width="50" height="50" src="/api/test"></v-img>
                  </v-col>
                  <v-col cols="auto">
                    <span>{{prodList.prod_name}}</span>
                  </v-col>
                </v-row>
                <v-row justify="end">
                  <v-col>      <v-btn @click="decreaseQuantity">-</v-btn>
      {{ quantity }}
      <v-btn @click="increaseQuantity(prodList.prod_no)">+</v-btn></v-col>
                  <v-col  cols="auto">{{ $wonComma(prodList.discount_price)+'원' }}  </v-col>
                </v-row>
                
                <v-row >
                  
                  <v-col  cols="auto">총 상품금액</v-col><v-col><span style="font-weight: 700; font-size: 20px;">{{ $wonComma(prodList.discount_price*quantity) + '원' }}</span></v-col>
                </v-row>
              </v-card-text>
              <v-card-actions style="margin-bottom: 20px;"  >
                
                <v-row style="margin-left:25px">
                  <v-col>
                    <v-btn width="150" height="40" style="border:1px solid gray;" @click="isActive.value = false"
                      >취소</v-btn
                    >
                  </v-col>
                  <v-col @click="isActive.value=false">
                    <v-btn width="150" height="40" style="border:1px solid gray; color:white; background-color: black;" @click="goToCart(prodList.prod_no)"
                      >장바구니</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-img>
      <div v-if="isSoldOut" class="soldout-overlay">품절</div>
      <div v-if="isStock" class="isStock-overlay">상품준비중</div>
    </div>
  </router-link>
  
  <v-card-subtitle class="pt-4"> 1조꺼 </v-card-subtitle>
  
  <v-card-text>
    <div class="title">{{ prodList.prod_name }}</div>
    <!-- 상품 부가 정보 -->
    <div>
      <span id="rate" v-if="prodList.discount_rate!=0">{{ prodList.discount_rate }}<span class="text">%</span></span>
      <span id="discount">{{ $wonComma(prodList.discount_price) }}<span class="text">원</span></span
      ><span id="price" v-if="prodList.discount_price != prodList.price">{{  $wonComma(prodList.price) }}<span class="text">원</span></span>
    </div>
    <div id="type-time">
      <span>냉동 | {{prodList.cooking_time}}분</span>
    </div>
    <v-row justify="end"><span>별점</span> <slot></slot></v-row>
  </v-card-text>
</v-card>
</v-hover>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isSoldOut: false,
      isStock: false,
      quantity : 1
    };
  },
  props: ["prodList"],
  created(){
    this.soldout();
  }
  ,

  methods: {
    soldout() {
      if (this.prodList.soldout == 1) {
        this.isSoldOut = true;
        return;
      }else if(this.prodList.stock < 1){
        this.isStock=true;
      }
    },
        decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity(no) {
      let cartQuantity = 0;
      for(let i = 0 ; i< this.$store.state.cart.length ; i++){
        if(no == this.$store.state.cart[i].prod_no){
          cartQuantity = this.$store.state.cart[i].quantity;
        }
      }

      if(this.prodList.stock > this.quantity+cartQuantity) {
      this.quantity++;
      }else{
        alert('보유 재고를 초과하였습니다.')
      }
    },
    goToCart(no){
      let cartQuantity = 0;
      for(let i = 0 ; i< this.$store.state.cart.length ; i++){
        if(no == this.$store.state.cart[i].prod_no){
          cartQuantity = this.$store.state.cart[i].quantity;
        }
      }

      if(this.prodList.stock >= this.quantity+cartQuantity) {
        alert("장바구니에 등록되었습니다.")
      let items = this.prodList;
      items.quantity = this.quantity;
      this.$store.commit('addCart',items)
      }else{
        alert('보유 재고를 초과하여 장바구니에 넣을 수 없습니다.')
      }



     
    }
  },
};
</script>

<style scoped>
#type-time {
  background-color: coral;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  width: 100px;
  text-align: center;
  margin-top: 10px;
}
.title{
  margin-bottom:10px;
}

#rate{
font-size: 20px;
color: coral;
font-weight: 600;
margin-right: 10px;
}

#discount{
  font-weight: 600;
margin-right: 10px;
font-size: 16px;
}
#price{
  font-weight: 500;
  text-decoration:line-through;
  color:gray;
font-size: 16px;
}
.text{
  font-weight: 400;
  font-size:15px;
}

.image-container {
  position: relative;
  text-align: center;
  line-height: 300px;
  color : red;
  font-size:24px;
}

.soldout-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;

}
.isStock-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
</style>
