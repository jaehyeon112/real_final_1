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
      <span @click.stop="goToDetail">
        <div class="image-container">
          <v-img
            class="align-end text-white"
            height="300"
            
            :src="`/api/test/`+ prodList.file_name"
            
          >
          <v-dialog transition="dialog-top-transition" width="auto">
          <template  v-slot:activator="{ props }">
            <!--여기를 장바구니 버튼으로~-->
            <div style="position:absolute; top:100px; left:200px"><v-btn @click="quantity=1" style="background-color: gray;" icon="mdi mdi-cart" variant="tonal"  @click.prevent="getUserCartInfo" v-bind="props"> </v-btn></div>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card height="300" width="450">
              <v-card-text>
                <v-row >
                  <v-col>
                    <v-img width="50" height="50" :src="`api/test/`+ prodList.file_name"></v-img>
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
                    <v-btn width="150" height="40" style="border:1px solid gray; color:white; background-color: black;" @click.prevent="goToCart(prodList.prod_no)"
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
      </span>
   
  
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
    <v-row justify="end"><span style="color :coral " >★ </span><span style="color : gray; font-size:12px;">{{prodList.star > 0.0 ? prodList.star: "0.0"}}</span></v-row>
  </v-card-text>
</v-card>
</v-hover>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isSoldOut: false,
      isStock: false,
      quantity : 1,
      cartList : []
    };
  },
  props: ["prodList"],
  created(){
    this.soldout();
    this.getUserCartInfo()
  }
  ,

  methods: {
    async getUserCartInfo(){
      if(this.$store.state.user_user_id != null)
      this.cartList =  (await axios.get(`/api/cartSelect/${this.prodList.prod_no}/${this.$store.state.user.user_id}`).catch(err=>console.log(err))).data // 유저의 장바구니 카트
    }
    ,
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

    async increaseQuantity(no) {
      let cartQuantity = 0;

      if(this.$store.state.user.user_id != null){ //로그인 했다
       

        if(this.cartList.length == 0 && this.prodList.stock > this.quantity){
          this.quantity++;
          return;
        }else if(this.prodList.stock > this.cartList.quantity + this.quantity) {
          this.quantity++;
          }else{
            alert('보유 재고를 초과하였습니다.')  
          }

    }else{
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
  }
  }, goToDetail(){
      this.$router.push({path:'/detailPage', query:{pno : this.prodList.prod_no}})
    },


    async goToCart(no){
      let cartQuantity = 0;
      if(this.$store.state.user.user_id == null){ //비회원일때
        for(let i = 0 ; i < this.$store.state.cart.length ; i++){
          if(no == this.$store.state.cart[i].prod_no){
            cartQuantity = this.$store.state.cart[i].quantity;
          }
        }
   
        if(this.prodList.stock >= this.quantity+cartQuantity) {
          alert("장바구니에 등록되었습니다. 비회원")
      let items = this.prodList;
      items.quantity = this.quantity;
      this.$store.commit('addCart',items)
    }else{
      alert('보유 재고를 초과하여 장바구니에 넣을 수 없습니다.')
    }
  }else{ // 회원으로 로그인 이후
    this.cartList =  (await axios.get(`/api/cartSelect/${this.prodList.prod_no}/${this.$store.state.user.user_id}`).catch(err=>console.log(err))).data 

    if(this.cartList.length != 0){ //해당 아이디의 장바구니가 비어있지 않고
      for(let i = 0 ; i < this.cartList.length; i++){
        if(no == this.cartList[i].prod_no){
            cartQuantity = this.cartList[i].quantity;
          }
      }
      if(this.prodList.stock >= this.quantity+cartQuantity){ // 
            let obj = {
              param: {
                quantity : cartQuantity+ this.quantity,
                user_id : this.$store.state.user_user_id
              }
            }
            await axios.put(`/api/cartAfterLogin/${this.prodList.prod_no}`, obj)
            alert('장바구니에 추가적으로 등록되었습니다.')
            this.$store.commit('loginCart')
            return
          }else{
            alert('보유 재고를 초과하여 장바구니에 넣을 수 없습니다.')
            return
          }
      }else{ // 해당상품이 회원의 장바구니에 없다면?
            let obj = {
                param : {
                  prod_no : this.prodList.prod_no,
                  user_id : this.$store.state.user.user_id,
                  quantity : this.quantity
                }
              }
    if(this.prodList.stock >= this.quantity) {
          await axios.post('/api/cartAfterLogin/',obj).catch(err=>console.log('로그인 이후 카트에 담길때 에러' + err))
          alert("장바구니에 등록되었습니다. 회원" )
          this.$store.commit('loginCart')
      //장바구니 추가
    }else{
      alert('보유 재고를 초과하여 장바구니에 넣을 수 없습니다.')
    }
  }
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