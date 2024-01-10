<template>
    <v-container>
        <h1>주문자정보</h1>
        <hr>
                <p class="label">받는분 </p>
                    <span>{{ this.$store.state.user.user_id}}</span>
        <br>
                <p class="label">전화번호</p>
                    <span>{{ this.$store.state.user.user_tel }}</span>
        <br>
                    <p class="label">이메일</p>
                    <span>{{ this.$store.state.user.user_email }}</span>
    </v-container>
</template>
<script>
export default {
	name: 'CartUserInfo',
    data(){
        return {

        }
    },
}
</script>
<style scoped>
.label {
    display: inline-block;
    width: 15%;
    padding-left: 20px;
    font-size: large;
    font-weight: bold;
}
ul {
  display: flex;
  list-style: none;
}
</style>