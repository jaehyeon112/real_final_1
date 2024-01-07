<template>
    <list @changeemit="changeChildData" @search="search">
        <template #searchData>
            <div style="width: 25%;">
                <br><v-select
                label="메인 카테고리"
                :items="['한식','중식','양식','일식','분식']"
                v-model = category
                variant="underlined"
                return-object
                style="width: 100%;"
                ></v-select>
                <v-btn @click="searchList(this.category)">검색</v-btn>  <v-btn @click="refresh">초기화</v-btn></div>
        </template>
        <template #filterSearch>
            <div><a @click="this.order='prod_no'">기본순 | </a><a @click="this.order='registration'">최근 등록순 | </a><a @click="this.order='high'">높은 가격순(판매가 기준) | </a><a @click="this.order='discount_price'">낮은 가격순(판매가 기준)</a></div>
            <br><input class="datatable-input" v-model="word" @keyup="searchData" style="border-bottom: 1px black solid;width: 300px;" placeholder="상품명을 검색하세요">
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>상품명</th>
                <th>원가</th>
                <th>판매가</th>
                <th>재고</th>
                <th>메인 카테고리</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr :key="idx" v-for="(prod,idx) in productList">
                <td>{{ prod.prod_name }}</td>
                <td>{{ prod.price }}</td>
                <td>{{ prod.discount_price }}</td>
                <td>{{ prod.stock }}</td>
                <td v-if="prod.main_category=='e1'">한식</td>
                <td v-else-if="prod.main_category=='e2'">중식</td>
                <td v-else-if="prod.main_category=='e3'">양식</td>
                <td v-else-if="prod.main_category=='e4'">일식</td>
                <td v-else-if="prod.main_category=='e5'">분식</td>
                <td><v-btn style="border-radius: 10px;" @click="modProd(prod.prod_no)">수정</v-btn>       <v-btn style="border-radius: 10px;" @click="delProd(prod.prod_no)">삭제</v-btn></td>
            </tr>
        </tbody>
        <tbody v-if="productList.length==0" style="text-align: center;">
            <tr><td></td><td><h3>존재하는 데이터가 없습니다</h3></td></tr>
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
                word : '',
                productList : [],
                nums : 0,
                startNum : 0,
                totalList: "",
                totals :'',
                order : 'prod_no',
                category : '',
                content : '',
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
                let total = await axios.get(`/api/prod`).catch((err) => {
                    console.log(err);
                });
                this.totalList = total.data;
            },
            async prodList(pno){
                if(this.order=='high'){
                    let list = await axios.get(`/api/prod/${this.startNum}/${pno}`).catch(err=>console.log(err));
                    let result = list.data;
                    this.productList = result;
                }else{
                    let list = await axios.get(`/api/prod/${this.word}/${this.category}/${this.order}/${this.startNum}/${pno}`).catch(err=>console.log(err));
                    let result = list.data;
                    this.productList = result;
                }
                this.total();
            },
            async changePage(no) {
                if(this.order=='high'){
                    let list = await axios.get(`/api/prod/${no}/${this.nums}`).catch(err=>console.log(err));
                    let result = list.data;
                    this.productList = result;
                }else{
                    let page = await axios.get(`/api/prod/${this.content}/${this.content}/${this.order}/${no}/${this.nums}`).catch(err=>console.log(err));
                    this.productList = page.data;
                    this.totals = this.nums;
                }
            },
            async modProd(pno){
                this.$router.push({name : 'product',query : {pno : pno}})
            },
            async delProd(pno){
                if(confirm('삭제하시면 품절처리 됩니다\n정말 품절처리 하시겠습니까?')){
                    let result = await axios.patch(`/api/prod/${pno}`).catch(err=>console.log(err));
                    console.log(result.data)
                    if(result.data.affectedRows==1){
                        alert('상품이 품절되었습니다');
                    }else{
                        alert('삭제실패'); 
                    }
                }
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
            },
            search(searchData){
                this.content = searchData;
                this.searchList(this.content);
            },
            async searchList(cont){
                if(cont=='한식'){
                    cont = 'e1';
                    this.word = '';
                }else if(cont=='중식'){
                    cont = 'e2';
                }else if(cont=='양식'){
                    cont = 'e3';
                }else if(cont=='일식'){
                    cont = 'e4';
                }else if(cont=='분식'){
                    cont = 'e5';
                }

                if(cont==''){
                    this.total();
                    this.prodList(this.nums);
                    return;
                }
                
                let list = await axios.get(`/api/prod/${cont}/${cont}/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                let list2 = await axios.get(`/api/prod/${cont}/${cont}/${this.order}//`).catch(err=>console.log(err));
                let result = list.data;
                let result2 = list2.data;
                console.log('리스트 : '+result)
                this.productList = result;
                this.totalList = list2;
            },
            refresh(){
                this.category = '';
                this.word = '';
                this.prodList(this.nums);
            },
            
        },
        watch : {
            nums(){
                this.prodList(this.nums);
            },
            order(){
                this.prodList(this.nums);
            },
            word(){
                this.search(this.word);
                this.category = '';
            },
            content(){
                this.searchList(this.content);
            },
        }
    }
</script>

