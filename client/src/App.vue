<template>
  <div>
    <HEADER></HEADER>
    <router-view />
    <FOOTER></FOOTER>
  </div>
</template>
<script>
import HEADER from "@/layouts/MainHeader.vue";
import FOOTER from "@/layouts/MainFooter.vue";

export default {
  components: {
    HEADER,
    FOOTER,
  },
};
</script>
