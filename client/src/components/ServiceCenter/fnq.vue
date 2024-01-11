<template>
    <div>
        <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>내용</th>   
                </tr>
            </thead>
            <tbody>
                <tr  :key="i" v-for="(fnq, i) in fnqList" @click="goToDetail(fnq.qno)">
                    <td>{{ fnq.q_category }}</td>
                    <td >{{ fnq.q_title }}</td>
                    <td>{{ fnq.q_content }}</td>
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
            fnqList : []
        };
    },
    created(){
        this.getFnqList();
    },
    watch(){
        
    },
    methods : {
        async getFnqList(){
            this.fnqList = (await axios.get(`/api/fnq`)
                                   .catch(err => console.log(err))).data;       
        },
        goToDetail(fnqNo){
            this.$router.push({path :'qnaInfo', query : {fnqNo : fnqNo}});
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

  
