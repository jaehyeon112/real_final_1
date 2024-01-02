<template>
    <list @changeemit="changeChildData">
        <template #searchData>
            <div>
            <v-select
            label="취소상태"
            :items="['취소신청','취소/환불 진행중','완료']"
            v-model = orders
            variant="underlined"
            return-object
            ></v-select>
            <v-btn @click="refresh">초기화</v-btn></div>
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>주문번호</th>
                <th>주문회원</th>
                <th>쿠폰번호</th>
                <th>환급예정포인트</th>
                <th>취소요청일</th>
                <th>취소완료일</th>
                <th>취소상태</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="order in orderList">
            <td>{{ order.order_no }}</td>
            <td>{{ order.user_id }}</td>
            <td v-if="order.coupon_no==null">사용한 쿠폰이 없습니다</td>
            <td v-else>{{ order.coupon_no }}</td>
            <td>{{ order.return_point }}</td>
            <td>{{ $dateFormat(order.cancel_request,'yyyy년 MM월 dd일') }}</td>
            <td v-if="order.cancel_date==null">취소가 완료되지 않았습니다</td>
            <td v-else>{{ $dateFormat(order.cancel_date,'yyyy년 MM월 dd일') }}</td>
            <td v-if="order.cancel_status=='o1'">취소신청</td>
            <td v-else-if="order.cancel_status=='o2'">취소/환불 처리중</td>
            <td v-else-if="order.cancel_status=='o3'">완료</td>
            <td v-if="order.cancel_status=='o1'"><v-btn type="button" @click="changeStatus(order.order_no)">취소/환불처리</v-btn></td>
            <td v-else><v-btn type="button" @click="modalCheck=true">상세보기</v-btn></td>
        </tr>
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
                reason : '',
                reasons : '',
                modalCheck: false,
                orders : '',
                orderStatus : '',
                orderList : [],
                nums : 0,
                startNum : 0,
                totalList: "",
                totals :'',
                orderNo : ''
            }
        },
        components : {
        list,
        page
        },
        created(){
            this.total();
        },
        methods : {
            async total() {
                let total = await axios.get(`/api/refund`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async getOrderList(){
                let result = await axios.get(`/api/refund/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                this.orderList = result.data;
            },
            async changePage(no) {
                let list = await axios.get(`/api/refund/${no}/${this.nums}`).catch(err=>console.log(err));
                let result = list.data;
                this.orderList = result;
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
                this.totals = childData;
            },
            refresh(){
                this.getOrderList();
                this.orders = ''
            },
            async changeStatus(ono){
                if(confirm('취소/환불을 진행할까요?')){
                    let result = await axios.put(`/api/refund/o2/${ono}`).catch(err=>console.log(err));
                    if(result.data.affectedRows==1){
                        alert(' 취소/환불이 진행 중입니다~ ');
                        this.getOrderList();
                    }else{
                        alert('오류가 남');
                    }
                }else{
                    alert('취소되었습니다')
                }
            },
            // async orderState(od){
            //     if(od=='주문완료'){
            //         od='c1'
            //     }else if(od=='상품준비중'){
            //         od='c2'
            //     }else if(od=='출고완료'){
            //         od='c3'
            //     }else if(od=='취소된 주문'){
            //         od='c4'
            //     }
            //     let result = await axios.get(`/api/order/${od}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
            //     console.log(result)
            //     this.orderList = result.data;
            // }
        },
        watch : {
            nums(){
                this.getOrderList();
            },
            content(){
                this.searchList(this.content);
            },
            // orders(){
            //     this.orderState(this.orders);
            // }
    }
        
    }
    </script>