<template>
    <div>
        <table class="table" border="1">
            <thead>
                <tr>
                    <th >선택</th>
                    <th >주소</th>
                    <th >수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody> 
                <v-radio-group>
                <tr :key="idx" v-for="(delivery, idx) in deliveryList">
                    
                        <td  style ="width: 100px;"><v-radio value={{idx}} label={{idx}}></v-radio></td> 
                        <td  style ="width: 390px;">{{ delivery.delivery_name }}<hr style="color: aliceblue;">{{delivery.delivery_address }}{{ delivery.delivery_detail_address }}</td>
                        <td  style ="width: 100px;"><button @click="goToUpdatePage(deliveryList.delivery_no)">수정버튼</button></td>
                        <td  style ="width: 100px;"><button @click="delteList">삭제버튼</button></td>
                    </tr>
                </v-radio-group>   
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
            //checked:true
        }    
    },
   
    created(){
        this.getDeliveryList()
    },
    methods:{
        async getDeliveryList() {
         this.deliveryList = (await axios.get(`/api/addDelivery/test`)
                                            .catch(err=>console.log(err))).data
        },
        goToUpdatePage(addDeli){
            this.$router.push({path :'myPage/addDeli', query : {addDelivery : addDeli}})
        }
    }
}
</script>