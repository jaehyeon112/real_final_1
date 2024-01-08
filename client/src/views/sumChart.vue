<template>
    <div class="container-fluid">
    <div class="row">
        <side/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h1>매출통계</h1>
            <div class="col-sm-4" style="width: 500px;">
                <Barchart style="width: 40%;height: 40%;float: left;"/>
                <LineChart style="width: 40%;height: 40%;float: right;"/>
            </div>
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
    }
}
</script>