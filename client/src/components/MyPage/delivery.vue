<template>
    
    <div>       
    <br>    
    <br>    
    <v-row justify="end">
    <v-dialog
      v-model="dialog"
      persistent
      width="1200"
      height="1500"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          배송지 추가
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">배송지</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <label>
                    <p>배송지 이름</p>
                    <input type="text"  style="background-color:#FFB300 ;" v-model="delivery.delivery_name" >
                    </label>
                    <v-input type="text"  placeholder="우편번호" style="background-color:#FFB300" v-model="delivery.delivery_postcode" />
                    <v-btn @click="search()">우편번호 찾기</v-btn><br>
                    <v-input type="text"  id="roadAddress" placeholder="도로명주소" style="background-color:#FFB300" v-model="delivery.delivery_address"/>
                    <span id="guide" style="color:#000;display:none"></span>
                    <v-input type="text" id="detailAddress" placeholder="상세주소" style="background-color:#FFB300" v-model="delivery.delivery_detail_address"/>
                    <!-- <v-btn  @click="isUpdated? UpdateDelivery() :InsertDelivery()">저장</v-btn> -->
            </v-row>
          </v-container>
      
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false, InsertDelivery()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

<br>
        <table class="table" border="1">
            <thead>
                <tr>
                    <th>주소</th>
                    <th >수정</th>
                    <th >삭제</th>
                </tr>
            </thead>
            <tbody> 
                    <tr >
                      <td> 기본배송지 </td>
                      <td>주소 {{defaultDelivery.address }}{{ defaultDelivery.detail_address }}<hr style="color: aliceblue;">우편번호{{ defaultDelivery.postcode }}</td>
                      <td><v-btn @click="goToUpdated()" justify="center">수정버튼</v-btn></td>
                    </tr>

                    <tr :key="idx" v-for="(delivery, idx) in deliveryList">
                    <td style="display:none">{{delivery.delivery_no}}</td>
                    <td>{{ delivery.delivery_name }}</td>
                    <td>주소{{delivery.delivery_address }}{{ delivery.delivery_detail_address }}<hr style="color: aliceblue;">우편번호{{ delivery.delivery_postcode }}</td> 
                    <td><v-btn @click="deletedelivery(delivery.delivery_no)" justify="center">삭제버튼</v-btn></td>
                </tr>
                
            </tbody>    
           
        </table>
    </div>
</template>


<script>
import axios from 'axios';
//import addDeli from "@/components/MyPage/addDelivery.vue";

export default {
    data(){
        return{
            deliveryList:[],
            defaultDelivery:{},
            picked:'',
            dialog: false,
            delivery:{
                delivery_no:'',
                delivery_name:'',
                user_id:'',
                delivery_address:'',
                delivery_detail_address:'',
                delivery_postcode:''
            },
            isUpdated : false
        }    
    },
   
    created(){
    
        this.getDeliveryList();
        this.getDefaultDeliList();
        
      
    },
    mounted() {
    // radio data 초기 set
    //this.picked = this.deliveryList[0];
    },

    methods:{
        async getDeliveryList() {
         this.deliveryList = (await axios.get(`/api/addDelivery/`)
                                            .catch(err=>console.log(err))).data
        },
        async getDefaultDeliList(){
          this.defaultDelivery = (await axios.get(`/api/deliveryBasic/${this.$store.state.user.user_id}`)
                                                .catch(err=>console.log(err))).data[0]
        },
        async InsertDelivery(){ //배송지 추가
            let obj ={
                param:{
                    user_id : this.$store.state.user.user_id,
                    delivery_name : this.delivery.delivery_name,
                    delivery_address: this.delivery.delivery_address,
                    delivery_detail_address: this.delivery.delivery_detail_address,
                    delivery_postcode: this.delivery.delivery_postcode
                }
            }

            let result= await axios.post(`/api/addDelivery`, obj)
                                      .catch(err=>{console.log(err)})
            if(result.data.insertId>0){
            alert('등록완료');
                this.delivery.delivery_no = result.data.insertId; 
                //리로드...?
                this.getDeliveryList()
            }                
     
        },
      async deletedelivery(idx){
        console.log(idx + '이기만나')
        let data = await axios.delete(`/api/delDelivery/${idx}`)
                              .catch(err=>console.log(err));
                  if(data.data.affectedRows>0){                        
                     alert('배송지 삭제')
                     this.getDeliveryList()
                  }
      }, 
      goToUpdated(){
        this.$router.push({path : '/putpass'})
      } ,            
    //주소api
    search(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
            const vueObj = this;

            new window.daum.Postcode({
            oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                vueObj.delivery.delivery_postcode = data.zonecode;
                vueObj.delivery.delivery_address = roadAddr;
                //vueObj.userInfo.AddressJ = data.jibunAddress;
                
                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                // if(roadAddr !== ''){
                //     document.getElementById("extraAddress").value = extraRoadAddr;
                // } else {
                //     document.getElementById("extraAddress").value = '';
                // }

                var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();
      
        }

    }
}
</script>
<style scoped>
th{
    background-color: #FFA726;
}
</style>
