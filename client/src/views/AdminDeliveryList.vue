<template>
    <list @changeemit="changeChildData">
        <template #searchData>
            <div>날짜별 배송목록 : <input v-model="startDate" type="date"> ~ <input v-model="lastDate" type="date">
             <v-btn @click="orderDate">검색하기</v-btn>  <v-btn @click="refresh">초기화</v-btn>
             <v-select
            label="배송상태"
            :items="['배송중','배송완료']"
            v-model = orders
            variant="underlined"
            return-object
            ></v-select></div>
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>운송장번호</th>
                <th>주문번호</th>
                <th>회원아이디</th>
                <th>요청사항</th>
                <th>출고날짜</th>
                <th>배송상태</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="idx" v-for="(delivery,idx) in deliveryList">
                <td>{{ delivery.tracking_no }}</td>
                <td>{{ delivery.order_no }}</td>
                <td>{{ delivery.user_id }}</td>
                <td v-if="delivery.delivery_request==''">요청사항이 없습니다.</td>
                <td v-else>{{ delivery.delivery_request }}</td>
                <td>{{ $dateFormat(delivery.released_date,'yyyy년 MM월 dd일') }}</td>
                <td v-if="delivery.delivery_status=='d4'">배송중</td>
                <td v-else-if="delivery.delivery_status=='d5'">배송완료</td>
            </tr>
        </tbody>
        <tbody v-if="deliveryList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 데이터가 없습니다</h3></td></tr>
        </tbody>
        <v-container>
          <page @changePage="changePage" :list="totalList" :totals="this.nums"></page>
        </v-container>
        </template>
    </list>
    </template>
    <script>
    import list from '../components/admin/List.vue';
    import axios from 'axios';
    import page from '../components/common/Pagination.vue';
    
    export default {
        data(){
            return{
                deliveryList : [],
                nums : 0,
                startDate : '2000-01-01',
                lastDate : this.dateFormat('','yyyy-MM-dd'),
                startNum : 0,
                totalList: "",
                totals :'',
                orders : ''
            }
        },
        components : {
        list,
        page
        },
        created(){
            //this.prodList();
            this.total();
        },
        methods : {
            async total() {
                let total = await axios.get(`/api/delivery`).catch((err) => {
                    console.log(err);
                });

                this.totalList = total.data;
            },
            async delList(pno){
                let list = await axios.get(`/api/delivery/${this.startNum}/${pno}`).catch(err=>console.log(err));
                let result = list.data;
                this.deliveryList = result;
            },
            async changePage(no) {
                let list = await axios.get(`/api/delivery/${no}/${this.nums}`).catch(err=>console.log(err));
                let result = list.data;
                this.deliveryList = result;
            },
            dateFormat(value,format){
            let date = value == '' ? new Date() : new Date(value);
            let year = date.getFullYear();
            let month = ('0'+(date.getMonth()+1)).slice(-2);
            let day = ('0'+date.getDate()).slice(-2);
            let result = format.replace('yyyy',year).replace('MM',month).replace('dd',day);
            return result;
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
                this.totals = childData;
            },
            async orderDate(){
                let total = await axios.get(`/api/delivery/${this.startDate}/${this.lastDate}/${this.startNum}/${this.nums}`).catch((err) => {console.log(err);});
                console.log(total.data)
                this.deliveryList = total.data;
            },
            async orderState(od){
                if(od=='배송중'){
                    od='d4'
                }else if(od=='배송완료'){
                    od='d5'
                }
                let result = await axios.get(`/api/delivery/${od}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                console.log(result)
                this.deliveryList = result.data;
            },
            refresh(){
                this.delList(this.nums);
                this.startDate = '2000-01-01';
                this.lastDate = this.dateFormat('','yyyy-MM-dd');
                this.orders = '';
            }
        },
        watch : {
            nums(){
                this.delList(this.nums);
            },
            orders(){
                this.orderState(this.orders);
            }
    }
        
    }
    </script>
