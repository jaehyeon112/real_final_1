<template>
    <list #dataList>
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
                <td><button style="border-radius: 10px;" @click="modProd(prod.prod_no)">수정</button>       <button style="border-radius: 10px;" @click="delProd(prod.prod_no)">삭제</button></td>
            </tr>
        </tbody>
    </list>
    </template>
    <script>
    import list from '../components/List.vue';
    import axios from 'axios';
    
    export default {
        data(){
            return{
                productList : []
            }
        },
        components : {
        list
        },
        created(){
            this.prodList();
        },
        methods : {
            async prodList(){
                let list = await axios.get('/api/prod').catch(err=>console.log(err));
                let result = list.data;
                this.productList = result;
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
            }
        }
    }
    </script>