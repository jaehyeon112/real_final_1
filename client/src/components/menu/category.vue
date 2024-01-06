<template>
  <div
    class="col"
    style="position: relative"
    @mouseover="showCategoryList"
    @mouseleave="hideCategoryList"
  >
    <span>카테고리</span>
    <div v-if="showCategory" class="category-list">
      <!-- 카테고리?  -->
      <ul>
        <li class="test">
          <router-link class="nav-custom" to="/menu">전체상품</router-link>
        </li>
        <li
          @mouseenter="showSecondCategoryList"
          @mouseleave="hideSecondCategoryList"
          class="test"
        >
          <span class="nav-custom" to="/menu/meal">밀키트</span>
        </li>

        <li class="test">
          <router-link class="nav-custom" to="/menu/new">신상품</router-link>
        </li>
        <li class="test">
          <router-link class="nav-custom" to="/menu/best">베스트</router-link>
        </li>
        <li class="test"
        @mouseenter="showSecondCategoryList2"
          @mouseleave="hideSecondCategoryList2">
          <span class="nav-custom" >갑자기 땡긴다면?</span>
        </li>
        <li class="test">
          <router-link class="nav-custom" to="/menu/sale">특가</router-link>
        </li>
        <li class="test">
          <router-link class="nav-custom" to="/menu/frozen">냉동전문관</router-link>
        </li>
      </ul>
    </div>
    <div
      v-if="showSecondCategory"
      class="category-list second-category-list"
      style="position: absolute; left: 220px"
      @mouseenter="showSecondCategoryList"
      @mouseleave="hideSecondCategoryList"
    >
      <ul>
        <li class="test">
          <router-link class="nav-custom" to="/menu/main/all"
            ><span style="width: 300px">전체</span></router-link
          >
        </li>
        <li class="test">
          <router-link to="/menu/main/e1" >한식</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/main/e2">중식</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/main/e3">양식</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/main/e4">일식</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/main/e5">분식</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/main/e6">동남아</router-link>
        </li>
      </ul>
    </div>
    <div
      v-if="showSecondCategory2"
      class="category-list second-category-list"
      style="position: absolute; left: 220px; top:220px"
      @mouseenter="showSecondCategoryList2"
      @mouseleave="hideSecondCategoryList2"
    >
      <ul>
        <li class="test">
          <router-link to="/menu/sub/f1">바삭한맛</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/sub/f2">매콤한맛</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/sub/f3">국물</router-link>
        </li>
        <li class="test">
          <router-link to="/menu/sub/f4">건강한맛</router-link>
        </li>
      </ul>
    </div>
    <div
      v-if="showSecondCategory2"
      class="category-list second-category-list"
      style="position: absolute; left: 220px; top:220px"
      @mouseenter="showSecondCategoryList2"
      @mouseleave="hideSecondCategoryList2"
    >
      <ul>
        <li class="test">
          <router-link to="/menu">바삭한맛</router-link>
        </li>
        <li class="test">
          <router-link to="/">매콤한맛</router-link>
        </li>
        <li class="test">
          <router-link to="/">국물</router-link>
        </li>
        <li class="test">
          <router-link to="/">건강한맛</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
watchQuery: ['category'],
  data() {
    return {
      showCategory: false,
      showSecondCategory: false,
      showSecondCategory2 : false,
    };
  },
  methods: {
    go(){
      this.$emit('go','e1')
      this.$router.push({path: '/menu'})
    },

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
    showSecondCategoryList2() {
      this.showSecondCategory2 = true;
    },
    hideSecondCategoryList2() {
      this.showSecondCategory2 = false;
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
  left:30px;
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
li {
  text-decoration: none;
  color: black;
}
.test:hover li {
  color: orange;
}
</style>
