<template>
  <v-container>
      <h1>장바구니</h1>
      <hr>
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
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name : 'cartList',
  data() {
    return {
      cartList: [],
    }
  },
  created(){
    this.fetchCartList();
  },
  watch : {
    cartList(){
      this.fetchCartList();
    }
  },
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
      async updateCheckbox(list) {

        if(list.cart_checkbox == 1) {
              let obj = {
                  param: {
                  cart_no: list.cart_no,
                  cart_checkbox: list.cart_checkbox = 0,
                  prod_no: list.prod_no,
                  user_id: this.$store.state.user.user_id,
                  quantity: list.quantity,
            },
          };
          try {
            let result = await axios.put(`/api/CheckboxUpdate/${list.cart_no}`, obj);
            
            if (result && result.data && result.data.changedRows > 0) {
              console.log(list.cart_checkbox,'확인좀요');
            }
          } catch (error) {
            console.error(error);
          }
        }else{
          let obj = {
                  param: {
                  cart_no: list.cart_no,
                  cart_checkbox: list.cart_checkbox = 1,
                  prod_no: list.prod_no,
                  user_id: this.$store.state.user.user_id,
                  quantity: list.quantity,
            },
          };
          try {
            let result = await axios.put(`/api/CheckboxUpdate/${list.cart_no}`, obj);
            
            if (result && result.data && result.data.changedRows > 0) {
              console.log(list.cart_checkbox,'확인좀요');
            }
          } catch (error) {
            console.error(error);
          }
        }
      },
      selectAll() {
        let allChecked = true; 
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox === 0) {
              allChecked = false; 
            }
        }
        
        if (allChecked) { // 선택해제
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox === 1) {
              continue; // 기존 값이 1인 경우에는 변경하지 않고 다음 상품으로 넘어감
            }else{
              this.updateCheckbox(this.cartList[i], 0); // 모든 상품의 체크박스 값을 0으로 변경하여 선택을 해제
            }
          }
        } else { // 전체선택
          for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].cart_checkbox === 0) { // 0인 경우에만 변경
              this.updateCheckbox(this.cartList[i], 1); // 체크박스 값을 1로 변경하여 선택
            }
          }
        }
    },
      deleteSelected() {
    } ,
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