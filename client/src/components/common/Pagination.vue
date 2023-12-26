<template>
  <div>
    <ul class="pagination" >
      <li class="page-item">
        <router-link class="page-link" to="/" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>
      <li v-for="(info,index) in list" :key="info" class="page-item"><a class="page-link btn" @click="newPage(index)">{{ index+1 }}</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
        totalPages:'',
        currentPage:'',
      
    };
  },
  props: ["list"],
  methods:{
    async newPage(no){
      this.currentPage = no;
      let page = await axios.get('/api/show/'+no).catch(err=>console.log(err));
      
    }
  }
}

</script>

<style scope>
.pagination{
justify-content: center;
}
</style>
