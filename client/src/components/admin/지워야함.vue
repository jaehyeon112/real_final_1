<template>
    <div style="width: 400px;height: 400px;"><canvas v-if="loaded" id="myChart"></canvas></div>
</template>
<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
    export default{
        data(){
            return{
                //months : this.dateFormat('','MM월'),
                loaded: false,
            }
        },
        created(){
            this.getSum();
        },
        mounted(){
            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels : [],
                datasets: [{
                    label : '3개월 매출액',
                    data: [],
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
        },
        methods : {
            // dateFormat(value, format) {
            //     let date = value == "" ? new Date() : new Date(value);
            //     let onemonth = date.getMonth()
            //     if(onemonth==0){
            //         onemonth=12
            //     }
            //     let twomonth = date.getMonth()-1
            //     if(twomonth==-1){
            //         twomonth=11
            //     }
            //     let month = ("0" + (date.getMonth() + 1)).slice(-2);
            //     let ago = ("0" + onemonth).slice(-2);
            //     let twoago = ("0" + twomonth).slice(-2);
            //     let result = [format.replace("MM", twoago),format.replace("MM", ago),format.replace("MM", month)]
            //     return result;
            // },
            async getSum(){
                let result = await axios.get('/api/sum').catch(err=>console.log(err));
                let list = result.data;
                for(let i=0;i<list.length;i++){
                    this.myChart.data.labels.push(list[i].month);
                    this.myChart.data.datasets[0].data.push(list[i].sum);
                }
            }
        }
    }
</script>