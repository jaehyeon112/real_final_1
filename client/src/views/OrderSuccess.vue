<template>
    <v-container>
        <v-row >
            <v-col style="padding-left: 400px;" >
                <v-card width="1000">
                    <h1 style="text-align: center;">주문완료</h1>
                    <OrderProdInfo
                    :orderList="orderList"/>
                    <OrderAddrInfo
                    :orderList="orderList"/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';

import OrderProdInfo from '../components/order/OrderProdInfo.vue';
import OrderAddrInfo from '../components/order/OrderAddrInfo.vue';

export default{
    components: {
        OrderProdInfo,
        OrderAddrInfo, 
    },
    data(){
        return {
            orderList : []
        }
    },
    created(){
        this.fetchOrderList();
    },
    methods : {
        async fetchOrderList() {
            await axios.get(`/api/orderList/${this.$store.state.orderNo}`, {
            })
            .then(response => {
                this.orderList = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    }
}
</script>
<style scoped>
 * {
    padding: 15px;
 }
</style>