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
                    <td class="cur">{{ notice.notice_content }}</td>
                    <td>{{ $dateFormat(notice.notice_writedate,'yyyy년 MM월 dd일') }}</td>
                    <td>조이밀♡</td>
                    <td>{{ notice.notice_views }}</td>
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
    
    methods : {
        async getNoticeList(){
            let result = (await axios.get('/api/notice').catch(err => console.log(err)));
            for(let i=0;i<result.data.length;i++){
                if(result.data[i].notice_content.length>10){
                    result.data[i].notice_content = result.data[i].notice_content.substring(0,10)+'...더보기';
                }
            }                                   
            this.noticeList = result.data;
        },
        goToDetail(noticeNo){
            this.$router.push({name : 'noticeInfo', query : {noticeNo : noticeNo}});
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
    th{
    background-color: #FFA726;
}
    .cur{
        cursor: pointer;
    }
</style>
