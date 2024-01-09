import {
  createStore
} from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios"

const store = createStore({
  state() {
    return {
      mainCategory: '',
      subCategory: '',
      cartCount: 0,
      cart: [],
      user: {},
      searchList: [],
      orderNo: 0,
      loginCartCount: 0,
      kakaoId: ''
    }
  },
  getters: {
    getCart: (state) => {
      return state.cart;
    }
  },
  mutations: {
    addCart(state, item) {

      for (let i = 0; i < state.cart.length; i++) {
        if (item.prod_no == state.cart[i].prod_no) {
          state.cart[i].quantity += item.quantity;
          state.cartCount = state.cart.length
          return;
        }
      }

      item.cart_checkbox = 0
      state.cart.push(item);
      state.cartCount = state.cart.length
    },

    kakaoLogin(state, id) {

       let a = id;
      // state.user = {};
      state.user.user_id = a;
      state.user.user_name = state.user.user_id
      // state.kakaoId = a;
      // console.log(id + '/')
      //state.kakaoId = id;
      state.user.user_name = state.kakaoId
    },

    kakaoLogout(state){
      state.kakaoId = ''
    },
    // kakaoLogout(state) {
    //   state.user.user_name = ''
    // },

    async login(state, userInfo) {
      state.user = userInfo;
      state.loginCartCount = (await axios.get('/api/cartList')).data.length;
    },
    loginCartCheck(state, count) {
      state.loginCartCount -= count;
    },
    async loginCart(state) {
      state.loginCartCount = (await axios.get('/api/cartList')).data.length;
    },
    async logout(state) {
      state.user = {};
      state.cartCount = state.cart.length

      await axios.get('/api/logout')
    },
    cartEmpty(state) {
      state.cart = []
    },
    allCheck(state, no) {
      state.cart.forEach((ele) => {
        ele.cart_checkbox = no;
        console.log(ele.cart_checkbox)
        console.log('store에서 바꿈')
      })
    },
    selectCheck(state, no) {
      const index = state.cart.findIndex(ele => ele.prod_no == no);
      if (index !== -1) {
        if (state.cart[index].cart_checkbox == 1) {
          state.cart[index].cart_checkbox = 0;
          console.log(state.cart[index])
        } else {
          state.cart[index].cart_checkbox = 1;
        }
      }
    },
    cartDelete(state, no) {
      // 장바구니 배열에서 상품 번호가 일치하는 항목을 찾습니다.
      const index = state.cart.findIndex(ele => ele.prod_no == no);

      // 일치하는 항목이 있다면 해당 항목을 삭제합니다.
      if (index !== -1) {
        console.log(index + ' 스토어의 인덱스 번호는?')
        state.cart.splice(index, 1); // index 위치에서 1개의 항목을 제거합니다.
        state.cartCount = state.cart.length; // 장바구니에 남아있는 항목 수를 업데이트합니다.
      }
    },
    getOrderNo(state, no) {
      state.orderNo = no;
    }
  },

  actions: {

  },

  plugins: [
    createPersistedState({
      paths: ['cart', 'cartCount', 'loginCartCount', 'orderNo', 'kakaoId'],
      storage: window.localStorage,
    }),
    createPersistedState({
      paths: ['user', 'kakaoId'], // 세션 스토리지에만 유지할 상태
      storage: window.sessionStorage, // 세션 스토리지 사용
    })
  ]

});

export default store;