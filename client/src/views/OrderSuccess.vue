<template>
    <v-container>
        <v-row>
            <v-col col="12">
                <h1 style="text-align: left;">주문완료</h1>
                <v-card>
                    <OrderProdInfo
                    :orderList="orderList"/>

                </v-card>
                <v-card>
                </v-card>
                <v-card>
                    <OrderAddrInfo/>
                </v-card>
            </v-col>
        </v-row>
        {{ $store.state.orderNo }}
    </v-container>
</template>
<script>
import axios from 'axios';

import OrderProdInfo from '../components/order/OrderProdInfo.vue';
import OrderAddrInfo from '../components/order/OrderAddrInfo.vue';

export default{
    name: 'OrderForm',
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