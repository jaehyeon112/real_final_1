<template>
    <div class="side_bar">
    <ul>
        <li>1:1문의</li>
        <li>자주하는문의</li>
        <li>공지사항   </li>
    </ul>
</div>
</template>
<script>
export default{
    name:'side_bar',
    data(){
        return{}
    },
    methods:{
        resize:function(){
            //함수 생각해보자
        }
    },
    created(){
        this.resize()
    }
}
</script>