<template>
  <v-container>
    <v-file-input
      v-model="files"
      :label=word
    ></v-file-input>
    <v-btn @click="uploadMultiple">사진첨부</v-btn>
    <v-btn @click="uploadFile">파일첨부</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props : ['numbers'],
  data() {
    return { 
      files: [],
      word : '대표이미지'+this.numbers,
    };
  },
  methods: {
    uploadMultiple() {
      if(this.files==''){
        alert('선택된 사진이 없습니다')
      }else{
        const formData = new FormData();
        
        for(let i=0;i<this.files.length;i++){
          formData.append("photos", this.files[i]);
        }
  
        axios
          .post("/api/photos", formData)
          .then((response) => {
            alert('추가되었습니다')
            console.log('현재 넘어온 사진'+response.data)
            this.$emit('info',response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    uploadFile(){
      if(this.files==''){
        alert('선택된 파일이 없습니다')
      }else{
        const formData = new FormData();
        for(let i=0;i<this.files.length;i++){
          formData.append("text", this.files[i]);
        }
  
        axios
          .post("/api/text", formData)
          .then((response) => {
            alert('추가되었습니다')
            console.log('현재 넘어온 파일'+response.data)
            this.$emit('text',response.data)
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    
    // delImage(){
    //   const formData = new FormData();

    //   for(let i=0;i<this.files.length;i++){
    //     formData.append("photos", this.files[i]);
    //   }

    //   axios.delete("/api/photos",formData)
    //   .then((response)=>{
    //     alert('삭제완료');
    //   })
    //   .catch((error) => {console.error(error)});
    // }
  },
};
</script>

<style></style>
