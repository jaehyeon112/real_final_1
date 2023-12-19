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

    <div class="container text-center">
      <div class="row">
        <div class="col">
          <router-link
            to="/"
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
        <div class="col-2">
          <router-link to="/">
            <i class="bi bi-bell"></i>
          </router-link>
          <span style="color: #fff">　</span>
          <router-link to="/">
            <i class="bi bi-cart"> </i>
          </router-link>
        </div>
      </div>
    </div>
    <div
      class="text-center"
      style="border: 1px solid #ccc; padding-bottom: 20px"
    >
      <div
        class="row"
        style="font-size: 24px; font-weight: 700; margin-top: 20px"
      >
        <div class="col"></div>
        <div class="col">
          <router-link
            to="/"
            @mouseover="showCategoryList"
            @mouseleave="hideCategoryList"
            >카테고리</router-link
          >
          <div v-if="showCategory" class="category-list">
            <!-- 카테고리?  -->
            <h1>ddasf</h1>
            <router-link class="nav-custom" to="/">카테고리 1</router-link>
            <router-link class="nav-custom" to="/">카테고asdf리 2</router-link>
          </div>
        </div>
        <div class="col">
          <router-link class="nav-custom" to="/">소개</router-link>
        </div>
        <div class="col">
          <router-link class="nav-custom" to="/">메뉴</router-link>
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
export default {
  data() {
    return {
      cartAmounts: 0,
      showCategory: false,
    };
  },
  methods: {
    showCategoryList() {
      this.showCategory = true;
    },
    hideCategoryList() {
      this.showCategory = true;
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
}
.nav-custom:hover {
  color: orange;
}

.bi:hover {
  color: orange;
}
</style>
