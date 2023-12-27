<template>
    <v-container>
            <v-card>
                <p>주문 금액 <span>{{ totalprice - discountprice }} 원</span></p>
                <ul>
                    <li>상품 전체금액 <span>{{ totalprice }} 원</span></li>
                    <li>상품 할인금액 <span>{{ discountprice }}</span>원</li>
                </ul>
                <p>배송비{{ delivery }} 원</p>
                <p>쿠폰 할인 원</p>
                <p>포인트 {{ $store.state.inputValue }} 원</p>
                <hr>
                <p>최종 결제금액 <span style="color: red;">25,000 원</span></p>
            </v-card>
    </v-container>
</template>
<script>

export default {
    name : 'OrderPrice',
    props: {
    cartList: {
        type: Array,
        required: true,
    },
    },
    data() {
       return {
            totalprice : 0,
            discountprice : 0,
            deliveryprcie : 0
       }
    },
    computed : {
        totalprice(){
            let total = 0;
            for (let i = 0; i < this.cartList.length; i++) {
                console.log(typeof this.cartList[i].price)
                total += this.cartList[i].price;
            } 
            return this.totalprice = total
        },
        discountprice(){
            let distotal = 0;
            for (let i = 0; i < this.cartList.length; i++) {
                if(this.cartList[i].discount_price != null){
                    distotal += this.cartList[i].price - this.cartList[i].discount_price;
                }
            } 
            return this.discountprice = distotal
        },
        delivery(){
            let deliveryprcie = 0;
            let distotal = 0;
            for(let i = 0; i < this.cartList.length; i++){
                if(this.cartList[i].discount_price != null){
                    distotal += this.cartList[i].discount_price;
                }else{
                    distotal += this.cartList[i].price;
                }
            }
            if(distotal < 40000){
                deliveryprcie = 3000;
            }
            return deliveryprcie;
        },
    }
}
</script>
<style scoped>
* {
    list-style: none;
}
</style>