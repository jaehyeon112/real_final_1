<template>
    <div class="card">
        <div class="card-header">관리자답변</div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-gruop-item" :key="idx" v-for="(reply, idx) in replyList">
                <div class="container">
                   
                    <div class="row text-start">
                        {{ reply.reply_content }}
                    </div>
                    <div class="row">
                        
                        <div class="col-3 text-center">
                            {{ getDateFormat(reply.reply_date) }}
                        </div>    
                        <div class="col-9 text-center">
                            {{ reply.inquire_no }}
                        </div>
                    </div>
                </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';


export default {
    props: ['ino'], //부모로부터 뭘 받을지 라우터기반 아님
    data(){
        return{
            replyList :[]
        }
    },
    created(){
        this.getReplyList();
    },
    methods: {
        async getReplyList(){
            console.log(this.ino)
            let result = await axios.get(`/api/inquireAnswer/${this.ino}`) //json형태 아니니까 ?로 받자
                                    .catch(err=>console.log(err));
                                    console.log(result)
            this.replyList = result.data;                        
        },
        getDateFormat(date) {
            return this.$dateFormat(date,'yyyy년MM월dd일');
        },
    }
}
</script>