<template>
    <list>
        <template #title>배송목록</template>
        <template #searchData>
            <div>날짜별 배송목록 : <input v-model="startDate" type="date"> ~ <input v-model="lastDate" type="date">
                <br><br><v-btn @click="orderDate(this.startNum)">검색하기</v-btn>  <v-btn @click="refresh">초기화</v-btn>
            </div>
        </template>
        <template #filterSearch>
            <v-select
            label="배송상태"
            :items="['배송중','배송완료']"
            v-model = orders
            variant="underlined"
            return-object
            style="width: 200px;"
            ></v-select>
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
                <th>배송처리하기</th>
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
                <td v-if="delivery.delivery_status=='d4'"><v-btn @click="changeState(delivery.user_id,delivery.order_no)">배송완료하기</v-btn></td>
                <td v-else-if="delivery.delivery_status=='d5'"><v-btn @click="this.modal=true">택배사 사진</v-btn></td>
            </tr>
        </tbody>
        <tbody v-if="deliveryList.length==0" style="text-align: center;">
            <tr><td></td><td></td><td><h3>존재하는 데이터가 없습니다</h3></td></tr>
        </tbody>
        <v-container>
          <page ref="pagination1" @changePage="changePage" :list="totalList" :totals="10"></page>
        </v-container>
        <div class="modal-wrap" v-show="modal">
      <div class="modal-container">
        <div class="modalPop">
            <img :src="getPath()" style="height:100%;width: 100%;">
        </div>
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modal = false">닫기</v-btn>
        </div>
      </div>
    </div>
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
                startDate : '2000-01-01',
                lastDate : this.dateFormat('','yyyy-MM-dd'),
                startNum : 0,
                totalList: "",
                totals :'',
                orders : '',
                modal : false,
                pointNo : 1,
                points : 0
            }
        },
        components : {
        list,
        page
        },
        created(){
            window.scrollTo(0, 0);
            this.delList(this.startNum);
            this.total();
        },
        methods : {
            async total() {
                let total = await axios.get(`/api/delivery`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async delList(no){
                let list = await axios.get(`/api/delivery/${no}`).catch(err=>console.log(err));
                let result = list.data;
                this.deliveryList = result;
                this.total();
            },
            async changePage(no,) {
                if(this.startDate==''&&this.lastDate==''&&this.orders==''){
                    this.delList(no)
                }else if(this.startDate!=''&&this.lastDate!=''&&this.orders==''){
                    this.orderDate(no);
                }else if(this.startDate==''&&this.lastDate==''&&this.orders!=''){
                    this.orderState(this.orders,no);
                }
            },
            dateFormat(value,format){
            let date = value == '' ? new Date() : new Date(value);
            let year = date.getFullYear();
            let month = ('0'+(date.getMonth()+1)).slice(-2);
            let day = ('0'+date.getDate()).slice(-2);
            let result = format.replace('yyyy',year).replace('MM',month).replace('dd',day);
            return result;
            },
            async orderDate(no){
                this.orders = ''
                if(this.startDate>this.lastDate){
                    alert('날짜를 다시 확인해주세요');
                    this.startDate = '2000-01-01';
                    this.lastDate = this.dateFormat('','yyyy-MM-dd');
                }else if(this.startDate==''||this.lastDate==''){
                    alert('날짜가 비어있습니다.')
                }else{
                    let total = await axios.get(`/api/deliverys/${this.startDate}/${this.lastDate}`).catch((err) => {console.log(err);});
                    let list = await axios.get(`/api/deliverys/${this.startDate}/${this.lastDate}/${no}`).catch((err) => {console.log(err);});
                    
                    this.totalList = total.data;
                    this.deliveryList = list.data;
                    if(this.totalList.length==0||this.deliveryList.length==0){
                        alert('존재하는 데이터가 없습니다!');
                        this.startDate = '2000-01-01',
                        this.lastDate = this.dateFormat('','yyyy-MM-dd'),
                        this.delList(no);
                    }else{
                        this.totalList = total.data;
                        this.deliveryList = list.data;
                        this.$refs.pagination1.currentPage2(no);
                    }
                }
            },
            async orderState(od,no){
                if(od=='배송중'){
                    od='d4'
                }else if(od=='배송완료'){
                    od='d5'
                }
                let total = await axios.get(`/api/deliveryf/${od}`).catch(err=>console.log(err));
                let result = await axios.get(`/api/deliveryf/${od}/${no}`).catch(err=>console.log(err));

                this.totalList = total.data;
                this.deliveryList = result.data;
                if(this.totalList.length==0||this.deliveryList.length==0){
                    alert('존재하는 데이터가 없습니다!');
                    this.orders = '';
                    this.delList(no);
                }else{
                    this.totalList = total.data;
                    this.deliveryList = result.data;
                    this.$refs.pagination1.currentPage2(no);
                }
            },
            refresh(){
                this.delList(this.startNum);
                this.startDate = '2000-01-01';
                this.lastDate = this.dateFormat('','yyyy-MM-dd');
                this.orders = '';
            },
            async changeState(uid,ono){
                let grade = await axios.get(`/api/userInfo/${uid}`).catch(err=>console.log(err));
                const uGrade = grade.data[0].user_grade;
                if(uGrade=='i1'){
                    this.pointNo = 1;
                }else if(uGrade=='i2'){
                    this.pointNo = 3;
                }else if(uGrade=='i3'){
                    this.pointNo = 5;
                }
                let point = await axios.post(`/api/delivery/${ono}/${uid}/${ono}/${this.pointNo}`).catch(err=>console.log(err));
                let result = await axios.put(`/api/delivery/${ono}`).catch(err=>console.log(err));
                let save = await axios.get(`/api/getPoint/${ono}`).catch(err=>console.log(err));
                console.log(save.data[0])
                this.points = save.data[0].point_save;
                if(result.data.affectedRows>0&&point.data.affectedRows>0){
                    let mod = await axios.put(`/api/deliveryPoint/${this.points}`).catch(err=>console.log(err));
                    if(mod.data.affectedRows>0){
                        alert('배송이 완료되었습니다!');
                        this.delList(this.startNum);
                    }else{
                        alert('오류가 났습니다.\n다시 시도해주세요.');
                    }
                }else{
                    alert('오류가 났습니다.\n다시 시도해주세요.');
                }
            },
            getPath(){
              return `/api/fileCall/delivery.png`;
            }
        },
        watch : {
            orders(){
                if(this.orders==''){
                    return;
                }
                this.startDate = '2000-01-01';
                this.lastDate = this.dateFormat('','yyyy-MM-dd');
                this.orderState(this.orders,this.startNum);
            }
    }
        
    }
</script>
<style scoped>
.modal-wrap {
    z-index: 100;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .modal-container {
    z-index: 1000;
    position :relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 900px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  .modalPop{
    z-index: 1000;
    border: 1px solid;
    text-align: center;
    height: 800px;
  }
  .modal-btn button{
    z-index: 1000;
    left: 43%;
  }
</style>
