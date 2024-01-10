<template>
    <div class="container-fluid" style:width="50px">
    <div class="row">
        <side/>
    <main class="col-md-9 col-lg-10 px-md-4">
        <br>
        <h4 style="text-align: center;">==자주하는 질문 목록==</h4>
        <v-btn style="float: right;color: red;" @click="this.modalCheck=true">등록하기</v-btn>
    <div>
        <br>
        <v-expansion-panels
        v-model="panel"
        ><h3>배송</h3>
        <v-expansion-panel :key="idx" v-for="(delivery,idx) in deliveryList">
            <v-expansion-panel-title>{{delivery.q_title}}</v-expansion-panel-title>
            <v-expansion-panel-text>
                {{delivery.q_content}}
                <v-btn @click="this.qno=delivery.qno,this.modCheck=true,this.getOneList()">수정</v-btn>    <v-btn @click="del(delivery.qno)">삭제</v-btn>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel v-show="deliveryList.length==0">
            <v-expansion-panel-title>등록된 FNQ가 없습니다</v-expansion-panel-title>
        </v-expansion-panel>
        </v-expansion-panels>
        <br>
        <v-expansion-panels
        v-model="panel1"
        ><h3>주문/결제</h3>
        <v-expansion-panel :key="idx" v-for="(delivery,idx) in orderList">
            <v-expansion-panel-title>{{delivery.q_title}}</v-expansion-panel-title>
            <v-expansion-panel-text>
                {{delivery.q_content}}
                <v-btn @click="this.qno=delivery.qno,this.modCheck=true,this.getOneList()">수정</v-btn>    <v-btn @click="del(delivery.qno)">삭제</v-btn>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel v-show="orderList.length==0">
            <v-expansion-panel-title>등록된 FNQ가 없습니다</v-expansion-panel-title>
        </v-expansion-panel>
        </v-expansion-panels>
        <br>
        <v-expansion-panels
        v-model="panel2"
        ><h3>취소/환불</h3>
        <v-expansion-panel :key="idx" v-for="(delivery,idx) in refundList">
            <v-expansion-panel-title>{{delivery.q_title}}</v-expansion-panel-title>
            <v-expansion-panel-text>
                {{delivery.q_content}}
                <v-btn @click="this.qno=delivery.qno,this.modCheck=true,this.getOneList()">수정</v-btn>    <v-btn @click="del(delivery.qno)">삭제</v-btn>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel v-show="refundList.length==0">
            <v-expansion-panel-title>등록된 FNQ가 없습니다</v-expansion-panel-title>
        </v-expansion-panel>
        </v-expansion-panels>
    </div>

    <div class="modal-wrap" v-show="modalCheck">
      <div class="modal-container" @click.stop="">
        <h3>자주하는 질문 카테고리</h3>
        <div class="modalPop">
            <v-select
            label="카테고리"
            :items="['배송','주문/결제','취소/환불']"
            v-model = category
            return-object
            ></v-select>
        </div>
        <br>
        <hr>
        <div style="width: 300px;">
            <v-textarea v-model = "title" type="text" label="제목" variant="outlined"></v-textarea>
        </div>
        <br>
        <div style="width: 400px;">
            <v-textarea v-model = "content" type="text" label="내용" variant="outlined"></v-textarea>
        </div>
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modalCheck = false,this.category=''">닫기</v-btn>
            <v-btn style="border-radius: 10px;" @click="insertFNQ">등록하기</v-btn>
        </div>
      </div>
    </div>


    <div class="modal-wrap" v-show="modCheck">
      <div class="modal-container" @click.stop="">
        <h3>자주하는 질문 카테고리</h3>
        <div class="modalPop">
            <v-select
            label="카테고리"
            :items="['배송','주문/결제','취소/환불']"
            v-model = this.one.q_category
            return-object
            ></v-select>
        </div>
        <br>
        <hr>
        <div style="width: 300px;">
            제목  <v-textarea v-model = "this.one.q_title" type="text" label="Label" variant="outlined"></v-textarea>
        </div>
        <br>
        <div style="width: 400px;">
            내용  <v-textarea v-model = "this.one.q_content" type="text" label="Label" variant="outlined">{{ this.one.q_content }}</v-textarea>
        </div>
        <div class="modal-btn">
            <v-btn style="border-radius: 10px;" @click="modCheck = false,this.category=''">닫기</v-btn>
            <v-btn style="border-radius: 10px;" @click="modfnq">등록하기</v-btn>
        </div>
      </div>
    </div>
</main>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
import side from '../components/admin/SideBar.vue';
    export default {
        data(){
            return{
                deliveryList : [],
                orderList : [],
                refundList : [],
                panel: [-1, -1],
                panel1: [-1, -1],
                panel2: [-1, -1],
                panel3: [-1, -1],
                modalCheck : false,
                category : '',
                title : '',
                content : '',
                modCheck : false,
                qno : '',
                one : ''
            }
        } ,
        components : {
            side
        },
        methods:{
            async getdelList(){
                let result = await axios.get(`/api/fnq/q_category/m2`).catch(err=>console.log(err));
                this.deliveryList = result.data;
            },
            async getordList(){
                let result = await axios.get(`/api/fnq/q_category/m1`).catch(err=>console.log(err));
                this.orderList = result.data;
            },
            async getrefList(){
                let result = await axios.get(`/api/fnq/q_category/m3`).catch(err=>console.log(err));
                this.refundList = result.data;
            },
            async getOneList(){
                let result = await axios.get(`/api/fnq/qno/${this.qno}`).catch(err=>console.log(err));
                for(let i=0;i<result.data.length;i++){
                    if(result.data[i].q_category='m1'){
                        result.data[i].q_category = '주문/결제'
                    }else if(result.data[i].q_category='m2'){
                        result.data[i].q_category = '배송'
                    }else if(result.data[i].q_category='m3'){
                        result.data[i].q_category = '취소/환불'
                    }

                }
                this.one = result.data[0];
            },
            async insertFNQ(){
                if(confirm('등록하는 카테고리가 '+this.category+'가 맞습니까?')){
                    if(this.category=='배송'){
                        this.category = 'm2'
                    }else if(this.category=='주문/결제'){
                        this.category = 'm1'
                    }else if(this.category=='취소/환불'){
                        this.category = 'm3'
                    }
    
                    let data = {
                        param : {
                        "q_title" : this.title,
                        "q_content" : this.content,
                        "q_category" : this.category,
                        }
                    }
                    let result = await axios.post(`/api/fnq`,data).catch(err=>console.log(err));
                    if(result.data.affectedRows==1){
                        alert('자주하는 질문이 되었습니다!');
                        this.modalCheck=false;
                        this.getdelList();
                        this.getordList();
                        this.getrefList();
                    }else{
                        alert('실패...');
                    }
                }else{
                    alert('다시 선택해주세요');
                }
            },
            async modfnq(){
                if(this.one.q_category=='배송'){
                    this.one.q_category = 'm2'
                }else if(this.one.q_category=='주문/결제'){
                    this.one.q_category = 'm1'
                }else if(this.one.q_category=='취소/환불'){
                    this.one.q_category = 'm3'
                }
                let data = {
                    param : this.one
                }
                let result = await axios.put(`/api/fnq/${this.qno}`,data).catch(err=>console.log(err));
                if(result.data.affectedRows==1){
                    alert('수정이 완료되었습니다');
                    this.modCheck=false;
                    this.getdelList();
                    this.getordList();
                    this.getrefList();
                }else{
                    alert('실패...');
                }
            },
            async del(qno){
                if(confirm('정말 삭제하시겠습니까?')){
                    let result = await axios.delete(`/api/${qno}`).catch(err=>console.log(err));
                    if(result.data.affectedRows==1){
                        alert('삭제가 완료되었습니다');
                        this.getdelList();
                        this.getordList();
                        this.getrefList();
                    }else{
                        alert('실패...');
                    }
                }
            }
        },
        created(){
            window.scrollTo(0, 0);
            this.getdelList();
            this.getordList();
            this.getrefList();
        }
    }
</script>
<style scoped>
.modal-wrap {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  /* modal or popup */
  .modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
  }
  .modalPop{
    border: 1px solid;
  }

  .modal-btn button{
    margin: 10px;
    padding : 5px;

  }
  v-btn{
    border-radius: 10px;
  }
  .col-md-9 {
  margin: 0 auto;
  padding: 10px;
}
</style>