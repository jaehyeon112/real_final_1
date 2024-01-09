<template>
    <div>
        <br>
        <br>
        <br>
        <table class="table" border="2px">
            <thead >
                <tr >
                <th>쿠폰번호</th>
                <th>쿠폰이름</th>
                <th>쿠폰내용</th>
                <th>쿠폰 할인율</th>
                <th>쿠폰시작일</th>
                <th>쿠폰만료일</th>
                <th>쿠폰사용가능여부</th>
                
                </tr>
            </thead>
            <tbody>
                
                <tr :key="idx" v-for="(coupon, idx) in couponList" >
                    <td>{{ coupon.coupon_no }}</td>
                    <td v-if="coupon.coupon_name=='q1'">회원가입쿠폰</td>
                    <td v-else >생일쿠폰</td>
                    <td>{{ coupon.coupon_content }}</td>
                    <td >{{ coupon.coupon_discount_rate }} %</td>
                    <td>{{ $dateFormat(coupon.start_coupon,"yyyy년MM월dd일") }}</td>
                    <td>{{ $dateFormat(coupon.end_coupon,"yyyy년MM월dd일") }}</td>
                    <td v-if=" coupon.coupon_able==0" >사용 가능</td>
                    <td v-else-if="coupon.coupon_able ==1 & coupon.end_coupon>today" style="color: gray;">기간만료</td>
                    <td v-else style="color: gray;">사용 완료</td>
                        
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            couponList:[],
            today:''
        }
    },
    created(){
        this.getCouponList();
        this.today=this.getToday();
    },
    methods:{
        async getCouponList(){
            this.couponList = (await axios.get(`/api/myCoupon`,)
                                            .catch(err=>console.log(err))).data
            console.log(this.couponList);                                
        },
        getToday(){
            return this.$dateFormat('','yyyy년MM월dd일');
        }
    }
}
</script>
<style scoped>
th{
    background-color: #FFA726;
}
</style>
