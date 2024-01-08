<template>
    <div class="container-fluid" style:width="50px">
      <div class="row">
      <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="container">
            <h4 class="mb-3" style="text-align: center;">고객 문의 답변</h4>
              <div class="row g-3">
    
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">문의번호</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire_no" class="form-control" id="inquire_no" required>
                  </div>
                </div>
                <div class="col-sm-6"></div>
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">작성자</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire_no" class="form-control" id="inquire_no" required>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">작성날짜</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire_no" class="form-control" id="inquire_no" required>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">카테고리</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire_no" class="form-control" id="inquire_no" required>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">주문상세번호</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire_no" class="form-control" id="inquire_no" required>
                  </div>
                </div>
                <div class="col-12">
                <label for="price" class="form-label">제목 <icon v-if="showIcon">필수</icon></label>
                <input v-if="this.prodNo==null" type="number" v-model.number="prod.price" class="form-control" id="prod_name" required>
                <input v-else type="text" v-model="prod.price" class="form-control" id="prod_name" required readonly>
              </div>
  
              <div class="col-12">
                <label for="discount_price" class="form-label">내용</label>
                <textarea type="text" v-model="prod.discount_price" class="form-control" id="price"></textarea>
              </div>
                <div class="col-12">
                  <label for="stock" class="form-label">상품 이미지 등록</label>
                  <div :key="i" v-for="i in nums" style="width: 500px;">
                    <upload :numbers=this.nums @info="info" @text="text"/>
                    <v-btn v-show="this.nums==i" @click="this.nums=this.nums+1">+</v-btn><v-btn v-show="this.nums==i&&this.nums!=1" @click="this.nums=this.nums-1">-</v-btn>
                  </div>
                  <div v-for="idx in file">첨부파일 : {{ idx }}<p @click="delMultiple(idx)">삭제</p></div>
                  <div v-show="open==true" v-for="idx in photo"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"><p @click="delPhoto(idx)">삭제</p></div>
                  <v-btn @click="showing" v-show="photo.length>0">사진보기</v-btn> <!-- <v-btn @click="uploadPhoto">저장완료</v-btn> -->
                </div>
                <div class="col-12">
                <label for="discount_price" class="form-label">답변하기</label>
                <textarea type="text" v-model="prod.discount_price" class="form-control" id="price"></textarea>
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
          prodNo: '',
          prod : {
            prod_name : '',
            price : '',
            discount_price : '',
            stock : '',
            cooking_time : '',
            allergy : '',
            main_category : '',
            sub_category : '',
            refrigeration : 'g1',
            discount_rate : '',
          },
          showIcon : false,
          photo : [],
          file : [],
          open : false,
          nums : 1,
          delWord : '',
          ods : '',
      }
  },
  created(){
    this.prodNo = this.$route.query.pno;
    if(this.prodNo > 0){
      this.photoList(this.prodNo);
      this.prodUpdateList();
      this.open = true;
    }
  },
        methods : {
          refresh(){
            this.prod.prod_name = '';
            this.prod.price = '';
            this.prod.discount_price = '';
            this.prod.stock = '';
            this.prod.cooking_time = '';
            this.prod.allergy = '';
            this.prod.main_category = '';
            this.prod.sub_category = '';
            this.prod.discount_rate = '';
          },
          async photoList(no){
            this.photo = [];
            console.log(no)
            let list = await axios.get(`/api/photo/${no}`).catch(err=>console.log(err));
            for(let i=0;i<list.data.length;i++){
              this.photo.push(list.data[i].file_name);
              console.log('사진 리스트 ' +list.data[i])
            }
          },
          async prodUpdateList(){
            let result = await axios.get(`/api/prods/${this.prodNo}`).catch(err=>console.log(err));
            this.prod = (result.data)[0];
          },
          saveProd(){
            if(this.prodNo > 0){
              this.modProduct();
            }else{
              this.insertProduct();
            }
          },
          async modProduct(){
            let datas = {
                param : {
                    "discount_price" : this.prod.discount_price,
                    "main_category" : this.prod.main_category,
                    "sub_category" : this.prod.sub_category,
                    "cooking_time" : this.prod.cooking_time,
                    "allergy" : this.prod.allergy,
                    "discount_rate" : Math.ceil((1-(this.prod.discount_price/this.prod.price))*100)
                }
              }
              let result = await axios.put(`/api/prod/${this.prodNo}`,datas).catch(err=>console.log(err));
              if(result.data.affectedRows > 0){
                
                alert('수정성공!');
                for(let i=0;i<this.photo.length;i++){
                  this.ods = 's'+i
                  let photos = {
                    param : {
                      "file_category" : 'r3',
                      "file_name" : this.photo[i],
                      "orders" : this.ods,
                      "prod_no" : this.prodNo,
                      "path" : 'uploads\\'+this.photo[i]
                    }
                  }
                  let result1 = axios.post("/api/photo",photos).catch(err=>console.log(err));
                  alert('테이블ㅇㅔ 추가');
                }
                this.$router.push({name : 'prodList'});
              }else{
                  alert('수정 실패')
              }
          },
          async insertProduct(){
            if(this.prod.discount_price==''){
              this.prod.discount_price = this.prod.price;
            }
            this.prod.discount_rate = Math.ceil((1-(this.prod.discount_price/this.prod.price))*100);
            let data = {
              param : this.prod
            }
            if(this.prod.prod_name==''||this.prod.price==''||this.prod.stock==''||this.prod.main_category==''||this.prod.refrigeration==''){
              alert('필수정보를 채워주세요');
              this.showIcon = true;
              return;
            }
            if(this.prod.discount_price==''){
              this.param.discount_price = this.param.price;
            }
            let result = await axios.post(`/api/prod`,data).catch(err=>console.log(err));
            if(result.data.affectedRows > 0){
              alert('등록성공!');
              for(let i=0;i<this.photo.length;i++){
              console.log(this.photo[i])
              let photos = {
                param : {
                  "file_category" : 'r3',
                  "file_name" : this.photo[i],
                  "orders" : i,
                  "prod_no" : result.data.insertId,
                  "path" : 'uploads\\'+this.photo[i]
                }
              }
              let result1 = axios.post("/api/photo",photos).catch(err=>console.log(err));
              alert('테이블ㅇㅔ 추가')
            }
              console.log('현재 등록된 상품' + result.data.insertId)
              this.$router.push({name : 'prodList'});
            }else{
              alert('등록 실패')
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
          // delMultiple(file){
          //   const fileName = file;
          //   const encodedFileName = encodeURIComponent(fileName);
          //   console.log('현재파일'+encodedFileName)
          //   let list = axios.delete(`/api/photo/${encodedFileName}`).catch((error) => {console.error(error)});
          //   alert('삭제')
          //   this.photoList(this.prodNo);
          // },
          delPhoto(name){
            for(let i = 0; i < this.photo.length; i++) {
                if(this.photo[i] === name)  {
                    this.photo.splice(i, 1);
                    i--;
                }
            }
          },
          delMultiple(name){
            for(let i = 0; i < this.file.length; i++) {
                if(this.file[i] === name)  {
                    this.file.splice(i, 1);
                    i--;
                }
            }
        },
          // uploadPhoto(){
          //   for(let i=0;i<this.photo.length;i++){
          //     console.log(this.photo[i])
          //     let photos = {
          //       param : {
          //         "file_category" : 'r3',
          //         "file_name" : this.photo[i],
          //         "orders" : i,
          //         "prod_no" : this.prodNo,
          //         "path" : 'uploads\\'+this.photo[i]
          //       }
          //     }
          //     let result1 = axios.post("/api/photo",photos).catch(err=>console.log(err));
          //       if(result1.data.affectedRows>0){
          //         alert('테이블ㅇㅔ 추가')
          //       }else{
          //         alert('테이블ㅇㅔ 실패')
          //       }
          //   }
          // }
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
        }
    
        #buttonBox{
            text-align: center;
        }
    
        button{
          color : rgb(174, 118, 238);
          border-radius: 10px;
          padding: 8px;
          margin: 10px;
          border: none;
        }
        #ima{
          width: 200px;
          height: 200px;
        }
</style>
