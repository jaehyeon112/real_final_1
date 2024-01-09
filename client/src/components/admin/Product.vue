<template>
    <div class="container-fluid" style:width="50px">
      <div class="row">
      <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="container">
            <h4 class="mb-3" style="text-align: center;">상품 페이지</h4>
              <div class="row g-3">
    
                <div class="col-12">
                  <label for="prod_name" class="form-label">상품명 <icon v-if="showIcon">필수</icon></label>
                  <div class="input-group has-validation" v-if="this.prodNo==null">
                    <input type="text" v-model="prod.prod_name" class="form-control" id="prod_name" required>
                  </div>
                  <div class="input-group has-validation" v-else>
                    <input type="text" v-model="prod.prod_name" class="form-control" id="prod_name" required readonly>
                  </div>
                </div>
                <div class="col-sm-6">
                <label for="price" class="form-label">원가 <icon v-if="showIcon">필수</icon></label>
                <input v-if="this.prodNo==null" type="number" v-model.number="prod.price" class="form-control" id="prod_name" required>
                <input v-else type="number" v-model.number="prod.price" class="form-control" id="prod_name" required readonly>
              </div>
  
              <div class="col-sm-6">
                <label for="discount_price" class="form-label" v-if="prod.price==''">판매가</label>
                <label for="discount_price" class="form-label" v-else>판매가{{'(할인율 : '+Math.ceil((1-((prod.discount_price)/(prod.price)))*100)+'%)' }}</label>
                <input type="number" v-model.number="prod.discount_price" class="form-control" id="price">
              </div>
                <div class="col-sm-6">
                  <label for="stock" class="form-label">재고 <icon v-if="showIcon">필수</icon></label>
                  <input v-if="this.prodNo==null" type="number" v-model.number="prod.stock" class="form-control" id="stock" placeholder="" value="" required>
                  <input v-else type="number" v-model.number="prod.stock" class="form-control" id="stock" placeholder="" value="" required readonly>
                </div>
    
                <div class="col-sm-6">
                  <label for="cooking_time" class="form-label">조리 시간</label>
                  <input type="number" v-model.number="prod.cooking_time" class="form-control" id="cooking_time" placeholder="" value="">
                </div>
    
                <div class="col-12">
                  <label for="allergy" class="form-label">알레르기 성분</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="prod.allergy" class="form-control" id="allergy" placeholder="">
                  </div>
                </div>
    
                <div class="col-12">
                  <label for="stock" class="form-label">상품 이미지 등록</label>
                  <div :key="i" v-for="i in nums" style="width: 500px;">
                    <upload :numbers=this.nums @info="info" @text="text"/>
                    <v-btn v-show="this.nums==i" @click="this.nums=this.nums+1">+</v-btn><v-btn v-show="this.nums==i&&this.nums!=1" @click="this.nums=this.nums-1">-</v-btn>
                  </div>
                  <div v-for="idx in file">첨부파일 : {{ idx }}<p @click="delMultiple(idx)">삭제</p></div>
                  <!--기존에 있던 사진 삭제-->
                  <div v-show="open==true" v-for="idx in photo"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"><p @click="RealRemove(idx)">삭제</p></div>
                  <!--새로 추가된 사진 삭제-->
                  <div v-show="open==true" v-for="idx in newPhoto"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"><p @click="delPhoto(idx)">새로운사진삭제</p></div>
                  <v-btn @click="showing" v-show="photo.length>0||newPhoto.length>0">사진보기</v-btn>
                </div>
                
                <div class="col-md-5">
                  <label for="main_category" class="form-label">메인 카테고리 <icon v-if="showIcon">필수</icon></label>
                  <select v-model="prod.main_category" class="form-select" id="main_category" required>
                    <option value="">선택하세요</option>
                    <option value="e1">한식</option>
                    <option value="e2">중식</option>
                    <option value="e3">양식</option>
                    <option value="e4">일식</option>
                    <option value="e5">분식</option>
                  </select>
                </div>
    
                <div class="col-md-4">
                  <label for="sub_category" class="form-label">서브 카테고리</label>
                  <select v-model="prod.sub_category" class="form-select" id="sub_category" required>
                    <option value="">기본맛</option>
                    <option value="f1">바삭한 맛</option>
                    <option value="f2">매콤한 맛</option>
                    <option value="f3">국물</option>
                    <option value="f4">비건</option>
                  </select>
                </div>
              </div>
              <div v-if="this.prodNo==null" class="my-3">
                <div class="form-check">
                  <input v-model="prod.refrigeration" value="g1" name="paymentMethod" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="credit">냉동</label>
                </div>
                <div class="form-check">
                  <input v-model="prod.refrigeration" value="g2" name="paymentMethod" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="debit">냉장</label>
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
import side from '../admin/SideBar.vue';
import icon from '../admin/icon.vue';
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
          newPhoto : [],
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
            let list = await axios.get(`/api/photo/prod_no/${no}`).catch(err=>console.log(err));
            for(let i=0;i<list.data.length;i++){
              console.log('현재의 타입'+list.data[i].types)
              if(list.data[i].types=='photo'){
                this.photo.push(list.data[i].file_name);
              }else if(list.data[i].types=='text'){
                this.file.push(list.data[i].file_name);
              }
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
              console.log(result.data)
              if(result.data.affectedRows > 0){
                alert('수정성공!');

                for(let i=0;i<this.file.length;i++){
                  this.ods = 's'+i
                  let photos = {
                    param : {
                      "file_category" : 'r3',
                      "file_name" : this.file[i],
                      "orders" : this.ods,
                      "prod_no" : this.prodNo,
                      "path" : 'uploads\\'+this.file[i],
                      "types" : 'text'
                    }
                  }
                  let result1 = await axios.post("/api/photo",photos).catch(err=>console.log(err));
                  if(result1.data.affectedRows>0){
                    alert('테이블ㅇㅔ 사진추가');
                  }else{
                    alert('테이블ㅇㅔ 실패');
                  }
                }
                for(let i=0;i<this.newPhoto.length;i++){
                  this.ods = 's'+i
                  let ph = {
                    param : {
                      "file_category" : 'r3',
                      "file_name" : this.newPhoto[i],
                      "orders" : this.ods,
                      "prod_no" : this.prodNo,
                      "path" : 'uploads\\'+this.newPhoto[i],
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
              for(let i=0;i<this.file.length;i++){
                  this.ods = 's'+i
                  let photos = {
                    param : {
                      "file_category" : 'r3',
                      "file_name" : this.file[i],
                      "orders" : this.ods,
                      "prod_no" : this.prodNo,
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
              for(let i=0;i<this.newPhoto.length;i++){
              console.log(this.newPhoto[i])
              let photos = {
                param : {
                  "file_category" : 'r3',
                  "file_name" : this.newPhoto[i],
                  "orders" : i,
                  "prod_no" : result.data.insertId,
                  "path" : 'uploads\\'+this.newPhoto[i]
                }
              }
              let result1 = await axios.post("/api/photo",photos).catch(err=>console.log(err));
              if(result1.affectedRows>0){
                alert('테이블ㅇㅔ 사진추가')
              }else{
                alert('실패...')
              }
            }
              console.log('현재 등록된 상품' + result.data.insertId)
              this.$router.push({name : 'prodList'});
            }else{
              alert('등록 실패')
            }
          },
          info(data){
            for(let i=0;i<data.length;i++){
              console.log(data[i])
              this.newPhoto.push(data[i]);
              console.log('현재 새로운 포토'+this.newPhoto)
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
          async RealRemove(file){
            const fileName = file;
            const encodedFileName = encodeURIComponent(fileName);
            console.log('현재파일'+encodedFileName)
            let list = await axios.delete(`/api/photo/${encodedFileName}`).catch((error) => {console.error(error)});
            if(list.data.affectedRows>0){
              alert('테이블에서 삭제완료');
              this.photoList(this.prodNo);
            }
          },
          delPhoto(name){
            for(let i = 0; i < this.newPhoto.length; i++) {
                if(this.newPhoto[i] === name)  {
                    this.newPhoto.splice(i, 1);
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
