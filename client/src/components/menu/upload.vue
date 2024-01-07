<template>
  <v-container>
    <v-file-input
      v-model="files"
      label="파일 업로드"
      multiple
    ></v-file-input>
    <v-btn @click="uploadMultiple">업로드</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { 
      files: [],
      
    };
  },
  methods: {
    uploadMultiple() {
      const formData = new FormData();

      for(let i=0;i<this.files.length;i++){
        formData.append("photos", this.files[i]);
      }

      axios
        .post("/api/photos", formData)
        .then((response) => {
          alert('추가되었습니다')
            this.$emit('info',response.data)
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
