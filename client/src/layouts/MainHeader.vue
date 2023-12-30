<template>
  <div>
    <ul class="nav justify-content-end" id="nav">
      <li class="nav-item">
        <span class="nav-link login" @click="loginOrMypage"  >{{ $store.state.user.user_id != null ? $store.state.user.user_name + '님' : '로그인' }}</span>
      </li>
      <li class="nav-item">
        <span class="nav-link login" @click="logoutOrJoin" >{{ $store.state.user.user_id != null ? '로그아웃' : "회원가입"}}</span>
      </li>
    </ul>

    <div class="container text-center" style="margin-bottom: 20px">
      <div class="row">
        <div class="col-4">
          <router-link
            to="/main"
            class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
          >
            <!--이미지 찾아서 넣자-->
            <svg class="bi me-2" width="40" height="32">
              <use xlink:href="#bootstrap"></use>
            </svg>
            <span class="fs-4">1조 짱</span>
          </router-link>
        </div>
        <div class="col-6">
          <form class="col-12 col-lg-6 mb-3 mb-lg-0" role="search">
            <input type="search" placeholder="Search..." />
          </form>
        </div>
        <div class="col-1" style="width: 45px; padding-top: 15px">
          <router-link to="/">
            <!-- 알람 갯수 조절해야함 -->
            <v-badge color="error" content='0'>
              <span class="mdi mdi-bell-outline" style="font-size: 30px"></span>
            </v-badge>
          </router-link>
        </div>
        <div class="col-1" style="padding-top: 15px">
          <span @click="what">
            
            <!-- 장바구니 갯수 조절해야함 -->
            <v-badge color="error" :content='$store.state.cart.length'>
              <span class="mdi mdi-cart-minus" style="font-size: 30px"></span>
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
          
          <category id="ca" />
        
        </div>
        <div class="col">
          <router-link class="nav-custom" to="/">소개</router-link>
        </div>
        <div class="col">
          <router-link class="nav-custom" to="/menu">메뉴</router-link>
        </div>
        <div class="col">
          <router-link class="nav-custom" to="/">리뷰</router-link>
        </div>
        <div class="col">
          <router-link class="nav-custom" to="/">마이페이지</router-link>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import category from "../components/menu/category.vue";
export default {
  components: { category },
  data() {
    return {
      lnbOffsetTop: 0,
      isLnbFixed: false,
    };
  },
  mounted() {
    this.lnbOffsetTop = this.$refs.lnb.offsetTop;
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
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
        
      }


    },
    logout(){
      alert('로그아웃 되었습니다~')
      this.$store.commit('logout');
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
  },
};
</script>

<style scoped>
.login {
  color: #bbb;
  font-size: 12px;
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
#lnb {
  z-index: 9999;
}

#ca {
  z-index: 9999;
}
</style>
