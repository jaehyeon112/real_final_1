<template>
  <div class="why">
      <div class="row">
        <div class="col-4">
          <router-link
            to="/main"
            class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
            <img id="ima" :src="'/api/fileCall/1조 로고.jpg'" title="조이밀 홈페이지로 이동" style="position: relative;left:50%; height=140px;width: 140px;">
          </router-link>
        </div>
      </div>
  </div>
</template>
<script>

</script>
<style scoped>
.why{
  width : 100%;
  height: 130px;
  background-color: rgb(255, 255, 255);
  margin: auto;
}
.col-4{
  margin: auto;
  top : 50%;
  font-size: 18px;
}
</style>
