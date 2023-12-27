<template>
    <list @changeemit="changeChildData">
        <template #dataList>
        <thead>
            <tr>
                <th>상품번호</th>
                <th>상품명</th>
                <th>판매 가격</th>
                <th>재고</th>
                <th>메인 카테고리</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="idx" v-for="(prod,idx) in productList">
                <td>{{ prod.prod_no }}</td>
                <td>{{ prod.prod_name }}</td>
                <td v-if="prod.discount_rate==0">{{ prod.price }}</td>
                <td v-else>{{ prod.discount_price }}</td>
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
                let total = await axios.get("/api/prod").catch((err) => {
                    console.log(err);
                });

                console.log("Total");
                this.totalList = total.data;
                console.log(this.totalList);
            },
            async prodList(pno){
                let list = await axios.get(`/api/prod/${this.startNum}/${pno}`).catch(err=>console.log(err));
                let result = list.data;
                this.productList = result;
            },
            async changePage(no) {
                try {
                    let page = await axios.get(`/api/prod/${no}/${this.nums}`);
                    this.productList = page.data;
                    this.totals = this.nums;
                    console.log('페이지'+page.data);
                } catch (error) {
                    console.error("Error fetching page data:", error);
                }
            },
            async modProd(pno){
                this.$router.push({name : 'product',query : {pno : pno}})
            },
            async delProd(pno){
                let result = await axios.patch(`/api/prod/${pno}`).catch(err=>console.log(err));
                console.log(result.data)
                if(result.data.affectedRows==1){
                    alert('삭제하시면 품절처리 됩니다');
                }else{
                    alert('삭제실패'); 
                }
            },
            changeChildData(childData){
                console.log('받음'+childData);
                this.nums = childData;
                this.totals = childData;
            }
        },
        watch : {
            nums(){
                this.prodList(this.nums);
            }
    }
        
    }
    </script>