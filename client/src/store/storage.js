// storage.js
import { createStore } from 'vuex'

const store = createStore({
  state: {
    inputValue: 0
  },
  mutations: {
    setInputValue(state, value) {
      state.inputValue = value;
    },
  },
  actions: {
    saveInputValue({ commit }, value) {
      commit('setInputValue', value);
    },
  },
});

export default store