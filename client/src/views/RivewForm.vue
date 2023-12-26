<template>
    <div>
        <form>
            <h2 v-if="등록버튼을 누르고 들어오면">리뷰등록</h2>
            <h2 v-else="수정버튼을 누르고 들어오면">리뷰수정</h2>

            <input type="text" value="//rivew_no" readonly>
            <input type="text" value="//prod_name" readonly>
            <input type="text" value="//dfdf" readonly>
            <input type="slide">
            <textarea placeholder="자유롭게 작성해 주세요 (최소글자 50자)" ></textarea>
            <p>첨부파일</p>
            <!--이미지 여러개 첨부하는 곳!!-->
        </form>
        <button click="insertRivew()">리뷰등록</button>
    </div>
</template>
<script>
export default{

}
</script>