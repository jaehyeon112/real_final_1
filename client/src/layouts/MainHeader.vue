<template>
  <div>
    <ul class="nav justify-content-end" id="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/join">회원가입 </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/myPage">님</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">로그인</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/logout">로그아웃</router-link>
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
            <!-- 장바구니 갯수 조절해야함 -->
            <v-badge color="error" content="0">
              <span class="mdi mdi-bell-outline" style="font-size: 30px"></span>
            </v-badge>
          </router-link>
        </div>
        <div class="col-1" style="padding-top: 15px">
          <router-link to="/">
            <!-- 알람 갯수 조절해야함 -->
            <v-badge color="error" content="0">
              <span class="mdi mdi-cart-minus" style="font-size: 30px"></span>
            </v-badge>
          </router-link>
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
    handleScroll() {
      const windowScroll = window.scrollY;

      if (this.lnbOffsetTop <= windowScroll) {
        this.isLnbFixed = true;
      } else {
        this.isLnbFixed = false;
      }
    },
  },
};
</script>

<style scoped>
#nav > li > a {
  color: #bbb;
  font-size: 12px;
  font-weight: 600;
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
