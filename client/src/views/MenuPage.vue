<template>
  <div>
    <v-row>
      <v-col cols="3">
        <filterSide />
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="4" v-for="test in list" :key="test">
            <menulist :prodList="test"> </menulist>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-container >
      <pagination :list="list"></pagination>
    </v-container>
  </div>
</template>

<script>
import filterSide from "@/components/menu/filter.vue";
import menulist from "@/components/menu/MenuList.vue";
import pagination from "@/components/common/Pagination";
import axios from "axios";
export default {
  data() {
    return {
      list: "",
      pageNo:0
    };
  },
  computed:{}
  ,
  methods: {
    async productList() {
      let proList = await axios.get("/api/show/"+this.pageNo);
      this.list = proList.data;
    },
  },
  created() {
    this.productList();
  },

  components: {
    filterSide,
    menulist,
    pagination,
  },
};
</script>

<style></style>
