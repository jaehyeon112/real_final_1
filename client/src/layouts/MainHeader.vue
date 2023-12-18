<template>
  <div>
    <ul class="nav justify-content-end bg-black" id="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/join">회원가입</router-link>
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

    <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/main">
          <h1 id="e"><i>희망의1조</i></h1>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/introduction">
                소개
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/menu"> 메뉴 </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/review">리뷰 </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/myPage"
                >마이페이지</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li>
              <router-link
                to="/"
                class="btn position-relative"
                style="--bs-btn-border-color: none"
              ></router-link>
              <router-link
                to="/cart"
                class="btn position-relative"
                style="--bs-btn-border-color: none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                  />
                </svg>
                <p>장바구니</p>
                <span
                  id="cartAmounts"
                  class="position-absolute top-20 start-80 badge rounded-pill bg-danger"
                >
                  <!-- 장바구니 갯수! -->
                  {{ cartAmounts }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartAmounts: 0,
    };
  },
};
</script>

<style scoped>
#nav > li > a {
  color: #ccc;
  font-size: 12px;
  font-weight: 600;
}

.navbar-nav.mx-auto > li > a {
  font-weight: 700;
  font-size: 22px;
  padding-left: 32px !important;
  padding-right: 32px !important;
}
</style>
