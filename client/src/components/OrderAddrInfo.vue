<template>
    <v-container>
      <h1>배송지 정보</h1>
      <hr>
      <div v-if="cartList.length > 0">
        <p>배송지 <span style="font-size: 30px;">{{ cartList[0].address }}  {{ cartList[0].detail_address }} {{ cartList[0].postcode }}</span></p>
      </div>
      <div style="text-align: center;">
        <v-checkbox ref="checkbox" @change="handleCheckboxChange" label="배송지가 동일한 경우 선택"></v-checkbox>
        <p><span style="text-align: left;">주소 </span>
          <input type="text" v-model="zip" style="width: 60px; margin-right: 10px;">
          <v-btn @click="showApi">우편번호 찾기</v-btn>
        </p>
        <p><input type="text" v-model="addr1" style="width: 500px;"></p>
        <p><input type="text" v-model="addr2" style="width: 500px;"></p>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'daumMap',
    data() {
      return {
        zip: '',
        addr1: '',
        addr2: '',
      }
    },
    props : {
        cartList: {
            type: Array,
            required: true,
        }
    },
    methods: {
        handleCheckboxChange() {
        if (this.$refs.checkbox.checked) {
            this.address1 = this.address1;
            this.addr2 = this.address2;
            this.zip = this.postcode;
        } else {
            this.addr1 = '';
            this.addr2 = '';
            this.zip = '';
        }
        },
      showApi() {
        new window.daum.Postcode({
          oncomplete: (data) => {
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
  
              // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
              // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
              let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
              let extraRoadAddr = ''; // 도로명 조합형 주소 변수
  
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraRoadAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraRoadAddr !== ''){
                  extraRoadAddr = ' (' + extraRoadAddr + ')';
              }
              // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
              if(fullRoadAddr !== ''){
                  fullRoadAddr += extraRoadAddr;
              }
  
              // 우편번호와 주소 정보를 해당 필드에 넣는다.
              this.zip = data.zonecode; //5자리 새우편번호 사용
              this.addr1 = fullRoadAddr;
          }
        }).open();
      }
    }
  }
  </script>
  
  <style scoped>
  input {
    border: 1.2px black solid;
  }
  </style>