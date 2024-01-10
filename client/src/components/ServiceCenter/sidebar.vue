<template>

    <div id="side-bar" class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 200px;">
        <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span class="fs-4">My Page</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <router-link to ="/ServiceCenter/qnaList" class="nav-link " aria-current="page">
             
              자주하는질문
            </router-link>
          </li>
          <li>
            <router-link to="/myPage/myInquire" class="nav-link text-white">
             
              1:1문의
            </router-link>
          </li>
          <li>
            <router-link to="/ServiceCenter/noticeList" class="nav-link  text-white">
             
              공지사항
            </router-link>
          </li>
        </ul>
        <hr>
    </div>
    
    </template>
    <script>
    
    export default{
        name:'side-bar',
        data(){
            return{}
        },
        methods:{
            //resize:function(){
                //함수 생각해보자
            //}
        },
        created(){
            //this.resize()
        }
    }
    </script>
    <style scoped>
        #side-bar{
            position: sticky;
            top: 10;
        }
    </style>