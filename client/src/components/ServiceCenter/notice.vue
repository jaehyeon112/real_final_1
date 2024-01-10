<template>
    <div>
        <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성일</th>
                    <th>작성자</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr  :key="i" v-for="(notice, i) in noticeList" @click="goToDetail(notice.notice_no)">
                    <td>{{ notice.notice_no }}</td>
                    <td >{{ notice.notice_title }}</td>
                    <td>{{ notice.notice_content }}</td>
                    <td>{{ getDateFormat(notice.write_date) }}</td>
                    <td>조이밀♡</td>
                    <td>{{ notice.notice_view }}</td>
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
            noticeList : []
        };
    },
    created(){
        this.getNoticeList();
    },
    watch(){
        
    },
    methods : {
        async getNoticeList(){
            this.inquireList = (await axios.get('/api/notice')
                                   .catch(err => console.log(err))).data;
        },
        goToDetail(noticeNo){
            this.$router.push({path :'/serviceCenter/noticeInfo', query : {noticeNo : noticeNo}});
        },
        getDateFormat(date){
            return this.$dateFormat(date,'yyyy년MM월dd일');
        },
        
             
    }
}
</script>
<style scoped>
    table *{
        text-align: center;
    }
</style>
