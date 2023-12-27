<template>
    <div style="width: 400px;height: 400px;"><canvas id="myChart"></canvas></div>
</template>
<script>
import Chart from 'chart.js/auto';
    export default{
        mounted(){
            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels : ['10월','11월','12월'],
                datasets: [{
                    label : '3개월 매출액',
                    data: [100000,1250000,142500],
                    // backgroundColor: [
                    //     'rgb(255, 99, 132)',
                    //     'rgb(54, 162, 235)',
                    //     'rgb(255, 205, 86)'
                    // ],
                    //hoverOffset: 3
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1    //선을 부드럽게
                }]
            }
            })
            myChart;
        }
    }
</script>