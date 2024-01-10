<template>
    <v-container>
      <h1>배송지 정보</h1>
      <hr>
      <div>
        <v-radio-group v-model="selectedAddressType" inline>
          <v-radio v-for="(delivery) in deliveryList" :key="delivery.delivery_no" :label="delivery.delivery_name" :value="[delivery.delivery_address, delivery.delivery_detail_address, delivery.delivery_postcode]">
          </v-radio>
        </v-radio-group>
        <v-form @input="submitAddress"> 
          <v-responsive class="mx-auto" max-width="500" inline>
            <v-btn @click="showApi">우편번호 찾기</v-btn>
            {{ deliveryStatus }}
          </v-responsive>
            <v-text-field label="우편번호" hide-details="auto" v-model="zip" style="width: 200px;" :rules="[required]" clearable maxlength="5"></v-text-field>
            <v-text-field label="주소" v-model="addr1" hide-details="auto" :rules="[required]" clearable></v-text-field>
            <v-text-field label="상세주소" v-model="addr2" hide-details="auto" clearable></v-text-field>
            <v-text-field label="배송요청사항을 입력해주세요" v-model="deliveryrequest" hide-details="auto" clearable></v-text-field>
        </v-form>
      </div>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'CartAddInfo',
    data() {
      return {
        isolatedList : [],
        deliveryList : [],
        zip: '',
        addr1: '',
        addr2: '',
        deliveryrequest: '',
        deliveryStatus : '', // 배송가능지역유무판별
        selectedAddressType: [],// 선택된 배송지 유형
        isMountainousArea : false,
      }
    },
    created(){
      this.getdeliveryList();
      this.getisolatedRegionList();
    },
    computed : {
      deliveryStatus() {
          if (this.zip && this.zip.length == 5 && this.isolatedList.length > 0) {
            let isMountainousArea = this.isolatedList.some(list => {
              return this.zip >= list.start_code && this.zip <= list.end_postcode;
            });
            if (isMountainousArea) {
              alert('배송불가지역입니다 주소를 다시 입력해주세요');
              this.zip = '';
              this.addr1 = '';
              this.addr2 = '';
            } else {
              // alert('배송가능지역입니다');
            }
          } 
        },
    },
    watch : {
      selectedAddressType: 'SelectedAddressTypeCheck'
    },
    methods: {
      submitAddress(){
        this.$emit('getAddress', {
        zip: this.zip,
        addr1: this.addr1,
        addr2: this.addr2,
        deliveryrequest: this.deliveryrequest
      });
      },
      async getisolatedRegionList(){
          await axios.get(`/api/isolatedRegionList`)
                      .then(response => {
                            this.isolatedList = response.data;
                      })
                      .catch(err => console.log(err));
      },
      async getdeliveryList() { // 추가배송지
         await axios.get('/api/adddeliveryList', {
        })
        .then(response => {
          this.deliveryList = response.data;
          // 초기 선택값 
          this.selectedAddressType = [this.deliveryList[0].delivery_address, this.deliveryList[0].delivery_detail_address, this.deliveryList[0].delivery_postcode];
            })
            .catch(error => {
              console.log(error)
            });
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
              this.addr2 = ''
              // 이벤트 발생
              this.getAddress();
          }
        }).open();
      },
      getAddress() {
        this.$emit('getAddress', this.zip, this.addr1, this.addr2,this.deliveryrequest);
      },
      required(value) { // 필수입력조건
        return !! value || '필수로 입력해야 합니다'
      },
      SelectedAddressTypeCheck(select) {
        if (select) {
          this.zip = select[2];
          this.addr1 = select[0];
          this.addr2 = select[1];

          this.getAddress();
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