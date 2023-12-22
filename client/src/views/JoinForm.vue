
<template>
    <div>
        <h1>회원가입 & 수정 화면 </h1>
        <form>
            <div>
                <!-- 아이디 형식 유효성검사하고, 중복체크해야햐함 -->
                <label>ID</label>
                <input type="text">
                <button type="button">중복체크</button>
            </div>

            <div>
                <!-- 유효성검사해야함 -->
                <label>PASSWORD</label>
                <input type="text">
            </div>

            <div>
                <label>password check</label>
                <input type="text">
            </div>

            <div>
                <label></label>
                <input type="text">
            </div>

            <div>
                <label>이름</label>
                <input type="text">
            </div>

            <div>
                <!-- 이메일 중복체크 → 이메일로 인증번호 보내기 → 인증번호 입력받고  → 이메일로 받은거랑 입력한 인증번호랑 비교 -->
                <label>E-MAIL</label>
                <input type="number">
            </div>

            <div>
                <label>E-MAIL 인증번호 입력</label>
                <input type="number">
            </div>

            <div>
                <!-- 휴대폰 중복체크 인증 api-->
                <label>연락처</label>
                <input type="text">
                <button type="button">인증하기</button>
            </div>

            <div>
                <label>주소</label>
                <input type="text">
                <button type="button">주소지검색버튼</button>
            </div>

            <div>
                <label>생년월일</label>
                <select>
                    <option value="year">년</option>
                    <option value="month">월</option>
                    <option value="date">일</option>
                </select>
            </div>

            <div>
                <input type="checkbox">전체 동의합니다.
                <input type="checkbox">이용약관1
                <input type="checkbox">약관2
                <input type="checkbox">약관3 
                 <input type="checkbox">(선택)약관4(알림받기)

            </div>

        </form>
    </div>
</template>


<script>

</script>

<style scoped>

</style>