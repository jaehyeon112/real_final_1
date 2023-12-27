<template>
    <div class="">
        <h1>쿠폰정보</h1>
        <hr>
        <v-select :items="coupons" label="사용가능 쿠폰"></v-select>
        <h1>포인트정보</h1>
        <hr>
        <p>포인트 <span v-if="pointList.length > 0">{{ pointList[0].point }} 원</span></p>
        <input style="border-bottom: 1px solid black;" v-if="pointList.length > 0" type="number" v-model="inputValue" @input="updateInputValue"/>
        <v-btn v-if="pointList.length > 0" id="target_btn" @click="useAllPoints" :disabled="pointList[0].point == 0">모두 사용</v-btn>
        <hr>
        <p>{{ couponList }}</p>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
	name: 'OrderPointInfo',
    data(){
        return {
            inputValue: 0,
            coupons: []
        }
    },
    props : {
        couponList: {
            type: Array,
        },
        pointList: {
            type: Array,
        },
    },
    methods : {
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        ...mapActions(['saveInputValue']),
        updateInputValue() {
            if(this.inputValue < this.pointList[0].point) {
                this.saveInputValue(this.inputValue);
            }else{
                alert('입력값이 현재 포인트보다 많습니다.');
                this.inputValue = 0;
            }
        },
        useAllPoints(){
            if(this.pointList[0].point > 0 ){
                this.inputValue = this.pointList[0].point
            }
        },
        getlocations(){
            for(let i = 0; i < this.couponList.length; i++){
                console.log(i);
                this.coupons.push(this.couponList[i].coupon_name + ' ' + this.couponList[i].coupon_content + ' 만료날짜' + this.getDateFormat(this.couponList[i].end_coupon));
            }
        }
    },
    watch : {
        couponList(){
            this.getlocations();
        }
    }
};
</script>