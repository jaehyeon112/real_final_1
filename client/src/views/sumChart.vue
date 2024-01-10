<template>
    <div class="container-fluid">
    <div class="row">
        <side/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <br><br>
            <h1 style="text-align: center;">==매출통계==</h1>
            <v-card class="chars">
            <div class="chart" style="width: 550px;float: left;">
                <h3>월간 매출액</h3>
                <Barchart style="width: 100%;height: 350px;"/>
            </div>

            <div class="chart" style="width: 550px;float: right;">
                <h3>주간 매출액</h3>
                <LineChart style="width: 100%;height: 350px;"/>
            </div>
            </v-card>
            <br><br><br><hr>
            <h1 style="text-align: center;">==회원통계==</h1>
            <v-card class="chars1">
            <div class="chart" style="width: 550px;height:500px;float: left;">
                <h3>탈퇴사유</h3>
                <Doughnutchart style="width: 100%;height: 350px;"/>
            </div>
            <v-table class="table" style="width: 400px;">
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
            </v-table>
            </v-card>
        </main>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import Barchart from './Barchart.vue';
import LineChart from './LineChart.vue';
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
        LineChart,
        Barchart,
        side,
        Doughnutchart
    },
    created(){
        window.scrollTo(0, 0);
        this.userSum();
    },
    methods : {
        async userSum(){
            let result = await axios.get("/api/withMe/0/0").catch(err=>console.log(err));
            this.today = result.data[0];
            let result1 = await axios.get("/api/withMe/1/1").catch(err=>console.log(err));
            this.yesterday = result1.data[0];
        },
    }
}
</script>
<style scoped>
.table{
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
  width: 1200px;
  height: 400px;
}
.chars1{
  top: 50px;
  margin: auto;
  width: 1200px;
  height: 600px;
}
</style>