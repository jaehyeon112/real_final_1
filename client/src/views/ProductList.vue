<template>
    <list @changeemit="changeChildData" @search="search">
        <template #filterSearch>
            <div><a @click="this.order='prod_no'">기본순 | </a><a @click="this.order='registration'">최근 등록순 | </a><a @click="this.order='high'">높은 가격순(판매가 기준) | </a><a @click="this.order='discount_price'">낮은 가격순(판매가 기준)</a></div>
        </template>
        <template #dataList>
        <thead>
            <tr>
                <th>상품번호</th>
                <th>상품명</th>
                <th>원가</th>
                <th>판매가</th>
                <th>재고</th>
                <th>메인 카테고리</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="idx" v-for="(prod,idx) in productList">
                <td>{{ prod.prod_no }}</td>
                <td>{{ prod.prod_name }}</td>
                <td>{{ prod.price }}</td>
                <td>{{ prod.discount_price }}</td>
                <td>{{ prod.stock }}</td>
                <td>{{ prod.main_category }}</td>
                <td><v-btn style="border-radius: 10px;" @click="modProd(prod.prod_no)">수정</v-btn>       <v-btn style="border-radius: 10px;" @click="delProd(prod.prod_no)">삭제</v-btn></td>
                
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
                productList : [],
                nums : 0,
                startNum : 0,
                totalList: "",
                totals :'',
                content:'',
                order : 'prod_no',
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
                let total = await axios.get(`/api/prod/${this.order}`).catch((err) => {
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
                    let list = await axios.get(`/api/prod/${this.order}/${this.startNum}/${pno}`).catch(err=>console.log(err));
                    let result = list.data;
                    this.productList = result;
                }
            },
            async changePage(no) {
                if(this.order=='high'){
                    let list = await axios.get(`/api/prod/${no}/${this.nums}`).catch(err=>console.log(err));
                    let result = list.data;
                    this.productList = result;
                }else{
                    let page = await axios.get(`/api/prod/${this.order}/${no}/${this.nums}`).catch(err=>console.log(err));
                    this.productList = page.data;
                    this.totals = this.nums;
                    console.log('페이지'+page.data);
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
                this.totals = childData;
            },
            search(searchData){
                    this.content = searchData;
                    this.searchList(this.content);
            },
            async searchList(cont){
                let list = await axios.get(`/api/prod/${cont}/${this.order}/${this.startNum}/${this.nums}`).catch(err=>console.log(err));
                let result = list.data;
                console.log('리스트 : '+result)
                this.productList = result;
            }
        },
        watch : {
            nums(){
                this.prodList(this.nums);
            },
            content(){
                this.searchList(this.content);
            },
            order(){
            this.prodList(this.nums);
            }
    }
        
    }
    </script>