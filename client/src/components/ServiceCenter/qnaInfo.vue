<template>
    <div>
    <br>
        <br>
        <br>
        <br>
        <br>
    <div class="container">
        <div class="row">
            <table class="table table-bordered">
                <thead>
                    <tr>
            
                        <th scope="col" class="text-center table-warning">카테고리</th>
                        <td scope="col" class="text-center">{{ fnqInfo.q_category }}</td>
                        <th scope="col" class="text-center table-primary">제목</th>
                        <td scope="col">{{ fnqInfo.q_title }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" class="text-left" valign="top" height="200">
                            <pre
                                style="white-space: pre-wrap;border:none;background-color: white;">{{ fnqInfo.q_content }}</pre>
                        </td>
                    </tr>
                  
                </tbody>
            </table>
        </div>
    <!-- <div class="row">
        해당 게시글의 댓글이 있다면
            <replyList v-if="noticeInfo.length " v-bind:ino ="inquireInfo.inquire_no" />

        해당 게시글의 댓글이 존재하지 않는다면
             <div v-else class="card text-center">
                댓글이 존재하지 않습니다
             </div>  
    </div> -->   
    </div>
    </div>
</template>
<script>
import axios from 'axios';
//import replyList from'@/components/common/replyList.vue'; //자식 컴포넌트라 임포트 
//댓글이 있을때만 axios를 불러와라 그게 효율적
export default {
    data() {
        return {
            searchNo: '',
            fnqInfo: {}
        };
    },
    // components : {
    //     replyList
    // },
    created() { 
        this.searchNo = this.$route.query.fnqNo;
        this.getQnoInfo();
    },
    methods: {
        async getQnoInfo() {
           let result = await axios.get(`/api/fnq/${this.searchNo}`) //sql.js 단건조회 경로 그대로 가져오기 api붙여주는 이유 proxy와 관련
                                    .catch(err=>{
                                        console.log(err)
                                    })      
            this.fnqInfo =result.data[0];                
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
</style>