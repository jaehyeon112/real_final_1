<template>
        <Line v-if="loaded" :data="chartData" style="width: 40%;height: 500px;"/>
</template>
  
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,PointElement,LineElement} from 'chart.js'
import axios from 'axios'
  
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,PointElement,LineElement)

export default {
    name: 'LineChart',
    components: { Line },
    data() {
      return {
        loaded : false,
        week : 0,
        chartData: {
            labels: ['1주전','2주전','3주전','이번주'],
            datasets: [
                {
                label: '주간 매출액',
                pointBackgroundColor: '#64CCA2',
                data: [],
                //maxBarThickness: 100,   //바 넓이 최대크기 지정
                responsive: false,      //이건 크기지정이라는데..여기가 맞는지 몰겠다
                backgroundColor: [ 
                    "rgba(255, 99, 132,0.6)",   //그래프마다 색상지정가능
                    "rgba(54, 162, 235,0.6)",
                    "rgba(255, 206, 86,0.6)",
                ],
                borderColor: '#64CCA2',
                pointBorderColor: '#64CCA2',
                hoverBackgroundColor : '#f87979',    //마우스 올렸을 때 색상
                tension: 0.3,
                }
            ],
        },
        // chartOptions: {
        //     responsive: false,
        //     maintainAspectRatio: false,
        //         maintainAspectRatio: false,
        //         cutoutPercentage: 50,
        //         legend: {
        //             display: true,
        //             position: 'left',
        //             labels: {
        //                 fontSize: 12,
        //                 fontFamily: 'sans-serif',
        //                 fontColor: '#000000',
        //                 fontStyle: 'bold'
        //             }
        //         },
        //         plugins : {
        //             datalabels : {
        //                 display : true
        //             }
        //         },
        // }
    }
},
    created(){
        this.getSum();
    },
    methods : {
        async getSum(){
            for(let i=3;i>=0;i--){
                let result = await axios.get(`/api/weeksum/${i}/${i}`).catch(err=>console.log(err));
                let list = result.data[0];
                if(list.sum==null){
                    list.sum=0;
                }
                this.chartData.datasets[0].data.push(list.sum);
            }
            this.loaded = true;
        }
    }
}
  </script>
