<template>
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
<<<<<<< HEAD
        <li class="test">
          <router-link class="nav-custom" to="/menu">전체상품</router-link>
        </li>
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
        <li class="test"
        @mouseenter="showSecondCategoryList2"
          @mouseleave="hideSecondCategoryList2">
=======
        <li class="test">
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
          <router-link class="nav-custom" to="/">갑자기 땡긴다면?</router-link>
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
<<<<<<< HEAD
      style="position: absolute; left: 220px"
=======
      style="position: absolute; left: 200px"
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
      @mouseenter="showSecondCategoryList"
      @mouseleave="hideSecondCategoryList"
    >
      <ul>
        <li class="test">
          <router-link class="nav-custom" to="/"
            ><span style="width: 300px">전체</span></router-link
          >
        </li>
<<<<<<< HEAD
        <li class="test" @click="go">
          양식
        </li>
        <li class="test">
          <router-link to="/menu" @cilck="go">한식</router-link>
=======
        <li class="test">
          <router-link to="/">양식</router-link>
        </li>
        <li class="test">
          <router-link to="/">한식</router-link>
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
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
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCategory: false,
      showSecondCategory: false,
<<<<<<< HEAD
      showSecondCategory2 : false,
      maincategory : ''
    };
  },
  methods: {
    go(){
      this.$emit('go','e1')
      this.$router.push({path: '/menu'})
    },

=======
    };
  },
  methods: {
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
    showSecondCategoryList2() {
      this.showSecondCategory2 = true;
    },
    hideSecondCategoryList2() {
      this.showSecondCategory2 = false;
    },
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
  left:30px;
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
li {
  text-decoration: none;
  color: black;
}
.test:hover li {
  color: orange;
}
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
</style>
