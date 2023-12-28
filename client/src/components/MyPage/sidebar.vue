<template>

<div id="side-bar" class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 200px;">
    <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4">My Page</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to ="/myPage/orderList" class="nav-link active" aria-current="page">
         
          주문내역
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/like" class="nav-link text-white">
         
          찜한상품
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/delivery" class="nav-link text-white">
         
          배송지관리
        </router-link>
      </li>
      <li>
        <router-link to="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"/></svg>
          상품후기
        </router-link>
      </li>
      <li>
        <router-link to ="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          상품문의
        </router-link>
      </li>
      <li>
        <router-link to="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          포인트
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/coupon" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          쿠폰
        </router-link>
      </li>
      <li>
        <router-link to="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          개인정보수정
        </router-link>
      </li>
    </ul>
    <hr>
</div>

</template>
<script>

export default{
    name:'side-bar',
    data(){
        return{}
    },
    methods:{
        //resize:function(){
            //함수 생각해보자
        //}
    },
    created(){
        //this.resize()
    }
}
</script>
<style >
    #side-bar{
        position: sticky;
        top: 10;
    }
</style>