
<template>
    <div class="container-fluid">
    <div class="row">
        <side/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <br><br>
            <v-table class="table">
                <thead>
                    <tr>
                        <th @click="goto">현황</th>
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
            </v-table>
            <v-card class="chars">
                <h1>탈퇴사유</h1>
            <div class="chart" style="width: 550px;float: left;">
                <Doughnutchart style="width: 100%;height: 500px;"/>
            </div>
            </v-card>
        </main>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import side from '../components/admin/SideBar.vue';
import Doughnutchart from './Doughnutchart.vue'
export default{
    data(){
        return{
            today : '',
            yesterday : ''
        }
    },
    components : {
        side,
        Doughnutchart
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
        },
        goto(){
            this.$router.push({path : "Doughnutchart"})
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
.chart{
  position: relative;
  margin: auto;
  text-align: center;
}
.chars{
  top: 50px;
  margin: auto;
  width: 500px;
  height: 600px;
}
</style>