<temlate>
    <div>
        <h1>아이디 비번찾기 화면</h1>
        <form>
            <div>
                <!-- 아이디 비번 선택 - 라디오버튼 -->
                <input type="radio" v-bind:value="아이디찾기">아이디찾기
                <input type="radio" v-bind:value="비밀번호찾기">비밀번호찾기
                

                <!--이름 입력 -->
                <label> 이름 </label>
                <input type = "text">

                <!--이메일 입력 -->
                <label> 이메일 </label>
                <input type = "text">

                <!--아이디 입력 -->
                <label> 아이디 </label>
                <input type = "text">

                <!--확인 버튼 -->
                <label> 확인 </label>
                <button type="button" @click="event">
             
            </div>
        </form>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>