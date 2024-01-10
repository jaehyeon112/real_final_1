<template>

  <div>
    <ul class="nav justify-content-end" id="nav">
      <li class="nav-item">
        <span class="nav-link login" @click="loginOrMypage"  >{{ $store.state.user.user_id != null ? $store.state.user.user_name + '님' : '로그인' }}</span>
      </li>
      <li class="nav-item">
        <span class="nav-link login" @click="logoutOrJoin" >{{ $store.state.user.user_id != null ? '로그아웃' : '회원가입'}}</span>
      </li>
      <li class="nav-item">
        <span class="nav-link login" @click="serviceCenter" >고객센터</span>
         </li>
      
    </ul>
    
    <div class="container justify-content-end" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-4">
          <router-link
          to="/main"
          >
          <!--이미지 찾아서 넣자-->
          <img src="/joymeal.jpg" style="width:100px"> 
        </router-link>
      </div>
      <div class="col-6">
          <input v-model='word'  @keyup.enter="search" type="search" placeholder="Search..." />
      </div>
     
<div class="col-2 text-end" style="padding-top: 15px ">
  <span class="text-end" @click="moveCartList">
    <!-- 장바구니 갯수 조절해야함 -->
    <v-badge color="error" :content='$store.state.user.user_id == null ? $store.state.cartCount : $store.state.loginCartCount'>
            <span class="mdi mdi-cart-minus" style="font-size: 30px; cursor: pointer; "></span>
          </v-badge>
        </span>
      </div>
    </div>
  </div>
  <div
  class="text-center"
  id="lnb"
  :class="{ fixed: isLnbFixed }"
    style="border: 1px solid #ccc; background-color: #fff"
    ref="lnb"
    >
    <div
    class="row"
    style="
        font-size: 24px;
        font-weight: 700;
        margin-top: 20px;
        padding-bottom: 10px;
        "
    >
    <div class="col"></div>
    <div class="col">
      
      <category id="ca"/>
      
    </div>
    <div class="col">
      <router-link class="nav-custom" to="/">소개</router-link>
    </div>
    <div class="col">
      <router-link class="nav-custom" to="/menu/new">신제품</router-link>
    </div>
    <div class="col">
      <router-link class="nav-custom" to="/menu/best">베스트</router-link>
    </div>
    <div class="col">
      <router-link class="nav-custom" to="/menu/sale">특가</router-link>
    </div>
      <div class="col">
        <router-link class="nav-custom" to="/menu/frozen">냉동밀키트</router-link>
      </div>
      <div class="col">
        <router-link class="nav-link" to="/myPage/myOrderList">마이페이지</router-link>
      </div>
      <div class="col"></div>
    </div>
  </div>
</div>
</template>

<script>
import category from "../components/menu/category.vue";
import axios from 'axios'
export default {
components: { category },
data() {
  return {
    cartCount : '',
    lnbOffsetTop: 0,
    isLnbFixed: false,
    word : '',
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  };
},
mounted() {
  this.lnbOffsetTop = this.$refs.lnb.offsetTop;
  window.addEventListener("scroll", this.handleScroll);
},
beforeUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
},
computed:{
  async count(){
    
  }
}
,
methods: {
  async search(){
    if(this.word == ''){
      alert('검색어를 입력하세요.')
      return;
    } 
    let list = await axios.get(`/api/searchHeader/${this.word}`)
    this.$store.state.searchList = list.data;
    console.log(this.$store.state.searchList)
    this.$router.push({ path:`/menu/search/${this.word}` })
  }
  ,
  loginOrMypage(){
    console.log(this.$store.state.user.user_id + "아이디 값은?")
    if(this.$store.state.user.user_id ==null){
      this.$router.push("/login")
    }else{
      this.$router.push('/myPage') // 마이페이지?
    }
  },
  logoutOrJoin(){
    if(this.$store.state.user.user_id == null){
      this.$router.push("/join")
    }else{
      this.logout();
      this.$router.push("/main")
    }


  },
  logout(){
    alert('로그아웃 되었습니다~')
    this.$store.commit('logout');
  },

//마이페이지 안떠서 임시로좀 쓸게요 - 회원탈퇴
withdrawal(){
if(this.$store.state.user.user_id !== null){
      this.$router.push("/withdrawal")
    }
},
serviceCenter(){
  this.$router.push("/serviceCenter")
},

what(){
  const cartItems = this.$store.state.cart;
  let total = [];
  for(let i = 0; i < cartItems.length; i++){
    total.push(cartItems[i].prod_name + cartItems[i].quantity + '개 장바구니');
  }
  alert(total)
},
  handleScroll() { 
    const windowScroll = window.scrollY;

      if (this.lnbOffsetTop < windowScroll) {
        this.isLnbFixed = true;
      } else {
        this.isLnbFixed = false;
      }
    },
    moveCartList(){ // 장바구니 이동
      this.$router.push('/cartList');
    }
  },
  moveCartList(){ // 장바구니 이동
    this.$router.push('/cartList');
  }
}
</script>

<style scoped>

.text-style {
font-size: 12px;
color:gray
}
.login {
  color: #bbb;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

input {
width: 480px;
height: 60px;
border: 3px solid black;
border-radius: 30px;
padding-left: 30px;
}

#nav {
margin-right: 300px;
}

.items > ul > li {
list-style-type: none;
}

.bi {
font-size: 45px;
color: black;
}

.nav-custom {
text-decoration: none;
color: black;
width: 100%;
z-index: 999;
}
.nav-custom:hover {
color: orange;
}

.bi:hover {
color: orange;
}

.fixed {
position: fixed;
top: 0;
left: 0;
width: 100%;
}

a {
text-decoration: none;
color: black;
}
.col {
font-size: 20px;
margin-bottom : 5px;

}

#lnb {
z-index: 9999;
}

#ca {
z-index: 9999;

}
</style>






