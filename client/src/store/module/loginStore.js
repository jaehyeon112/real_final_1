// store/moduels/loginStore.js

import router from '@/router'
import axios from 'axios'

const loginStore = {
    //상태 정의
    state : {
        userInfo : null,
        isLogin : false
    },

    //state 변경하는 곳
    //payload - 순수 data
    mutations : {
        loginSuccess : function(state, payload){
            state.userInfo = payload;
            state.isLogin = true;
        },

        logoutTest : function(state){
            state.userInfo = null;
            state.isLogin = false;
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('vuex')

        },
    },

    //상태변경위한 동작. 외부에서 dispatch로 호출함.
    actions : {
        login(dispatch, loginObj){
            axios
             .post(`/api/dologin`, loginObj) //로그인 url로 아이디비번 보내기
             .then((res)=>{
                    console.log('res.data : ' , res.data);
                const token = res.data.access_token
                localStorage.setItem('access_token', token) //토큰저장 , setItem() : key,value 추가

                const refreshToken = res.data.refresh_token
                localStorage.setItem('refresh_token', refreshToken) //토큰저장

                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                this.dispatch('getMemberInfo') //유저정보가져오기 action 호출
             })
        }, //loin

        logout({commit}){
            commit('logoutTest')
            window.location.href = "http://localhost:8080/main" //redirect할 url

        }, //logout_test

        // 토큰 통해서 유저 정보받아오기
        getUserInfo({commit}){
            const token = localStorage.getItem('access_token') //토큰 가져와서

            const config = {
                headears : {
                    Authorization : 'Bearer ' + token
                }
            } 

            axios  
            // 가져온 토큰을 헤더에 Authorization 로 담아서 요청을 보냄
             .get('/api/dologin', config) //'User API URL : 사용자정보가져오기위함
             .then((response) => {
                const userInfo = {
                    user_id : response.data.user_id,
                    user_password : response.data.user_password
                }
                commit('loginSuccess', userInfo) //mutation 호출
             })
            .catch((err)=>{
                    alert(`아이디랑 비밀번호 확인하세요`);
                })
        } 

    }
} 

export default loginStore


// axios.defaults.headers.common.Authorization은 Bearer 토큰 방식을 사용하여 서버로 보내는
//  모든 HTTP 요청에 대해 헤더에 Authorization 필드를 추가합니다. 
// 이를 통해 서버는 요청의 인증을 위해 해당 헤더에서 토큰을 읽을 수 있습니다.
// Bearer 토큰은 주로 인증된 사용자를 식별하고 권한을 부여하는 데 사용되는 토큰입니다. 
// Authorization 헤더의 값은 Bearer 토큰값 형식을 따르며, 
// Bearer 다음에는 실제 토큰 값이 위치합니다.

// 따라서 위의 코드에서 axios.defaults.headers.common.Authorization은 
// Axios를 사용하여 보내는 모든 HTTP 요청의 헤더에 Authorization 필드를 추가하여 
// 인증된 요청을 수행할 수 있도록 설정하는 역할을 합니다.