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
                    <input type="text" v-model="inquire.inquire_no" class="form-control" id="inquire_no" readonly>
                  </div>
                </div>
                <div class="col-sm-6"></div>
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">작성자</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire.user_id" class="form-control" id="inquire_no" readonly>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">작성날짜</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire.create_date" class="form-control" id="inquire_no" readonly>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label for="inquire_no" class="form-label">카테고리</label>
                  <div class="input-group has-validation">
                    <input type="text" v-model="inquire.inquire_category" class="form-control" id="inquire_category" readonly>
                  </div>
                </div>
                <div class="col-sm-6" v-if="inquire.order_detail_no!=0">
                    <label for="inquire_no" class="form-label">주문상세번호</label>
                    <div class="input-group has-validation">
                        <input type="text" v-model="inquire.order_detail_no" class="form-control" id="order_detail_no" readonly>
                    </div>
                </div>
                <div v-else>
                    <label for="inquire_no" class="form-label"></label>
                </div>
                <div class="col-12">
                <label for="price" class="form-label">제목</label>
                <input type="text" v-model="inquire.inquire_title" class="form-control" id="prod_name" readonly>
              </div>
  
              <div class="col-12">
                <label for="discount_price" class="form-label">내용</label>
                <textarea type="text" v-model="inquire.inquire_content" class="form-control" id="inquire_content" readonly></textarea>
              </div>
                <div class="col-12">
                  <label for="stock" class="form-label">첨부 이미지</label>
                  <div v-show="open==true" v-for="idx in photo"><img id="ima" :src="getPath(idx)" style="position: relative;height=300"></div>
                  <v-btn @click="showing" v-if="photo.length>0">사진보기</v-btn>
                  <h4 v-else="photo.length>0">첨부된 사진이 없습니다</h4>
                </div>
              <div class="col-12" v-if="this.cnt>0">
                <v-textarea v-model = "reply.reply_content" type="text" label="답변내용" variant="outlined"></v-textarea>
                <label for="discount_price" class="form-label">답변일시</label>
                <input type="text" v-model="reply.reply_date" class="form-control" id="reply_date" readonly>
              </div>
              <div class="col-12" v-else>
                <v-textarea v-model = "reply.reply_content" type="text" label="답변하기" variant="outlined"></v-textarea>
              </div>
              </div>
              <div id="buttonBox" v-if="this.cnt==0">
                <v-btn @click="refresh">초기화</v-btn>
                <v-btn @click="saveProd">저장하기</v-btn>
              </div>
              <div id="buttonBox" v-else>
                <v-btn @click="gotoList">목록으로 가기</v-btn>
              </div>
            </div>
            
    </main>
      </div>
    </div>
    </template>
<script>
import axios from 'axios';
import side from './SideBar.vue';
import icon from './icon.vue';
import upload from "@/components/menu/upload.vue";
export default {
    data(){
      return{
          inquireNo: this.$route.query.ino,
          reply : {
            inquire_no : this.$route.query.ino,
            reply_content : '',
          },
          photo : [],
          file : [],
          inquire : {},
          open : true,
          nums : 1,
          cnt : 0
      }
    },
    created(){
        this.inquireNo = this.$route.query.ino;
        this.inquireInfo();
        this.replyInfo();
    },
    methods : {
        refresh(){
            this.reply.reply_content = '';
        },
        async photoList(no){
            this.photo = [];
            console.log(no)
            let list = await axios.get(`/api/photo/inquire_no/${this.$route.query.ino}`).catch(err=>console.log(err));
            for(let i=0;i<list.data.length;i++){
                this.photo.push(list.data[i].file_name);
            }
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
        async inquireInfo(){
          let result = await axios.get(`/api/inquire/${this.inquireNo}`).catch(err=>console.log(err));
          for(let i=0;i<result.data.length;i++){
            result.data[i].create_date = this.dateFormat(result.data[i].create_date,'yyyy년 MM월 dd일');
            if(result.data[i].inquire_category=='j1'){
              result.data[i].inquire_category = '상품문의'
            }else if(result.data[i].inquire_category=='j2'){
              result.data[i].inquire_category = '배송문의'
            }else if(result.data[i].inquire_category=='j3'){
              result.data[i].inquire_category = '취소/환불문의'
            }else{
              result.data[i].inquire_category = '기타문의'
            }
          }
          this.inquire = (result.data)[0];
        },
        async replyInfo(){
          console.log('문의번호'+this.inquireNo)
          let result = await axios.get(`/api/reply/${this.inquireNo}`).catch(err=>console.log(err));
          for(let i=0;i<result.data.length;i++){
            console.log('답변'+result.data[i])
            result.data[0].reply_date = this.dateFormat(result.data[0].reply_date,'yyyy년 MM월 dd일');
            this.reply = (result.data)[i];
            this.cnt = this.cnt+1;
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
        gotoList(){
          this.$router.push({path : "inquireList"});
        },
        async saveProd(){
          if(this.reply.reply_content==''){
            alert('답변을 달아주세요')
          }else{
            let datas = {
                param : this.reply
            }
            let result = await axios.post(`/api/reply`,datas).catch(err=>console.log(err));
            let update = await axios.put(`/api/inquire/${this.inquireNo}`).catch(err=>console.log(err));
            if(result.data.affectedRows > 0&&update.data.affectedRows>0){
                alert('답변을 등록했습니다');
                this.$router.push({path : "inquireList"});
            }else{
                alert('실패')
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
