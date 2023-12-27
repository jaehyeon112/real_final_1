<template>
    <div>
      <h1>쿠폰정보</h1>
      <hr>
      <v-select v-if="hasCoupons"
                v-model="selectedCouponIndex"
                :items="couponOptions"
                label="사용가능 쿠폰"
                :disabled="!hasCoupons"
                @change="updateSelectedCoupon"></v-select>
      <h1>포인트정보</h1>
      <hr>
      <p>포인트 <span v-if="hasPoints">{{ pointList[0].point }} 원</span></p>
      <input style="border-bottom: 1px solid black;"
             v-if="hasPoints || hasCartItems"
             type="number"
             v-model="inputValue"
             @input="updateInputValue"/>
      <v-btn v-if="hasPoints"
             id="target_btn"
             @click="useAllPoints"
             :disabled="pointList[0].point == 0">모두 사용</v-btn>
      <hr>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'OrderPointInfo',
    data() {
      return {
        inputValue: 0,
        selectedCouponIndex: 0 // 기본 쿠폰 선택값은 '선택안함'
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
      }
    },
    created() {
      this.initializeCoupons();
    },
    methods: {
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        ...mapActions(['saveInputValue', 'saveCouponDiscountAmount']),
        updateInputValue() {
            let totalDiscountPrice = this.cartList.reduce((total, item) => total + item.discount_price, 0);
        if (this.inputValue > totalDiscountPrice) {
            alert('입력값이 상품값보다 큽니다. 올바른 값을 입력해주세요.');
            this.inputValue = 0;
        } else {
            if (this.inputValue < this.pointList[0].point) {
                this.saveInputValue(this.inputValue);
            } else {
                console.log(this.cartList);
                alert('입력값이 현재 포인트보다 많습니다. 올바른 값을 입력해주세요.');
                this.inputValue = 0;
            }
        }
    },
    useAllPoints() {
        let totalDiscountPrice = this.cartList.reduce((total, item) => total + item.discount_price, 0);
        if (this.pointList[0].point > 0) {
            if (totalDiscountPrice < this.pointList[0].point) {
                this.inputValue = totalDiscountPrice;
                this.saveInputValue(this.inputValue);
            }
        }
    },
    initializeCoupons() {
      if (this.hasCoupons) {
        this.updateSelectedCoupon(); // 선택된 쿠폰 정보 업데이트
      }
    },
    updateSelectedCoupon() {
        const selectedCoupon = this.couponList[this.selectedCouponIndex];
        if (selectedCoupon) {
            const couponDiscountRate = selectedCoupon.coupon_discount_rate / 100;
            const totalDiscountPrice = this.cartList.reduce((total, item) => total + item.discount_price, 0);
            const discountAmount = Math.floor(totalDiscountPrice * couponDiscountRate);
            this.saveCouponDiscountAmount(discountAmount);
            this.selectedCouponInfo = `${this.getCouponLabel(selectedCoupon)} 할인 금액: ${discountAmount}원`;
            this.discountAmount = discountAmount;
            console.log("할인 금액:", discountAmount);
        } else {
            this.discountAmount = 0;
        }
    },
      getLocations() {
        const coupons = ["선택안함"];
        for (let i = 0; i < this.couponList.length; i++) {
          const couponLabel = this.getCouponLabel(this.couponList[i]);
          const couponStart = this.getDateFormat(this.couponList[i].start_coupon);
          const couponEnd = this.getDateFormat(this.couponList[i].end_coupon);
          const couponInfo = `${couponLabel} 발급날짜 ${couponStart} 만료날짜 ${couponEnd}`;
          coupons.push(couponInfo);
        }
        return coupons;
      },
      getCouponLabel(coupon) {
        if (coupon && coupon.coupon_name) {
          return coupon.coupon_name;
        }
        return null;
      }
    },
    watch: {
      couponList: {
        immediate: true,
        handler() {
          this.initializeCoupons();
        }
      }
    },
    computed: {
      hasCoupons() {
        return this.couponList.length > 0;
      },
      hasPoints() {
        return this.pointList.length > 0;
      },
      hasCartItems() {
        return this.cartList.length > 0;
      },
      couponOptions() {
        return this.getLocations();
      },
      selectedCouponInfo() {
        if (this.selectedCouponIndex !== null) {
          const selectedCoupon = this.couponList[this.selectedCouponIndex];
          if (selectedCoupon) {
            const couponLabel = this.getCouponLabel(selectedCoupon);
            const couponExpiration = this.getDateFormat(selectedCoupon.end_coupon);
            return `${couponLabel} 만료날짜 ${couponExpiration}`;
          }
        }
        return '';
      }
    }
  };
  </script>