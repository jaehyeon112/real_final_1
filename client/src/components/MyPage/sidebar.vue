<template>

<div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
    <a class= "d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">My Page</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to ="/myPage/myOrderList" class="nav-link active" aria-current="page">
         
          주문내역
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/like" class="nav-link active">
         
          찜한상품
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/delivery" class="nav-link active">
         
          배송지관리
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/myReview" class="nav-link active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"/></svg>
          상품후기
        </router-link>
      </li>
      <li>
        <router-link to ="/myPage/myInquire" class="nav-link active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          상품문의
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/point" class="nav-link active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          포인트
        </router-link>
      </li>
      <li>
        <router-link to="/myPage/coupon" class="nav-link active">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          쿠폰
        </router-link>
      </li>
      <li @click="goupdate()">
        <!-- <router-link to="/putpass" class="nav-link active"> -->
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
          개인정보수정
        <!-- </router-link> -->
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
    

    goupdate() {
      console.log(this.$store.state.kakaoId.id); 
      
      if (this.$store.state.user.user_id) {
        // 로그인된 아이디가 있으면 회원 정보 수정 페이지로 이동
        this.$router.push({ name: 'putpass', params: { id: this.$store.state.user.user_id } });
      } else if(this.$store.state.kakaoId.id){

        this.$router.push({ name: 'join', params: { id: this.$store.state.kakaoId.id } });
      }else {
        // 로그인된 아이디가 없으면 회원 가입 페이지로 이동
        this.$router.push('/join');
      }
}
    },
    created(){
        //this.resize()
    }
}
</script>
<style >
   
</style>