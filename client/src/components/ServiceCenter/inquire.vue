<template>
    <div>
        <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>내용</th>
                    <th>답변상태</th>
                </tr>
            </thead>
            <tbody>
                <tr  :key="i" v-for="(inquire, i) in inquireList" @click="goToDetail(inquire.inquire_no)">
                    <td>{{ inquire.inquire_no }}</td>
                    <td>{{inquire.inquire_category}}</td>
                    <td>{{ inquire.inquire_title }}</td>
                    <td>{{ getDateFormat(inquire.create_date) }}</td>
                    <td>{{ inquire.inquire_content }}</td>
                    <td>{{ inquire.answer_state }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            inquireList : []
        };
    },
    created(){
        this.getInquireList();
    },
    methods : {
        async getInquireList(){
            this.boardList = (await axios.get('/api/inquire')
                                   .catch(err => console.log(err))).data;
        },
        goToDetail(inquireNo){// 여기 변수는..? value(필드명)
            this.$router.push({path : '/inquireInfo', query : {inquireNo : inquireNo}});//{키:필드명}
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        }
    }
}
</script>
<style scoped>
    table *{
        text-align: center;
    }
</style>
