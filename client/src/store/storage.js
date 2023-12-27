import { createStore } from 'vuex';

const store = createStore({
  state: {
    inputValue: 0,
    couponDiscountAmount: 0, // 쿠폰 할인 금액 추가
  },
  mutations: {
    setInputValue(state, value) {
      state.inputValue = value;
    },
    setCouponDiscountAmount(state, amount) { // 쿠폰 할인 금액을 저장하는 뮤테이션 추가
      state.couponDiscountAmount = amount;
    },
  },
  actions: {
    saveInputValue({ commit }, value) {
      commit('setInputValue', value);
    },
    saveCouponDiscountAmount({ commit }, amount) {
        commit('setCouponDiscountAmount', amount);
      }
  },
});

export default store;