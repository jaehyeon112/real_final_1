<template>
    <div>
        <table class="table" border="1">
            <thead>
                <tr>
                    <th>선택</th>
                    <th >주소</th>
                    <th >수정</th>
                    <th >삭제</th>
                </tr>
            </thead>
            <tbody> 
               
                <tr :key="idx" v-for="(delivery, idx) in deliveryList">
                    <v-radio-group v-model="picked">
                    <td  ><v-radio :label= "`${delivery.delivery_name}`" :value="idx"></v-radio></td>
                    </v-radio-group> 
                    <td  >{{ delivery.delivery_name }}<hr style="color: aliceblue;">{{delivery.delivery_address }}{{ delivery.delivery_detail_address }}</td>
                    <td  ><button @click="goToUpdatePage(deliveryList.delivery_no)">수정버튼</button></td>
                    <td  ><button @click="delteList">삭제버튼</button></td>
                </tr>
                
            </tbody>    
           
        </table>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            deliveryList:[],
            picked:''
        }    
    },
   
    created(){
        this.getDeliveryList()
    },
    mounted() {
    // radio data 초기 set
    this.picked = this.deliveryList[0];
    },

    methods:{
        async getDeliveryList() {
         this.deliveryList = (await axios.get(`/api/addDelivery/${this.$store.state.user.user_id}`)
                                            .catch(err=>console.log(err))).data
        },
        goToUpdatePage(addDeli){
            this.$router.push({path :'myPage/addDeli', query : {addDelivery : addDeli}})
        }
    }
}
</script>