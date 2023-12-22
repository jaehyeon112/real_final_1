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
          <router-link to="/CartList">
            <i class="bi bi-cart"> </i>
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
        <div
          class="col"
          style="position: relative"
          @mouseover="showCategoryList"
          @mouseleave="hideCategoryList"
        >
          <router-link to="/">카테고리</router-link>
          <div v-if="showCategory" class="category-list">
            <!-- 카테고리?  -->
            <ul>
              <li
                @mouseenter="showSecondCategoryList"
                @mouseleave="hideSecondCategoryList"
                class="test"
              >
                <router-link class="nav-custom" to="/">밀키트</router-link>
              </li>

              <li class="test">
                <router-link class="nav-custom" to="/">신상품</router-link>
              </li>
              <li class="test">
                <router-link class="nav-custom" to="/">베스트</router-link>
              </li>
              <li class="test">
                <router-link class="nav-custom" to="/"
                  >갑자기 땡긴다면?</router-link
                >
              </li>
              <li class="test">
                <router-link class="nav-custom" to="/">특가</router-link>
              </li>
              <li class="test">
                <router-link class="nav-custom" to="/">냉동전문관</router-link>
              </li>
            </ul>
          </div>
          <div
            v-if="showSecondCategory"
            class="category-list second-category-list"
            style="position: absolute; left: 200px"
            @mouseenter="showSecondCategoryList"
            @mouseleave="hideSecondCategoryList"
          >
            <ul>
              <li class="test">
                <router-link class="nav-custom" to="/"
                  ><span style="width: 300px">전체</span></router-link
                >
              </li>
              <li class="test">
                <router-link to="/">양식</router-link>
              </li>
              <li class="test">
                <router-link to="/">한식</router-link>
              </li>
              <li class="test">
                <router-link to="/">중 일식</router-link>
              </li>
              <li class="test">
                <router-link to="/">분식</router-link>
              </li>
              <li class="test">
                <router-link to="/">동남아</router-link>
              </li>
            </ul>
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
      showSecondCategory: false,
      lnbOffsetTop: 0,
      isLnbFixed: false,
    };
  },
  mounted() {
    this.lnbOffsetTop = this.$refs.lnb.offsetTop;

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    showCategoryList() {
      this.showCategory = true;
    },
    hideCategoryList() {
      this.showCategory = false;
      this.showSecondCategory = false;
    },
    showSecondCategoryList() {
      this.showSecondCategory = true;
    },
    hideSecondCategoryList() {
      this.showSecondCategory = false;
    },
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
}
.nav-custom:hover {
  color: orange;
}

.bi:hover {
  color: orange;
}

.category-list {
  border: 1px solid black;
  width: 200px;
  background-color: #fff;
  position: absolute;
  text-align: justify;
}
.category-list > ul {
  margin: 0;
  padding: 0;
}
.category-list > ul > li {
  list-style-type: none;
  padding-left: 30px;
  height: 50px;
  font-size: 20px;
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
.test:hover a {
  color: orange;
}
</style>
