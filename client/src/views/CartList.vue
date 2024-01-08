<template>
      <v-container v-if="this.$store.state.user.user_id == null">
        <v-btn @click="selectAll">전체선택</v-btn>
            <v-btn @click="deleteSelected">선택삭제</v-btn>
          <table class="rwd-table" :key="idx" v-for="(list, idx) in cartList">
            <tr>
              <td>
                <v-checkbox v-model="list.cart_checkbox" true-value="1" false-value="0" @click="updateCheckbox(list)"></v-checkbox>
              </td>
              <td style="border-radius: 1px black;">
                <img src="/api/test" alt="상품이미지" style="width: 150px;">
              </td>
              <td>{{ list.prod_name }}</td>
              <td>
                    <v-btn v-if="list.soldout == '0'" @click="quantityPlus(list)">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiAxMHY0aDR2MmgtNHY0aC0ydi00aC00di0yaDR2LTRoMnoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4K" alt="">
                    </v-btn>
                    <v-btn v-else  disabled="list.soldout == '1'" @click="quantityPlus(list)">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiAxMHY0aDR2MmgtNHY0aC0ydi00aC00di0yaDR2LTRoMnoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4K" alt="">
                    </v-btn>
                  </td>
                  <td>{{ list.quantity }}개</td>
                  <td>
                    <v-btn v-if="list.soldout == '0'" @click="quantityMinus(list)">
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=" alt="">
                    </v-btn>
                    <v-btn v-else  disabled="list.soldout == '1'" @click="quantityMinus(list)">
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=" alt="">
                    </v-btn>
                  </td>
              <td>
                <ul>
                  <li >{{ $wonComma(list.discount_price * list.quantity) }} 원</li>
                  <li v-if="list.discount_price !== list.price" class="discount">{{ $wonComma(list.price * list.quantity) }} 원</li>
                </ul>
              </td>
            </tr>
          </table>
          <v-btn v-model="check" @click="goTologinForm">주문하기</v-btn>
      </v-container>
        <v-container v-else>
          <div v-if="cartList.length > 0">

            <v-card style="padding: 20px;" >
              <v-row>
                <v-col cols="8">
                  <h1>장바구니</h1>
                  <v-row class="button-row">
                    <v-col cols="auto" class="button-col">
                      <v-btn class="right-aligned-button" @click="selectAll">전체선택</v-btn>
                    </v-col>
                    <v-col cols="auto" class="button-col">
                      <v-btn class="right-aligned-button" @click="deleteSelected">선택삭제</v-btn>
                    </v-col>
                  </v-row>
                  <table class="rwd-table" :key="idx" v-for="(list, idx) in cartList">
                    <tr>
                      <td>
                        <v-checkbox v-if="list.soldout == '0'" v-model="list.cart_checkbox" true-value="1" false-value="0" @click="updateCheckbox(list)"></v-checkbox>
                        <v-btn v-else :disabled="list.soldout == '1'">품절로 선택불가</v-btn>
                      </td>
                      <td><v-img width="150" height="150" :src="`api/test/`+ list.file_name"></v-img></td>
                      <td>{{ list.prod_name }}</td>
                      <td>
                        <v-btn v-if="list.soldout == '0'" @click="quantityPlus(list)">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiAxMHY0aDR2MmgtNHY0aC0ydi00aC00di0yaDR2LTRoMnoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4K" alt="">
                        </v-btn>
                        <v-btn v-else  disabled="list.soldout == '1'" @click="quantityPlus(list)">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xNiAxMHY0aDR2MmgtNHY0aC0ydi00aC00di0yaDR2LTRoMnoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgo8L3N2Zz4K" alt="">
                        </v-btn>
                      </td>
                      <td>{{ list.quantity }}개</td>
                      <td>
                        <v-btn v-if="list.soldout == '0'" @click="quantityMinus(list)">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=" alt="">
                        </v-btn>
                        <v-btn v-else  disabled="list.soldout == '1'" @click="quantityMinus(list)">
                          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMCAxNHYySDEwdi0yeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+Cjwvc3ZnPgo=" alt="">
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
        <v-btn v-model="check" @click="showMenu" :disabled="box === 0" class="css-fwelhw e4nu7ef3">주문하기</v-btn>
      </v-col>
    </v-row>
  </v-card> 
  </div>
  <div v-else>
    <v-card style="padding: 20px;" >
              <v-row>
                <v-col cols="8">
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
                  <v-btn v-model="check" @click="showMenu" :disabled="box === 0" class="css-fwelhw e4nu7ef3">주문하기</v-btn>
                </v-col>
    </v-row>
  </v-card> 
  </div>
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
      Checkbox : 0,
      total : 0,
      discount : 0,
      delivery : 0,
      final : 0,
      cartno : 0
    }
  },
  created(){
    this.fetchCartList();
  },
  computed :{
    check() { // 장바구니 체크안되면 주문하기버튼 활성화가 안되게 설정
          let checkbox = 0;
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox == 1) {
              checkbox = 1;
            }
          }
              this.box = checkbox
        }
  },
  // watch : {
  //   cartList(){
  //     for (let i = 0; i < this.cartList.length; i++) {              
  //           this.updateCheckbox(this.cartList[i]);
  //     }
  //   }
  // },
  methods : {
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
      },
        getBill(){    
          this.totalPrice();
          this.discountPrice();
          this.deliveryPrice();
          this.finalPrice();
        },
        showMenu() {
          let Option = confirm("주문하시겠습니까?");
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
        this.discount = 0;
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].discount_price != null) {
        for (let i = 0; i < this.cartList.length; i++) {
            if(this.cartList[i].cart_checkbox == 1){
              if (this.cartList[i].discount_price != null) {
              this.discount = (this.cartList[i].discount_price * this.cartList[i].quantity) - (this.cartList[i].price * this.cartList[i].quantity);
              }
              console.log(this.discount,'상품할인ㄱ듬액')
            }
          }
        }
      }
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
  }
}
</script>
<style>
* {
  list-style: none;
}
.button-row {
  display: flex;
  justify-content: flex-end;
}

.button-col {
  display: flex;
  margin-bottom: 10px;
}

.right-aligned-button {
  margin-left: auto;
}
.rwd-table {
  margin: auto;
  width: 100%;
  border-collapse: collapse;
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
  width: 50%; 
}

.rwd-table td:nth-child(4) {
  width: 1%; 
}

.rwd-table td:nth-child(5) {
  width: 10%; 
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
    padding: 115px 0px;
    border-top: 1px solid rgb(51, 51, 51);
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: rgb(181, 181, 181);
}

.css-fwelhw {
    display: block;
    padding: 0px 10px;
    text-align: center;
    overflow: hidden;
    width: 100%;
    height: 56px;
    border-radius: 3px;
    color: rgb(255, 255, 255);
    background-color: rgb(207, 95, 245);
    border: 0px none;
    font-weight: 500;
}
</style>