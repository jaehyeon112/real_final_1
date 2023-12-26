<template>
    <list #dataList>
        <thead>
            <tr>
                <th>상품번호</th>
                <th>상품명</th>
                <th>가격</th>
                <th>할인 가격</th>
                <th>재고</th>
                <th>메인 카테고리</th>
            </tr>
        </thead>
                        
        <tbody>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td><button>삭제</button></td>
            </tr>
        </tbody>
    </list>
    <v-row :style="{marginTop: '50px'}">
    <v-col cols="12" md="2" />
    <v-col cols="12" md="2">
        <v-select
              :items="searchoption"
              v-model="searchoptionselected"
              :style="{width:'90px', marginLeft:'90px'}" />
    </v-col>
    <v-col cols="12" md="4">
        <v-text-field v-model="searchkeyword" dense outlined label="검색키워드" 
        full-width :style="{marginTop:'10px'}"/>
    </v-col>
    <v-col cols="12" md="1">
        <v-btn @click="searchstart" :style="{marginTop:'10px'}">검색</v-btn>
    </v-col>
    <v-col cols="12" md="3" />
</v-row>
<v-row v-if="searchfinish===true" :style="{marginTop:'0px'}">
    <v-col cols="12" md="5"/>
    <v-col cols="12" md="2">
        <div style="font-size: x-large">검색결과 : {{searchcnt}} 개</div>
    </v-col>
    <v-col cols="12" md="5"/>
</v-row>
    </template>
    <script>
    import list from '../components/List.vue';
    export default {
        components : {
        list
        }
    }
    </script>