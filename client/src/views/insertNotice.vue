<template>
    <div class="container-fluid" style:width="50px">
      <div class="row">
      <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="container">
            <h4 class="mb-3" style="text-align: center;font-size: 30px;padding: 10px;">공지사항</h4>
              <div class="row g-3">
                <div class="col-sm-6">
                <label for="wirter" class="form-label">작성자</label>
                <input type="text" v-model="writer" class="form-control" id="wirter" readonly>
              </div>
              <div class="col-12">
                <label for="discount_price" class="form-label">제목</label>
                <input type="text" v-model="notice.notice_title" class="form-control" id="price">
              </div>
                <div class="col-12">
                  <label for="stock" class="form-label">내용</label>
                  <textarea type="text" v-model="notice.notice_content" class="form-control" required></textarea>
                </div>
                <div class="col-12">
                  <label for="stock" class="form-label">첨부파일</label>
                  <div :key="i" v-for="i in nums" style="width: 500px;">
                    <upload :numbers=this.nums @info="info" @text="text"/>
                    <v-btn v-show="this.nums==i" @click="this.nums=this.nums+1">+</v-btn><v-btn v-show="this.nums==i&&this.nums!=1" @click="this.nums=this.nums-1">-</v-btn>
                  </div>
                  <div v-for="idx in file">첨부파일 : {{ idx }}<p @click="delMultiple(idx)">삭제</p></div>
                  <div v-show="open==true" v-for="idx in photo"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"><p @click="delPhoto(idx)">삭제</p></div>
                  <v-btn @click="showing" v-show="photo.length>0">사진보기</v-btn>
                </div>
              </div>
              <div class="my-3">
                <div class="form-check">
                    <input v-model="notice.importance" value="l2" type="radio" class="form-check-input" required>
                    <label class="form-check-label">일반</label>
                </div>
                <div class="form-check">
                    <input v-model="notice.importance" value="l1" type="radio" class="form-check-input" required>
                    <label class="form-check-label">중요</label>
                </div>
              </div>
              <div id="buttonBox">
                <v-btn @click="refresh">초기화</v-btn>
                <v-btn @click="saveProd()">저장하기</v-btn>
              </div>
            </div>
            
    </main>
      </div>
    </div>
    </template>
<script>
import axios from 'axios';
import side from '../components/admin/SideBar.vue';
import icon from '../components/admin/icon.vue';
import upload from "@/components/menu/upload.vue";
export default {
    data(){
      return{
        writer : '관리자',
        nums : 1,
        notice : {
            notice_title : '',
            notice_content : '',
            importance : 'l2',
        },
        photo : [],
        file : [],
        open : false,
        ods : ''
      }
    },
    methods : {
        async saveProd(){
            let datam = {
                param : this.notice
            }
            let datas = await axios.post(`/api/notice`,datam).catch(err=>console.log(err));
            let result = datas.data;
            console.log('파일'+this.file.length+'사진'+this.photo.length)
            if(result.affectedRows==1){
                alert('공지사항이 등록되었습니다');
                for(let i=0;i<this.file.length;i++){
                  this.ods = 's'+i
                  let photos = {
                    param : {
                      "file_category" : 'r4',
                      "file_name" : this.file[i],
                      "orders" : this.ods,
                      "notice_no" : result.insertId,
                      "path" : 'uploads\\'+this.file[i]
                    }
                  }
                  let result1 = await axios.post("/api/photo",photos).catch(err=>console.log(err));
                  if(result1.data.affectedRows>0){
                    alert('테이블ㅇㅔ 파일추가');
                  }else{
                    alert('테이블ㅇㅔ 실패');
                  }
                }
                for(let i=0;i<this.photo.length;i++){
                  this.ods = 's'+i
                  let ph = {
                    param : {
                      "file_category" : 'r4',
                      "file_name" : this.photo[i],
                      "orders" : this.ods,
                      "notice_no" : result.insertId,
                      "path" : 'uploads\\'+this.photo[i]
                    }
                  }
                  let result1 = await axios.post("/api/photo",ph).catch(err=>console.log(err));
                  if(result1.data.affectedRows>0){
                    alert('테이블ㅇㅔ 사진추가');
                  }else{
                    alert('테이블ㅇㅔ 실패');
                  }
                }
                this.$router.push({path : "noticeList"})
            }
        },
        info(data){
            for(let i=0;i<data.length;i++){
              this.photo.push(data[i]);
            }
        },
        text(data){
            for(let i=0;i<data.length;i++){
              this.file.push(data[i]);
            }
        },
        showing(){
            if(this.open == true){
              this.open = false;
            }else if(this.open == false){
              this.open = true;
            }
        },
        getPath(name){
            return `/api/fileCall/${name}`;
        },
        delMultiple(name){
            for(let i = 0; i < this.file.length; i++) {
                if(this.file[i] === name)  {
                    this.file.splice(i, 1);
                    i--;
                }
            }
        },
        delPhoto(name){
            for(let i = 0; i < this.photo.length; i++) {
                if(this.photo[i] === name)  {
                    this.photo.splice(i, 1);
                    i--;
                }
            }
        }
    },
    components : {
        side,
        icon,
        upload
        },
}
    </script>
<style scoped>
    .container{
        border: 2px solid;
        border-color: rgb(174, 118, 238);
        width: 1000px;
        padding: 20px;
        margin-top: 100px;
        box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
        font-weight: bold;
    }
    
    button{
        color : rgb(0, 0, 0);
        border-radius: 10px;
        padding: 8px;
        margin: 10px;
        border: none;
    }
    #ima{
        width: 200px;
        height: 200px;
    }
    #buttonBox{
        width: 100%;
        text-align: center;
    }
</style>
