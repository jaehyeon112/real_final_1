<template>
    <v-container>
        <h1>주문자정보</h1>
        <hr>
        <ul>
            <li>
                <p>받는분 <span>{{ this.$store.state.user.user_id}}</span></p>
                <p>전화번호 <span>{{ this.$store.state.user.user_tel }}</span></p>
                <p>이메일 <span>{{ this.$store.state.user.user_email }}</span></p>
            </li>
        </ul>
    </v-container>
</template>
<script>
export default {
	name: 'OrderUserInfo',
    data(){
        return {

        }
    },
}
</script>
<style scoped>
ul{
    list-style-type: none;
}
</style>