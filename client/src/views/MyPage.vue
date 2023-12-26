<template>
    <div class="myPageComponent">
        <p>마이페이지</p>
        <p>{{ member.ser_id }}님</p>
        <p>잔여포인트 {{ point.used_point }}</p>
        <p @click="modalOpen" >보유쿠폰</p>

        <div class="modal-wrap" v-show="modalCheck">
            <div class="modal-container">
                <table>
                    <tr>
                        <th>쿠폰번호</th>
                        <th>쿠폰내용</th>
                        <th>쿠폰 발급일</th>
                        <th>쿠폰 만료일</th>
                        <th>쿠폰 사용 가능여부</th>
                    </tr>
                    <tr :key="idx" v-for="(coupon, idx) in couponList">
                        <td>{{ coupon.coupon_no }}</td>
                        <td>{{ coupon.coupon_title }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <div class="modal-btn">
                    <button @click="modalOpen">닫기</button>
                    <button @click="modalOpen">확인</button>
                </div>
            </div>
        </div>
        <!--자식 컴포넌트 자리-->
    </div>
    
</template>

<script>
//import axious from 'axious'
export default{
    data() {
        return {
            modalCheck: false,
            //member의 user_id
            //point테이블의 table
        } 
    },
    created(){

    },
    watch: {
        modalCheck: function () {
        const html = document.querySelector('.html-overflow');
        if( this.modalCheck === true ){
        html.style.overflow = 'hidden'
        } else {
        html.style.overflow = 'auto'
        }
        },
    },
    methods: {
        modalOpen() {
            this.modalCheck = !this.modalCheck
        }
    }
}
</script>

<style>
/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

</style>