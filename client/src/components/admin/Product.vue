<template>
    <div class="container-fluid" style:width="50px">
      <div class="row">
      <side/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="container">
            <h4 class="mb-3" style="text-align: center;">상품 페이지</h4>
              <div class="row g-3">
    
                <div class="col-12">
<<<<<<< HEAD
                  <label for="prod_name" class="form-label">상품명 <icon/></label>
                  <div class="input-group has-validation" v-if="this.prodNo==null">
                    <input type="text" v-model="prod.prod_name" class="form-control" id="prod_name" required>
                  </div>
                  <div class="input-group has-validation" v-else>
                    <input type="text" v-model="prod.prod_name" class="form-control" id="prod_name" required readonly>
=======
                  <label for="prod_name" class="form-label">상품명</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="prod.prod_name" class="form-control" id="prod_name" placeholder="" required>
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
                  </div>
                </div>
    
                <div class="col-sm-6">
<<<<<<< HEAD
                  <label for="price" class="form-label">원가 <icon/></label>
                  <input v-if="this.prodNo==null" type="number" v-model.number="prod.price" class="form-control" id="prod_name" required>
                  <input v-else type="number" v-model.number="prod.price" class="form-control" id="prod_name" required readonly>
                </div>
    
                <div class="col-sm-6">
                  <label for="discount_price" class="form-label">판매가{{'(할인율 : '+Math.floor((1-((prod.discount_price)/(prod.price)))*100)+'%)' }}</label>
                  <input type="number" v-model.number="prod.discount_price" class="form-control" id="price">
                </div>

                <div class="col-sm-6">
                  <label for="stock" class="form-label">재고 <icon/></label>
                  <input v-if="this.prodNo==null" type="number" v-model.number="prod.stock" class="form-control" id="stock" placeholder="" value="" required>
                  <input v-else type="number" v-model.number="prod.stock" class="form-control" id="stock" placeholder="" value="" required>
=======
                  <label for="price" class="form-label">가격</label>
                  <input type="number" v-model="prod.price" class="form-control" id="prod_name" placeholder="" value="" required>
                </div>
    
                <div class="col-sm-6">
                  <label for="discount_price" class="form-label">할인 가격</label>
                  <input type="number" v-model="prod.discount_price" class="form-control" id="price" placeholder="" value="">
                </div>
    
                <div class="col-sm-6">
                  <label for="stock" class="form-label">재고</label>
                  <input type="number" v-model="prod.stock" class="form-control" id="stock" placeholder="" value="" required>
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
                </div>
    
                <div class="col-sm-6">
                  <label for="cooking_time" class="form-label">조리 시간</label>
<<<<<<< HEAD
                  <input type="number" v-model.number="prod.cooking_time" class="form-control" id="cooking_time" placeholder="" value="">
=======
                  <input type="number" v-model="prod.cooking_time" class="form-control" id="cooking_time" placeholder="" value="">
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
                </div>
    
                <div class="col-12">
                  <label for="allergy" class="form-label">알레르기 성분</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="prod.allergy" class="form-control" id="allergy" placeholder="">
                  </div>
                </div>
    
                <!-- <div class="col-12">
                  <label for="stock" class="form-label">상품 이미지 등록</label>
                  <div class="input-group has-validation">
                    <input type="number" v-model="prod.prod_name" class="form-control" id="stock" placeholder="" required>
                  </div>
                </div> -->
    
                <div class="col-md-5">
<<<<<<< HEAD
                  <label for="main_category" class="form-label">메인 카테고리 <icon/></label>
=======
                  <label for="main_category" class="form-label">메인 카테고리</label>
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
                    <option value="">선택하세요</option>
                    <option value="f1">바삭한 맛</option>
                    <option value="f2">매콤한 맛</option>
                    <option value="f3">국물</option>
                    <option value="f4">비건</option>
                  </select>
                </div>
              </div>
<<<<<<< HEAD
              <div v-if="this.prodNo==null" class="my-3">
=======
              <div class="my-3">
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
                <v-btn @click="refresh">초기화</v-btn>
                <v-btn @click="saveProd()">저장하기</v-btn>
=======
                <button @click="refresh">초기화</button>
                <button @click="saveProd()">저장하기</button>
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
              </div>
            </div>
    </main>
      </div>
    </div>
    </template>
    <script>
    import axios from 'axios';
    import side from '../admin/SideBar.vue';
<<<<<<< HEAD
    import icon from '../admin/icon.vue';
=======
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
                refrigeration : 'g1',
                discount_rate : '',
=======
                refrigeration : ''
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
              }
          }
        },
        created(){
          this.prodNo = this.$route.query.pno;
          if(this.prodNo > 0){
            this.prodUpdateList();
          }
        },
        methods : {
          refresh(){
            this.$router.push({name : 'product'});
          },
          async prodUpdateList(){
<<<<<<< HEAD
            let result = await axios.get(`/api/prods/${this.prodNo}`).catch(err=>console.log(err));
=======
            let result = await axios.get(`/api/prod/${this.prodNo}`).catch(err=>console.log(err));
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
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
<<<<<<< HEAD
                    "allergy" : this.prod.allergy,
                    "discount_rate" : Math.floor((1-(this.prod.discount_price/this.prod.price))*100)
                }
              }
              console.log('할인율 : '+this.prod.discount_rate)
              let result = await axios.put(`/api/prod/${this.prodNo}`,datas).catch(err=>console.log(err));
              if(result.data.affectedRows > 0){
                alert('수정성공!');
                this.$router.push({name : 'prodList'});
=======
                    "allergy" : this.prod.allergy
                }
              }
              let result = await axios.put(`/api/prod/${this.prodNo}`,datas).catch(err=>console.log(err));
              if(result.data.affectedRows > 0){
                alert('수정성공!');
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
              }else{
                  alert('수정 실패')
              }
          },
          async insertProduct(){
<<<<<<< HEAD
            this.prod.discount_rate = Math.floor((1-(this.prod.discount_price/this.prod.price))*100);
            let data = {
              param : this.prod
            }
            if(this.prod.prod_name==''||this.prod.price==''||this.prod.stock==''||this.prod.main_category==''||this.prod.refrigeration==''){
              alert('필수정보를 채워주세요');
            }else if(this.prod.discount_price==''){
              data.param.discount_price = data.param.price;
            }else{
              let result = await axios.post(`/api/prod`,data).catch(err=>console.log(err));
              if(result.data.affectedRows > 0){
                  alert('등록성공!');
                  this.$router.push({name : 'prodList'});
                }else{
                  alert('등록 실패')
                }
            }
          }
        },
        components : {
        side,
        icon
=======
            let data = {
              param : this.prod
            }
            let result = await axios.post(`/api/prod`,data).catch(err=>console.log(err));
            if(result.data.affectedRows > 0){
                alert('등록성공!');
              }else{
                  alert('등록 실패')
              }
          }
        },
        components : {
        side
>>>>>>> 589b9ccc736b28c1e566e2991a83d21929e6909e
        }
    }
    </script>
    <style scoped>
        .container{
            background-color: rgb(241, 221, 224);
            width: 800px;
            padding: 20px;
        }
    
        #buttonBox{
            text-align: center;
        }
    
        button{
            border-radius: 10px;
            padding: 8px;
            margin: 10px;
            border: none;
        }
    
    </style>