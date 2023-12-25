<template>
    
    <div>
        "message 출력"하기
        <button type="button">로그인화면으로가는거</button>
        <button type="button">홈으로가는거</button>
    </div>
</template>

<script>

</script>

<style scoped>

</style>


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
        <button type></button>
        
        </div>


        <div>
            
            <!-- reCaptcha api (로그인 오류날 때)-->
            
        </div>


        <div>
            <!--아이디/비밀번호 찾기 -->
            <button type></button>
            <!--회원가입 버튼 -->
            <button type></button>
        </div>



        <div>
            <!--SNS로그인 (카카오 , 네이버 api)_ 로고이미지-->
            <img v-bind:src="카카오로고이미지" />
            <img v-bind:src="네이버로고이미지" />

        </div>
    </form>
    </div>
    
</div>