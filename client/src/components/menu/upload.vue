<template>
  <v-container>
    <v-file-input
      v-model="files"
      multiple
      label="여러 파일 업로드"
    ></v-file-input>
    <v-btn @click="uploadMultiple">업로드</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return { files: [] };
  },
  methods: {
    uploadMultiple() {
      const formData = new FormData();

      for (let i = 0; i < this.files.length; i++) {
        formData.append("photos", this.files[i]);
      }

      axios
        .post("/api/photos", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
