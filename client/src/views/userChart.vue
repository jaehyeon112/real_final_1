
<template>
    <div class="container-fluid">
    <div class="row">
        <side/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <table class="table">
                <thead>
                    <tr>
                        <th>현황</th>
                        <th>가입회원수</th>
                        <th>탈퇴회원수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>오늘</td>
                        <td>{{ today.ours }}명</td>
                        <td>{{ today.yours }}명</td>
                    </tr>
                    <tr>
                        <td>어제</td>
                        <td>{{yesterday.ours}}명</td>
                        <td>{{yesterday.yours}}명</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import side from '../components/admin/SideBar.vue';
export default{
    data(){
        return{
            today : '',
            yesterday : ''
        }
    },
    components : {
        side
    },
    created(){
        this.userSum();
    },
    methods : {
        async userSum(){
            let result = await axios.get("/api/withMe/0/0").catch(err=>console.log(err));
            this.today = result.data[0];
            let result1 = await axios.get("/api/withMe/1/1").catch(err=>console.log(err));
            this.yesterday = result1.data[0];
        }
    }
}
</script>
<style scoped>
.table{
    width: 300px;
    border: 1px solid;
    text-align: center;
}
</style>