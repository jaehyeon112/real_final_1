<template>
    <div>
        <v-card>
            <v-tabs  v-model="tab" fixed-tabs bg-color="#FFB300">
                <v-tab value="save">포인트 적립 내역</v-tab>
                <v-tab value="use">포인트 사용 내역</v-tab>
            </v-tabs>
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="save">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th> 포인트 내용</th>
                                    <th> 포인트 적립</th>
                                    <th> 포인트 생성일</th>
                                    <th> 포인트 만료일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="idx" v-for="(point, idx) in pointSaveList">
                                    <td v-if="point.point_history=='p1'">구매후 적립</td>
                                    <td v-if="point.point_history=='p2'">리뷰적립</td>
                                    <td v-if="point.point_history=='p3'">포인트사용</td>
                                    <td v-if="point.point_history=='p4'">기간만료</td>
                                    
                                    <td>{{ point.point_save }}</td>
                                    <td>{{  $dateFormat(point.point_date,'yyyy년MM월dd일') }}</td>
                                    <td>{{ $dateFormat(point.end_point_date,'yyyy년MM월dd일') }}</td>

                                </tr>
                            </tbody>
                        </table>
                    </v-window-item>

                    <v-window-item value="use">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th> 포인트 내용</th>
                                    <th> 포인트 사용</th>
                                    <th> 포인트 생성일</th>
                                    <th> 포인트 만료일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="idx" v-for="(point, idx) in pointUseList">
                                    <td v-if="point.point_history=='p1'">구매후 적립</td>
                                    <td v-if="point.point_history=='p2'">리뷰적립</td>
                                    <td v-if="point.point_history=='p3'">포인트사용</td>
                                    <td v-if="point.point_history=='p4'">기간만료</td>
                                    <td>-{{ point.point_use }}</td>
                                    <td>{{ $dateFormat(point.point_date,'yyyy년MM월dd일') }}</td>
                                    <td>{{  $dateFormat(point.end_point_date,'yyyy년MM월dd일') }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            tab: null,
            pointSaveList:[],
            pointUseList:[],
           
        }
    },
    created(){
        this.getPointSaveHistory();
        this.getPointUseHistory();
    },
    methods:{
        async getPointSaveHistory(){
            this.pointSaveList = (await axios.get(`/api/myPointSave`)
                                          .catch(err=>console.log(err))).data
        },
        async getPointUseHistory(){
            this.pointUseList = (await axios.get(`/api/myPointUse`)
                                          .catch(err=>console.log(err))).data
        }
    }
}
</script>