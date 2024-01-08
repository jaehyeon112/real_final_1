<template>
    <div class="container-fluid">
    <div class="row">
        <side/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <br><br>
            <h1>매출통계</h1>
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
            
        </main>
    </div>
    </div>
</template>
<script>
import Barchart from './Barchart.vue';
import LineChart from './LineChart.vue';
import side from '../components/admin/SideBar.vue';
export default{
    components : {
        LineChart,
        Barchart,
        side
    },
}
</script>
<style scoped>
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
</style>