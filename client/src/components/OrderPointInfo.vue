<template>
    <div>
      <h1>쿠폰정보</h1>
      <hr>
      <v-select v-if="hasCoupons"
                v-model="selectedCouponIndex"
                :items="couponOptions"
                label="사용가능 쿠폰"
                :disabled="!hasCoupons"
                @change="updateSelectedCoupon"
                return-object></v-select>
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
  export default {
    name: 'OrderPointInfo',
    data() {
      return {
        inputValue: 0,
        selectedCouponIndex: 0
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
    methods: {
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        updateInputValue() {
            let totalDiscountPrice = this.cartList.reduce((total,item) => total + (item.quantity * (item.discount_price * item.quantity)),0);
        if (this.inputValue > totalDiscountPrice) {
            alert('입력값이 상품값보다 큽니다. 올바른 값을 입력해주세요.');
            this.inputValue = 0;
        } else {
            if (this.inputValue < this.pointList[0].point) {
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
        let total = this.cartList.reduce((total,item) => total + (item.quantity * (item.discount_price * item.quantity)),0);
        console.log(total);
        if (this.pointList[0].point > 0) {
            if (total < this.pointList[0].point) {
                let data = this.inputValue = total;
                this.$emit('inputValue', data);
            }
        }
    },
    updateSelectedCoupon() {
      let selectedCouponIndex = this.couponOptions.indexOf(this.selectedCouponIndex);
      let discount_rate = this.couponList[selectedCouponIndex -1].coupon_discount_rate
      this.$emit('discountRate', discount_rate);
      //첫번째값은 메서드 명 


    },
      getLocations() {
        let conpons = ["선택안함"];
        for (let i = 0; i < this.couponList.length; i++) {
          let couponNo = this.couponList[i].coupon_no;
          let couponName = this.couponList[i].coupon_name;
          let couponStart = this.getDateFormat(this.couponList[i].start_coupon);
          let couponEnd = this.getDateFormat(this.couponList[i].end_coupon);
          let couponrate = this.couponList[i].coupon_discount_rate;
          let couponInfo = `쿠폰번호 ${couponNo} ${couponName} 발급날짜 ${couponStart} 만료날짜 ${couponEnd} 할인율 ${couponrate} %`;
          conpons.push(couponInfo);
        }
        return conpons;
      },
    },
    watch: {
      selectedCouponIndex() {
        this.updateSelectedCoupon();
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
    }
  };
  </script>