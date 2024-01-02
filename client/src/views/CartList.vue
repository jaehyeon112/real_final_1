<template>
  <v-container v-if="this.$store.state.user.user_id == null">
    <h1>장바구니</h1>
    <p>로그인 해주세요.</p>
  </v-container>
  <v-container v-else>
        <v-btn @click="selectAll">전체선택</v-btn>
        <v-btn @click="deleteSelected">선택삭제</v-btn>
      <table class="rwd-table" :key="idx" v-for="(list, idx) in cartList">
        <tr>
          <td>
            <v-checkbox v-model="list.cart_checkbox" true-value="1" false-value="0" @click="updateCheckbox(list)"></v-checkbox>
          </td>
          <td>이미지</td>
          <td>{{ list.prod_name }}</td>
          <td>{{ list.quantity }} 개</td>
          <td>
            <ul>
              <li >{{ list.discount_price * list.quantity }} 원</li>
              <li v-if="list.discount_price !== list.price" class="discount">{{ list.price * list.quantity }} 원</li>
            </ul>
          </td>
        </tr>
      </table>
      <v-btn v-model="check" @click="moveOrderForm" :disabled="box === 0">주문하기</v-btn>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name : 'cartList',
  data() {
    return {
      cartList: [],
      allchecked : false, //전체선택 확인여부
      Checkbox : 0
    }
  },
  created(){
    this.fetchCartList();
  },
  computed :{
    check() { // 장바구니 체크안되면 주문하기버튼 활성화가 안되게 설정
          let Checkbox = 0;
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox == 1) {
              Checkbox = 1;
            }
          }
          this.box = Checkbox;
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
      fetchCartList() {
        axios.get(`/api/cartList/${this.$store.state.user.user_id}`, {
        })
        .then(response => {
          this.cartList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      },
      async updateCheckbox(list) {  // DB에 등록부분
        if(list.cart_checkbox == 1) {
          let result = await axios.put(`/api/CheckboxUpdate/0/${list.cart_no}`, );
          
          console.log(result.data,'0으로 바꾸기');
          if(result.data.affectedRows> 0){
          }
        }else {
            let result = await axios.put(`/api/CheckboxUpdate/1/${list.cart_no}`);
            
            console.log(result,'1으로 바꾸기');
            if(result.data.affectedRows > 0){
            }
          }
          console.log(list.cart_checkbox,'체크박스리스트');
        },
        selectAll() {
          let allChecked = false; 
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox == 1) {
              allChecked = true; 
            }
          }
        console.log('아무거나')
        if (allChecked) { // 전체선택
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox == 1) { // 1인 경우에만 변경
              this.cartList[i].cart_checkbox = "0";
              this.updateCheckbox(this.cartList[i]); 
            }
          }
        } else { // 선택해제
          for (let i = 0; i < this.cartList.length; i++) {
              this.cartList[i].cart_checkbox = "1";
              this.updateCheckbox(this.cartList[i]); // 모든 상품의 체크박스 값을 0으로 변경하여 선택을 해제
            }
          }
    },
    async deleteSelected() { 
        for(let i=0; i<this.cartList.length; i++) {
          console.log(this.cartList[i].cart_checkbox,'삭제');
          if(this.cartList[i].cart_checkbox == 1){

            await axios.delete(`/api/CheckboxDelete/${this.cartList[i].cart_no}`);
            
          }
        }
      },
    moveOrderForm(){
      alert('주문서로 이동합니다~')
      this.$router.replace('/orderForm');
    },
    },
  }
</script>
<style scoped>
* {
    list-style: none;
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
  padding: .5em 3em;
}

.rwd-table td:nth-child(1) {
  width: 10%; 
}
.rwd-table td:nth-child(2) {
  width: 10%; 
}

.rwd-table td:nth-child(3) {
  width: 40%; 
}

.rwd-table td:nth-child(4) {
  width: 5%; 
}

.rwd-table td:nth-child(5) {
  width: 10%; 
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

</style>