<template>
    <v-container>
      <h1>배송지 정보</h1>
      <hr>
      <div>
        <p>배송지 <span style="font-size: 30px;">{{ this.$store.state.user.address }}  {{ this.$store.state.user.detail_address }} {{ this.$store.state.user.postcode }}</span></p>
        <v-radio-group label="기본 배송지 변경">
          <v-radio label="1번배송지 변경" value="1"></v-radio>
          <v-radio label="2번배송지 변경" value="2"></v-radio>
          <v-radio label="3번배송지 변경" value="3"></v-radio>
        </v-radio-group>
      </div>
      <v-checkbox v-model="checkbox" @change="CheckboxChange" label="배송지가 동일한 경우 선택"></v-checkbox>
        <form>
          <v-btn @click="showApi">우편번호 찾기</v-btn>
          <v-text-field label="우편번호" v-model="zip" hide-details="auto" style="width: 100px;"></v-text-field>
          <v-text-field label="주소" v-model="addr1" hide-details="auto" ></v-text-field>
          <v-text-field label="상세주소" v-model="addr2" hide-details="auto" ></v-text-field>
          <v-text-field label="요청사항" v-model="deliveryrequest" hide-details="auto" ></v-text-field>
          {{ deliveryStatus }}
        </form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'CartAddInfo',
    data() {
      return {
        isolatedList : [],
        zip: '',
        addr1: '',
        addr2: '',
        deliveryrequest: '',
        checkbox : false,
        isMountainousArea: '',
        deliveryStatus : '' // 배송가능지역유무판별
      }
    },
    created(){
      this.getisolatedRegionList();
    },
    computed : {
    },
    
    methods: {
      CheckboxChange() {
        if (this.checkbox == true ) {
          this.zip = this.$store.state.user.postcode
          this.addr1 = this.$store.state.user.address
          this.addr2 = this.$store.state.user.detail_address
          this.$emit('getAddress', this.zip, this.addr1, this.addr2);
        } else {
          this.zip = '';
          this.addr1 = '';
          this.addr2 = '';
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
              this.zip = parseInt(data.zonecode); //5자리 새우편번호 사용
              this.addr1 = fullRoadAddr;
              // 이벤트 발생
              this.$emit('getAddress', this.zip, this.addr1, this.addr2);
          }
        }).open();
      },
      getAddress() {
        this.$emit('getAddress', this.zip, this.addr1, this.addr2);
      },
      getdelivery(){
        this.$emit('getdelivery', this.deliveryrequest);
      },
      async getisolatedRegionList(){
          await axios.get(`/api/isolatedRegionList`)
                      .then(response => {
                            this.isolatedList = response.data;
                      })
                      .catch(err => console.log(err));
      },
      checkDeliveryStatus() {
      if (this.zip && this.isolatedList.length > 0) {
        this.isMountainousArea = this.isolatedList.some(list => {
          return this.zip >= list.start_code && this.zip <= list.end_postcode;
        });
        this.deliveryStatus = this.isMountainousArea ? '배송불가지역' : '배송가능지역';
      } else {
        this.deliveryStatus = '';
      }
    }

    }
  }
  </script>
  
  <style scoped>
  input {
    border: 1.2px solid black;
    padding: 5px;
    width: 100%;
  }
  
  .address {
    text-align: left;
  }
  
  .container {
    text-align: center;
  }
  
  .container p {
    margin: 10px 0;
  }
  
  .container button {
    margin-top: 10px;
  }
</style>