<template>
<list #dataList>
    <thead>
        <tr>
            <th>회원 아이디</th>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>구매금액</th>
            <th>가입일</th>
            <th>이용정지</th>
        </tr>
    </thead>
                    
    <tbody>
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td><button>정지</button></td>
        </tr>
    </tbody>
</list>  
</template>
<script>
import list from '../components/List.vue';
export default {
    components : {
    list
    }
}
</script>