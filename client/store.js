//로그인 상태관리용 store.js

import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    namespaced: true, 

    //관리하려는 상태, 
    state : { 
        user_id: "",
        token : null //로그인하고 전달되는 토큰 저장.
    },

    //state의 값 return
    getters : {
        //로그인 여부
        isLogin(state){
            return state.token == null? false : true;
        }
    }, 
    

    //로그인 통해 응답받은 값 state에 저장하려고 mutations랑 actions 필요함.

    //state 변화시킴. commit 사용해서 호출함! 
    mutations : {
        setUserId(state, userId){
            state.user_id = userId;
        },

        setToken(state, accessToken){
            state.token = accessToken;
        },

        //logout 시 초기화
        reset(state){
            state.user_id = null;
            state.token = null;
        }
    },

    //밖에서 dispatch로 부를 수 있음, actions 내부에서 mutations 호출

    actions : {
        // setToken : ({commit}, _token) => {
        //     commit('setToken', _token)
        // }

        // 로그인
        async doLogin({commit}, userInfo){
            let result = false;
            let resultErr = null;

            try{
                let res = await axios.post(`/api/token`, userInfo);
                if(res.data.success == true){
                    console.log('로그인성공');
                    commit('setUserId', userInfo.user_id);
                    commit('setToken', userInfo.token);
                    result = true;
                }else{
                    console.log('로그인실패');
                    let err = new Error("Request failed with status code 401");
                    err.response = {data:{"success":false, "errormessage":"로그인되지 않았습니다."}};
				    resultErr = err;
                }
                return new Promise((resolve, reject)=>{
                    if(result){
                        resolve();
                    }else{
                    reject(resultErr);
                    }
                });

            } //try   

)},
    } //action

        }) //end store
