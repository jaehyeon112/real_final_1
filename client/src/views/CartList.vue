<template>
    <v-container v-if="cartList.length > 0 && this.$store.state.user.user_id != null">
              <v-card style="padding: 20px;">
                <v-row>
                  <v-col cols="9">
                    <h1>
                      <span class="mdi mdi-cart-minus" style="font-size: 40px"></span>
                      장바구니
                    </h1>
                    <v-row class="button-row">
                      <v-col cols="auto" class="button-col">
                        <v-btn class="right-aligned-button" @click="selectAll">전체선택</v-btn>
                      </v-col>
                      <v-col cols="auto" class="button-col">
                        <v-btn class="right-aligned-button2" @click="deleteSelected">선택삭제</v-btn>
                      </v-col>
                    </v-row>
                    <table class="rwd-table" :key="idx" v-for="(list, idx) in cartList">
                      <tr :class="{'stock': list.stock == 0 || list.soldout == 1 }">
                        <td>
                          <v-checkbox v-model="list.cart_checkbox" true-value="1" false-value="0" @click="updateCheckbox(list)"></v-checkbox>
                        </td>
                        <td><v-img width="80" height="80" :src="`api/test/`+ list.file_name"></v-img></td>
                        <td v-if="list.stock != 0 && list.soldout != 1" style="cursor: pointer; font-weight: bold;" @click="goTodetailForm(list.prod_no)">{{ list.prod_name }}</td>
                        <td v-else style="font-weight: bold;">{{ list.prod_name }}</td>
                          <td>
                            <v-btn v-if="list.stock != 0 && list.soldout != 1" @click="quantityMinus(list)">
                              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=" alt="">
                            </v-btn>
                          </td>
                          <td v-if="list.stock != 0 && list.soldout != 1">{{ list.quantity }}개</td>
                          <td v-else-if="list.soldout == 1">품절</td>
                          <td v-else>상품 준비중</td>
                          <td>
                            <v-btn v-if="list.stock != 0 && list.soldout != 1" @click="quantityPlus(list)">
                              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiAxMHY0aDR2MmgtNHY0aC0ydi00aC00di0yaDR2LTRoMnoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4K" alt="">
                            </v-btn>
                          </td>
                        <td>
                          <ul>
                            <li>{{ $wonComma(list.discount_price * list.quantity) }} 원</li>
                            <li v-if="list.discount_price !== list.price" class="discount">{{ $wonComma(list.price * list.quantity) }} 원</li>
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </v-col>
                  <v-col style="position: sticky; top:100px;">
                    <ProdPrice 
                    :cartList="cartList"
                    :total="total"
                    :discount="discount"
                    :delivery="delivery"
                    :final="final"/>
                    <v-btn width="385" v-model="check" @click="showMenu" :disabled="box == 1" class="css-fwelhw e4nu7ef3" color="primary">주문하기</v-btn>
                  </v-col>
                </v-row>
              </v-card> 
    </v-container>
    <v-container v-else-if="cartList.length > 0 && this.$store.state.user.user_id == null">
      <!-- 비회원일 때의 처리 -->
        <v-card style="padding: 20px;" >
                  <v-row>
                    <v-col cols="9">
                      <h1>장바구니</h1>
                      <v-row class="button-row">
                        <v-col cols="auto" class="button-col">
                          <v-btn class="right-aligned-button" @click="selectAll">전체선택</v-btn>
                        </v-col>
                        <v-col cols="auto" class="button-col">
                          <v-btn class="right-aligned-button2" @click="deleteSelected">선택삭제</v-btn>
                        </v-col>
                      </v-row>
                      <table class="rwd-table" :key="idx" v-for="(list, idx) in cartList">
                        <tr>
                          <td>
                            <v-checkbox v-model="list.cart_checkbox" true-value="1" false-value="0" @click="updateCheckbox(list)"></v-checkbox>
                          </td>
                          <div>
                          <td><v-img width="80" height="80" :src="`api/test/`+ list.file_name"></v-img></td>
                        </div>
                            <td style="cursor: pointer; font-weight: bold;" @click="goTodetailForm(list.prod_no)">{{ list.prod_name }}</td>
                            <td>
                          <v-btn @click="quantityMinus(list)">
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=" alt="">
                          </v-btn>
                          </td>
                          <td>{{ list.quantity }}개</td>
                          <td>
                            <v-btn  @click="quantityPlus(list)">
                              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiAxMHY0aDR2MmgtNHY0aC0ydi00aC00di0yaDR2LTRoMnoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4K" alt="">
                            </v-btn>
                          </td>
                            <td>
                              <ul>
                                <li>{{ $wonComma(list.discount_price * list.quantity) }} 원</li>
                                <li v-if="list.discount_price !== list.price" class="discount">{{ $wonComma(list.price * list.quantity) }} 원</li>
                              </ul>
                            </td>
                          </tr>
                      </table>
                    </v-col>
                    <v-col style="position: sticky; top:100px;">
                      <ProdPrice 
                      :cartList="cartList"
                      :total="total"
                      :discount="discount"
                      :delivery="delivery"
                      :final="final"/>
                      <v-btn width="385" @click="goTologinForm" class="css-fwelhw e4nu7ef3" height="72" color="primary">로그인</v-btn>
                    </v-col>
                  </v-row>
                </v-card> 
              </v-container>
              <v-container v-else>
        <v-card style="padding: 20px;" >
          <v-row>
            <v-col cols="9">
              <h1>장바구니</h1>
              <br>
              <p class="css-l1lu2l eqymnpn0">장바구니에 담긴 상품이 없습니다</p>
            </v-col>
            <v-col style="position: sticky; top:100px;">
            <ProdPrice 
              :cartList="cartList"
              :total="total"
              :discount="discount"
              :delivery="delivery"
              :final="final"/>
              <v-btn width="385" v-if="this.$store.state.user.user_id != null" @click="showMenu" class="css-fwelhw e4nu7ef3" color="primary">주문하기</v-btn>
              <v-btn width="385" v-else @click="goTologinForm" class="css-fwelhw e4nu7ef3" color="primary">로그인</v-btn>
            </v-col>
          </v-row>
        </v-card> 
      </v-container>
</template>

<script>
import axios from 'axios';

import ProdPrice from '../components/cart/ProdPrice.vue';

export default {
  name : 'cartList',
  components: {
    ProdPrice
  },
  data() {
    return {
      cartList: [],
      total : 0,
      discount : 0,
      delivery : 0,
      final : 0,
      cartno : 0,
      isSoldOut : false,
      isStock : false,
      checkbox : 0,
      prodStock: 0,
      cartQuantity: 0,
      cartNo : 0,
      soldout : 0
    }
  },
  created(){
    this.fetchCartList();
    this.ProdCheck();
  },
  // watch : {
  //   cartList(){
  //     for (let i = 0; i < this.cartList.length; i++) {              
  //           this.updateCheckbox(this.cartList[i]);
  //     }
  //   }
  // },
  methods : {
          goTodetailForm(no){
            this.$router.push({path:'/detailPage', query:{pno : no}})
          },
          ProdCheck() { // 상품 품절/상품준비중
            for(let i = 0; i < this.cartList.length; i++) {
              if (this.cartList[i].soldout == 1) {
                this.isSoldOut = true;
                return;
              }else if(this.cartList[i].stock < 1){
                this.isStock = true;
              }
            }
          },
          quantityPlus(list) { // 수량 플러스
              if(list.stock > list.quantity ){
                list.quantity++;
                if( this.$store.state.user.user_id !=null){
                axios.put(`/api/CartPlusquantity/${list.prod_no}`)
                .catch(err => console.log(err));
                }
              }else{
                alert('현재 남은 수량이 없습니다.');
              }
              this.getBill();

        },
          // 로그인 안되어있으면 로그인 하라고 로그인 폼으로 이동 시킨다.
          goTologinForm(){
            alert('로그인 화면으로 이동합니다.')
            this.$router.push('login')
          },
        
        quantityMinus(list) { // 수량 마이너스
            if(list.quantity > 1 ){
              list.quantity--;
              if( this.$store.state.user.user_id !=null){
                    axios.put(`/api/CartMinusquantity/${list.prod_no}`)
                                      .catch(err => console.log(err));
              }
            }
            this.getBill();
        },
        async fetchCartList() {
            if(this.$store.state.user.user_id !=null){

              await axios.get(`/api/cartList`, {
              })
            .then(response => {
              this.cartList = response.data;
            })
            .catch(error => {
              console.error(error);
            });
            this.$store.commit('loginCart')
          }else{
              this.cartList = await this.$store.state.cart
              console.log('비회원 장바구니')
            console.log(this.cartList)
            console.log('비회원 장바구니')
            }
            this.getBill();
          },
          async updateCheckbox(list) {  // 체크박스 개별 DB에 등록부분
            let result = ''
            if(this.$store.state.user.user_id !=null){
              if(list.cart_checkbox == 1) {
                result = await axios.put(`/api/CheckboxUpdate/0/${list.cart_no}`, );
                console.log(result.data,'0으로 바꾸기');
                if(result.data.affectedRows> 0){
                }
              }else {
                result =  await axios.put(`/api/CheckboxUpdate/1/${list.cart_no}`, );
                console.log(result,'1으로 바꾸기');
                if(result.data.affectedRows > 0){
                }
              }
            }else {
              if(list.cart_checkbox == 1){
                list.cart_checkbox = 0;
                this.$store.commit('selectCheck',list.prod_no )
              }else{
                list.cart_checkbox = 1;
                this.$store.commit('selectCheck',list.prod_no )
              }
            }
            this.delivery = 0;
            this.final = 0;
            this.getBill();

            console.log(list,'확인')
                // let selectItem =  ;
                // this.discount = selectItem.length;
            },
            selectAll() {
              let allChecked = true;
              
                for (let i = 0; i < this.cartList.length; i++) {
                  if (this.cartList[i].cart_checkbox != "1") {
                    allChecked = false;
                  }
                }
                
                if (allChecked) { // 전체 선택 해제
                  for (let i = 0; i < this.cartList.length; i++) {
                    if (this.cartList[i].cart_checkbox == "1") {
                      this.cartList[i].cart_checkbox = "0";
                      
                    }
                  }
                  if(this.$store.state.user.user_id != null){
                    axios.put(`/api/CheckAllUpdate/0`);
                  }else{
                    this.$store.commit('allCheck',"0")
                  }
                  console.log('전체해제')
                } else { // 전체 선택
                  for (let i = 0; i < this.cartList.length; i++) {
                    if (this.cartList[i].cart_checkbox == "0") {
                      this.cartList[i].cart_checkbox = "1";                
                    }
              }
              
              if(this.$store.state.user.user_id != null){
                axios.put(`/api/CheckAllUpdate/1`);
              }else{
                this.$store.commit('allCheck',"1")
              }
              console.log('전체선택')
            }
            this.delivery = 0;
            this.final = 0;
            this.getBill();
            // axios.put(`/api/CheckAllUpdate/${this.$store.state.user.user_id}`,this.cartList);

          },
          async deleteSelected() {
      for (let i = this.cartList.length - 1; i >= 0; i--) {
        // cart_checkbox가 "1"인지 확인
        if (this.cartList[i].cart_checkbox == "1") {
          // 로그인 상태인 경우

          if (this.$store.state.user.user_id != null) {
            try {
              await axios.delete(`/api/CheckboxDelete/${this.cartList[i].cart_no}`);
              this.$store.commit('loginCartCheck', 1);
            } catch (error) {
              console.error("삭제 중 오류 발생: ", error);
            }
            this.cartList.splice(i, 1);
          } else {
            // 로그인되지 않은 상태인 경우
            this.$store.commit('cartDelete', this.cartList[i].prod_no);
          }
          // 배열에서 항목 삭제
        }
      }
        this.delivery = 0;
        this.final = 0;
        this.getBill();
      },
        getBill(){    
          this.totalPrice();
          this.discountPrice();
          this.deliveryPrice();
          this.finalPrice();
        },
        showMenu() {
          let Option = confirm("이대로 주문하시겠습니까?");
          if (Option) {
            this.moveOrderForm();
          }
        },
        goTologinForm(){
          alert('로그인 화면으로 이동합니다.')
          this.$router.push('login')
        },
        totalPrice() {
          this.total = 0;
          for (let i = 0; i < this.cartList.length; i++) {
            if(this.cartList[i].cart_checkbox == 1){
            this.total += (this.cartList[i].price * this.cartList[i].quantity);
            console.log(this.total,'전체금액')
            }
          }
    },
    discountPrice() {
          let totaldiscount = 0;

          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox == "1") {
                totaldiscount += (this.cartList[i].discount_price * this.cartList[i].quantity) - (this.cartList[i].price * this.cartList[i].quantity);
            }
          }

          this.discount = totaldiscount;
      },
      deliveryPrice() {
        for (let i = 0; i < this.cartList.length; i++) {
            if(this.cartList[i].cart_checkbox == 1){
              this.delivery = this.discount < 40000 ? 3000 : 0;
            }
        }
      },
      finalPrice() {
        for (let i = 0; i < this.cartList.length; i++) {
          if(this.cartList[i].cart_checkbox == 1){
          this.final = this.total + this.discount + this.delivery
          }
        }
      },
      async moveOrderForm(){
        for (let i = 0; i < this.cartList.length; i++) {
            this.prodStock = this.cartList[i].stock;
            this.cartQuantity = this.cartList[i].quantity;
            this.cartNo = this.cartList[i].cart_no;
            this.checkbox = this.cartList[i].cart_checkbox;
            this.soldout = this.cartList[i].soldout;

            if(this.checkbox == 1){

              if (this.prodStock < this.cartQuantity) {
                console.log(this.prodStock, '상품재고');
                alert('재고가 부족한 상품이 있어 상품 수량이 변경됩니다.');
              console.log(this.cartNo, '상품번호');
              await axios
              .put(`/api/Cartquantity/${this.prodStock}/${this.cartNo}`)
              .catch((err) => console.log(err));
              console.log('수량변경완료');
            }
            
            if (this.soldout == 1 || this.prodStock == 0) {
              alert('품절이거나 상품준비중인 상품이 있습니다.')
              this.$router.push('/cartList');
              return;
            }
            this.$router.push('/orderForm');
          }
        }
        }

          },
        }
</script>
<style scoped>
* {
  list-style: none;
}

h1 {
  text-align: center;
}
.button-row {
  display: flex;
  justify-content: flex-end;
}

.button-col {
  display: flex;
  margin-bottom: 20px;

}

.right-aligned-button {
  margin-left: auto;
  background-color: #000000;
}
.right-aligned-button2 {
  margin-left: auto;
  background-color: #ffffff;
  color: #000000;
}
.rwd-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
}

.rwd-table td {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f5f9fc;
  padding: .3em 2em
}

.rwd-table tr:first-child {
  width: 100%; 
}

.rwd-table td:nth-child(1) {
  width: 1%; 
}
.rwd-table td:nth-child(2) {
  width: 20%; 
}

.rwd-table td:nth-child(3) {
  width: 40%; 
}

.rwd-table td:nth-child(4) {
  width: 1%; 
}

.rwd-table td:nth-child(5) {
  width: 20%; 
}

.rwd-table td:nth-child(6) {
  width: 1%; 
}

.rwd-table td:nth-child(7) {
  width: 25%; 
}

.discount {
  display: block;
  line-height: 24px;
  color: rgb(181, 181, 181);
  word-break: break-all;
  text-decoration: line-through;
  font-size: 14px;
  padding-left: 8px;
}

.sold-out {
  background-color: #f8d7da; /* 품절 상품 배경색 */
  pointer-events: none; /* 품절 상품 비활성화 */
}

.css-l1lu2l {
    padding: 185px 0px;
    border-top: 1px solid rgb(51, 51, 51);
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: rgb(181, 181, 181);
}

.css-fwelhw {
    width: 330px;
    height: 72px;
    border-radius: 3px;
    font-size: 24px;
    margin-left: 15px;
  }

button{
          color : rgb(255, 255, 255);
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

.stock {
  opacity: 0.5; /* 불투명도 조절 */
}
</style>