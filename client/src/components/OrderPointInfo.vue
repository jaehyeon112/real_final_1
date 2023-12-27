<template>
    <div class="container">
        <h1>쿠폰정보</h1>
        <hr>
        <select :key="idx" v-for="(list, idx) in couponList">
            <option value="" disabled selected>사용가능 쿠폰 / {{ list.count }} 장</option>
            <option>{{ '쿠폰 ' + list.coupon_name + ' ' + list.coupon_content + '발급일자' + getDateFormat(list.start_coupon) + '만료일자' + getDateFormat(list.end_coupon) }}</option>
        </select>
        <h1>포인트정보</h1>
        <p>포인트 <span v-if="pointList.length > 0">{{ pointList[0].point }} 원</span></p>
        <input v-if="pointList.length > 0" type="number" v-model="inputValue" @input="updateInputValue" :disabled="pointList[0].point == 0" />
        <button v-if="pointList.length > 0" id="target_btn" @click="useAllPoints" :disabled="pointList[0].point == 0">모두 사용</button>
        <hr>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
	name: 'OrderPointInfo',
    data(){
        return {
            inputValue: 0
        }
    },
    props : {
        couponList: {
            type: Array,
            required: true,
        },
        pointList: {
            type: Array,
            required: true,
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
        }
    }
};
</script>