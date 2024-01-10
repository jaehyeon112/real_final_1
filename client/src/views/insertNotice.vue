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
              <div v-if="this.no>0" class="col-sm-6">
                <label for="wirter" class="form-label">작성일자</label>
                <input type="text" v-model="notice.notice_writedate" class="form-control" id="notice_writedate" readonly>
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
                  <div v-for="idx in file">기존첨부파일 : {{ idx }}<p @click="RealRemove(idx)">삭제</p></div>
                  <div v-for="idx in newfile">첨부파일 : {{ idx }}<p @click="delMultiple(idx)">삭제</p></div>
                  <div v-show="open==true" v-for="idx in photo"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"><p @click="RealRemove(idx)">삭제</p></div>
                  <div v-show="open==true" v-for="idx in newphoto"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"><p @click="delPhoto(idx)">삭제</p></div>
                  <v-btn @click="showing" v-show="this.newphoto.length>0||this.photo.length>0">사진보기</v-btn>
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
            importance : 'i2',
            notice_writedate : this.dateFormat('','yyyy년 MM월 dd일')
        },
        photo : [],
        newphoto : [],
        file : [],
        newfile : [],
        open : false,
        ods : '',
        no : this.$route.query.no //받아온 공지사항 번호
      }
    },
    methods : {
        async saveProd(){
            if(this.no>0){
              this.modNotice();
            }else{
              this.insertNotice();
            }
        },
        goto(){
          this.$router.push({path : "noticeList"});
        },
        async insertNotice(){
          let datam = {
                param : this.notice
            }
            let datas = await axios.post(`/api/notice`,datam).catch(err=>console.log(err));
            let result = datas.data;
            console.log('파일'+this.file.length+'사진'+this.photo.length)
            if(result.affectedRows==1){
                alert('공지사항이 등록되었습니다');
                for(let i=0;i<this.newfile.length;i++){
                  this.ods = 's'+i
                  let photos = {
                    param : {
                      "file_category" : 'r4',
                      "file_name" : this.newfile[i],
                      "orders" : this.ods,
                      "notice_no" : result.insertId,
                      "path" : 'uploads\\'+this.newfile[i],
                      "types" : 'text'
                    }
                  }
                  let result1 = await axios.post("/api/photo",photos).catch(err=>console.log(err));
                  if(result1.data.affectedRows>0){
                    alert('테이블ㅇㅔ 파일추가');
                  }else{
                    alert('테이블ㅇㅔ 실패');
                  }
                }
                for(let i=0;i<this.newphoto.length;i++){
                  this.ods = 's'+i
                  let ph = {
                    param : {
                      "file_category" : 'r4',
                      "file_name" : this.newphoto[i],
                      "orders" : this.ods,
                      "notice_no" : result.insertId,
                      "path" : 'uploads\\'+this.newphoto[i],
                      "types" : 'photo'
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
        async modNotice(){
          let datam = {
                param : {
                  notice_title : this.notice.notice_title,
                  notice_content : this.notice.notice_content,
                  importance : this.notice.importance,
                }
          }
          let list = await axios.put(`/api/onenotice/${this.no}`,datam).catch(err=>console.log(err));
          if(list.data.affectedRows==1){
            alert('수정완료');
            for(let i=0;i<this.newfile.length;i++){
                  this.ods = 's'+i
                  let photos = {
                    param : {
                      "file_category" : 'r4',
                      "file_name" : this.newfile[i],
                      "orders" : this.ods,
                      "notice_no" : this.no,
                      "path" : 'uploads\\'+this.newfile[i],
                      "types" : 'text'
                    }
                  }
                  let result1 = await axios.post("/api/photo",photos).catch(err=>console.log(err));
                  if(result1.data.affectedRows>0){
                    alert('테이블ㅇㅔ 파일추가');
                  }else{
                    alert('테이블ㅇㅔ 실패');
                  }
                }
                for(let i=0;i<this.newphoto.length;i++){
                  this.ods = 's'+i
                  let ph = {
                    param : {
                      "file_category" : 'r4',
                      "file_name" : this.newphoto[i],
                      "orders" : this.ods,
                      "notice_no" : this.no,
                      "path" : 'uploads\\'+this.newphoto[i],
                      "types" : 'photo'
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
          }else{
            alert('실패')
          }
        },
        async getNotice(no){
          let list = await axios.get(`/api/onenotice/${no}`).catch(err=>console.log(err));
          list.data[0].notice_writedate = this.dateFormat(list.data[0].notice_writedate,'yyyy년 MM월 dd일');
          console.log(list.data[0].notice_content.length)
          this.notice = list.data[0];
        },
        dateFormat(value, format) {
          let date = value == "" ? new Date() : new Date(value);
          let year = date.getFullYear();
          let month = ("0" + (date.getMonth() + 1)).slice(-2);
          let day = ("0" + date.getDate()).slice(-2);

          let result = format
            .replace("yyyy", year)
            .replace("MM", month)
            .replace("dd", day);
          return result;
        },
        info(data){
            for(let i=0;i<data.length;i++){
              this.newphoto.push(data[i]);
            }
        },
        text(data){
            for(let i=0;i<data.length;i++){
              this.newfile.push(data[i]);
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
            for(let i = 0; i < this.newfile.length; i++) {
                if(this.newfile[i] === name)  {
                    this.newfile.splice(i, 1);
                    i--;
                }
            }
        },
        delPhoto(name){
            for(let i = 0; i < this.newphoto.length; i++) {
                if(this.newphoto[i] === name)  {
                    this.newphoto.splice(i, 1);
                    i--;
                }
            }
        },
        async photoList(no){
          console.log('현재번호'+no)
          this.photo = [];
          this.file = [];
            let list = await axios.get(`/api/photo/notice_no/${no}`).catch(err=>console.log(err));
            console.log(list.data)
            for(let i=0;i<list.data.length;i++){
              if(list.data[i].types=='photo'){
                this.photo.push(list.data[i].file_name);
              }else if(list.data[i].types=='text'){
                this.file.push(list.data[i].file_name);
              }
            }
            console.log(this.photo,this.file)
        },
        async RealRemove(file){
            const fileName = file;
            const encodedFileName = encodeURIComponent(fileName);
            let list = await axios.delete(`/api/photo/${encodedFileName}`).catch((error) => {console.error(error)});
            if(list.data.affectedRows>0){
              alert('테이블에서 삭제완료');
            }
            this.photoList(this.no);
        },
    },
    components : {
        side,
        icon,
        upload
    },
    created(){
      window.scrollTo(0, 0);
      if(this.no>0){
        this.getNotice(this.no);
        this.photoList(this.no);
      }
    }
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
