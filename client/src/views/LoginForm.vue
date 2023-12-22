<template>
<div>

    <div>
    
    <h1> 홈페이지 이름 </h1>
    <h2> 로그인 </h2>
    
    <form>
        <div>
        
        <!--아이디 입력 -->
        <label> ID </label>
        <input type = "text">

        <!--비밀번호 입력 -->
        <label> PASSWORD </label>
        <input type = "text">

        <!--로그인버튼 -->
        <label> LOG-IN </label>
        <button type>
        <input type = "button">
        </div>


        <div>
            
            <!-- reCaptcha api (로그인 오류날 때)-->
            
        </div>


        <div>
            <!--아이디/비밀번호 찾기 -->
            <button type>
            <!--회원가입 버튼 -->
            <button type>
        </div>



        <div>
            <!--SNS로그인 (카카오 , 네이버 api)_ 로고이미지-->
            <img v-bind:src="카카오로고이미지" />
            <img v-bind:src="네이버로고이미지" />

        </div>
    </form>
    </div>
    
</div>
</template>





<script>

</script>

<style scoped>

</style>
