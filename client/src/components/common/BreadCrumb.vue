<template>
  <div class="breadcrumb">
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link :to="{ path: crumb.path }">{{ crumb.meta.bread }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      let paths = this.$route.matched; 
      console.log(paths)
      return paths.map(crumb => ({ 
        path: crumb.path, 
        meta: crumb.meta
      }));
    }
  }
};
</script>