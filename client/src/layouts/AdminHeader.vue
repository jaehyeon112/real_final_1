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
      </div>
    </div>
  </div>
  </template>
