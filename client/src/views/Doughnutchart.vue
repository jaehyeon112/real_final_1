<template>
    <Doughnut v-if="loaded" :data="chartData" style="width: 40%;height: 400px;"/>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement,} from 'chart.js'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend,ArcElement,)

export default {
name: 'BarChart',
components: { Doughnut },
data() {
  return {
    loaded : false,
    chartData: {
        labels: [],
        datasets: [
            {
            label: '최근 3개월 매출액',
            //backgroundColor: '#f87979',
            data: [],
            maxBarThickness: 100,   //바 넓이 최대크기 지정
            responsive: false,      //이건 크기지정이라는데..여기가 맞는지 몰겠다
            backgroundColor: [ 
                "rgba(214, 235, 213, 0.735)",   //그래프마다 색상지정가능
                "rgba(54, 162, 235,0.6)",
                "rgba(255, 206, 86,0.6)",
            ],
            hoverBackgroundColor : '#f87979',    //마우스 올렸을 때 색상
            },
        ],
    },
    chartOptions : {
        maintainAspectRatio: false,
        responsive: true,
    }
  }
},
created(){
    this.getSum();
},
methods : {
    async getSum(){
        let result = await axios.get('/api/outUser/0/0').catch(err=>console.log(err));
        let list = result.data;
        for(let i=0;i<list.length;i++){
            this.chartData.datasets[0].data.push(list[i].nums);
            if(list[i].reason=='w1'){
                list[i].reason = '사고싶은 제품이 없어서'
            }else if(list[i].reason=='w2'){
                list[i].reason = '더 좋은 사이트를 발견해서'
            }else if(list[i].reason=='w3'){
                list[i].reason = '가격이 너무 비싸서'
            }else if(list[i].reason=='w4'){
                list[i].reason = '기타'
            }
            this.chartData.labels.push(list[i].reason);
        }
        this.loaded = true;
    }
}
}
</script>
