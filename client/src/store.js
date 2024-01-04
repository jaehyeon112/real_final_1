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
      loginCartCount: 0
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

      state.cart.push(item);
      state.cartCount = state.cart.length
    },
    async login(state, userInfo) {
      state.user = userInfo;
      state.loginCartCount = (await axios.get('/api/cart')).data.length;
      console.log(state.loginCartCount + '로그인 한 사람의 장바구니 갯수');
      console.log(userInfo + 'store의 값')

    },
    logout(state) {
      state.user = {};
    },
    cartEmpty(state) {
      state.cart = []
    },
    getOrderNo(state, no) {
      state.orderNo = no;
    }
  },
  actions: {

  },
  plugins: [
    createPersistedState({
      paths: ['user', 'cart', 'orderNo']
    })
  ]

});

export default store;