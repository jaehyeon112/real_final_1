<template>
  <v-row>
    <v-col cols="4">
      <filterSide />
    </v-col>
    <v-col cols="8" justify="center">
      <menulist />
    </v-col>
  </v-row>
  <pagination />
</template>

<script>
import filterSide from "@/components/menu/filter.vue";
import menulist from "@/components/menu/MenuList.vue";
import pagination from "@/components/common/Pagination";
export default {
  components: {
    filterSide,
    menulist,
    pagination,
  },
};
</script>

<style></style>
