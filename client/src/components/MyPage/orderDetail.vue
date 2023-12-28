<template>
    <div>
        <div class="list-group">
            <label class="list-group-item d-flex gap-2" ><!--여기 포문 돌려라-->
            <input class="form-check-input flex-shrink-0" type="checkbox" value="" checked="">
            <span>
                First 상품 
                <small class="d-block text-body-secondary">상품가격</small>
                <small class="d-block text-body-secondary">할인된가격</small>
                <small class="d-block text-body-secondary">수량</small>
            </span>
            <p>배송완료</p>
            <button @click="goToReview">리뷰작성</button>
            </label>
        </div>   
    </div>
</template>
<script>


export default {
   data(){
    return{
        productList:[]
    }
   },
   created(){

   },
   methods:{
    goToReview(productNo){
            this.$router.push({path:'/review',query:{pno : productNo}})
        }
   }
   
}
</script>
