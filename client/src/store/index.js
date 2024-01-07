import {
    createStore
} from 'vuex'
import loginStore from './modules/loginStore'

//새로고침 사라지는거 때문에
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        loginStore,
        refreshstoken
    },

    plugins: [
        createPersistedState({
            paths: ['loginStore']
        })
    ]

})