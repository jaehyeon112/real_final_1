<template>
  <v-container>
    <h1>쿠폰정보</h1>
    <hr />
    <v-select v-if="Coupons"
      v-model="selectedCouponIndex" :items="coupons" label="사용가능 쿠폰" :disabled="!Coupons" @change="updateSelectedCoupon"
      return-object></v-select>
    <v-select v-else label="사용가능한 쿠폰이 없습니다" disabled></v-select>
    <h1>포인트정보</h1>
    <hr />
    <p>포인트 <span v-if="Points">{{ pointList[0].point }} 원</span></p>
    <input
      style="border-bottom: 1px solid black; text-align: center;"
      v-if="Points || CartItems"
      type="number"
      v-model="inputValue"
      @input="updateInputValue"
    /> 원

  <v-btn
    v-if="Points"
    @click="useAllPoints"
    :disabled="this.$store.state.user.point === 0 || (CheckCoupon && selectedCouponIndex !== 0)"
  >
    모두 사용
  </v-btn>
  </v-container>
</template>
  
  <script>
  export default {
    name: 'CartPointInfo',
    data() {
      return {
        inputValue: 0,
        selectedCouponIndex: '쿠폰 선택안함', // 쿠폰의 기본값은 선택안함
        CheckCoupon: false, // 선택된 쿠폰이 있는지 확인하기 위한 변수
      };
    },
    props: {
      couponList: {
        type: Array,
        default: () => []
      },
      pointList: {
        type: Array
      },
      cartList: {
        type: Array
      },
      coupon: {
        type: Number
      },
      delivery : {
        type: Number
      },
    },
    methods: {
        getDateFormat(date) {
            return this.$dateFormat(date,'yyyy년 MM월 dd일');
        },
        updateInputValue() {
      let totalDiscountPrice = this.cartList.reduce(
        (total, item) =>
          total + (item.quantity * item.discount_price),
        0
      );
      this.total = totalDiscountPrice + this.delivery - this.coupon;
      if (this.inputValue > this.total) {
        alert('결제하실 금액보다 높게 사용하실수 없습니다');
        this.inputValue = 0;
      } else {
        if (this.inputValue <= this.pointList[0].point) {
          let data = this.inputValue;
          this.$emit('inputValue', data);
        } else {
          console.log(this.cartList);
          alert('입력값이 현재 포인트보다 많습니다. 올바른 값을 입력해주세요.');
          this.inputValue = 0;
        }
      }
},
    useAllPoints() {
      let totalDiscountPrice = this.cartList.reduce(
        (total, item) =>
          total + (item.quantity * item.discount_price),
        0
      );
      this.total = totalDiscountPrice + this.delivery - this.coupon;
      if (this.$store.state.user.point > 0) {
        if (this.total  < this.$store.state.user.point) {
          this.inputValue = this.total;
          this.$emit('inputValue', this.inputValue);
        } else {
          this.inputValue = this.pointList[0].point;
          this.$emit('inputValue', this.inputValue);
        }
        this.selectedCouponIndex = '쿠폰 선택안함'
      }
    },
    updateSelectedCoupon() {
      let selectedCouponIndex = this.coupons.indexOf(this.selectedCouponIndex);
      let couponNo = selectedCouponIndex !== 0 ? this.couponList[selectedCouponIndex - 1].coupon_no : null;
      let discountRate = selectedCouponIndex !== 0 ? this.couponList[selectedCouponIndex - 1].coupon_discount_rate : 0;
      this.$emit('couponNo', couponNo);
      this.$emit('discountRate', discountRate);
  
  if (selectedCouponIndex !== 0) {
    this.CheckCoupon = true;
    this.inputValue = 0;
  } else {
    this.CheckCoupon = false;
  }
},
      getLocations() {
        let coupons = ["쿠폰 선택안함"];
        for (let i = 0; i < this.couponList.length; i++) {
          // if(this.couponList[i].coupon_able == 0){
            let couponName = this.couponList[i].coupon_content;
            let couponStart = this.getDateFormat(this.couponList[i].start_coupon);
            let couponEnd = this.getDateFormat(this.couponList[i].end_coupon);
            let couponrate = this.couponList[i].coupon_discount_rate;
            let couponInfo = `[${couponName}] 쿠폰할인율 ${couponrate}% 발급일자 ${couponStart} 만료일자 ${couponEnd}`;
            coupons.push(couponInfo);
          // }
        }
        return coupons;
      },
    },
    watch: {
      selectedCouponIndex() {
        this.updateSelectedCoupon();
      }
    },
    computed: {
      Coupons() {
        return this.couponList.length > 0;
      },
      Points() {
        return this.pointList.length > 0;
      },
      CartItems() {
        return this.cartList.length > 0;
      },
      coupons() {
        return this.getLocations();
      },
    }
  };
  </script>