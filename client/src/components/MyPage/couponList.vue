<template>
    <div>
        <table class="table" border="2px">
            <thead>
                <tr>
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
                <tr :key="idx" v-for="(coupon, idx) in couponList">
                    <td>{{ coupon.couponinfo_no }}</td>
                    <td>{{ coupon.coupon_name }}</td>
                    <td>{{ coupon.coupon_content }}</td>
                    <td>{{ coupon.coupon_discount_rate }} %</td>
                    <td>{{ coupon.start_coupon }}</td>
                    <td>{{ coupon.end_coupon }}</td>
                    <td>{{ coupon.coupon_able }}</td>
                    
                    
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
            couponList:[]
        }
    },
    created(){
        this.getCouponList()
    },
    methods:{
        async getCouponList(){
            this.couponList = (await axios.get(`/api/coupon/test`,)
                                            .catch(err=>console.log(err))).data
            console.log(this.couponList);                                
        }
    }
}
</script>
