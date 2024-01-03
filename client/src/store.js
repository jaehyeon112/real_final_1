import {
  createStore
} from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      mainCategory: '',
      subCategory: '',
      cartCount: 0,
      cart: [],
      user: {},
      orderNo: 0,
      user: {},
      searchList: []
    }
  },
  getters: {
    getCart: (state) => {
      return state.cart;
    }
  },
  mutations: {
    addCart(state, item) {
      item.quantity = 1;
      for (let i = 0; i < state.cart.length; i++) {
        if (item.prod_no == state.cart[i].prod_no) {
          state.cart[i].quantity += 1;
          state.cartCount = state.cart.length
          return;
        }
      }
      state.cart.push(item);
      state.cartCount = state.cart.length
    },
    login(state, userInfo) {
      state.user = userInfo;

    },
    logout(state) {
      state.user = {};
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