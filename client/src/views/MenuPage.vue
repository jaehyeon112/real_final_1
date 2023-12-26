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
    <v-container>
      <pagination @changePage="changePage" :list="totalList"></pagination>
    </v-container>
    <button @click="changePage(5)">리스트 다르게?</button>
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
      totalList: "",
      list: "",
      pageNo: 0,
    };
  },
  methods: {
    async total() {
      let total = await axios.get("/api/show").catch((err) => {
        console.log(err);
      });

      console.log("Total");
      this.totalList = total.data;
      console.log(this.totalList);
    },

    async productList() {
      try {
        let proList = await axios.get("/api/show/" + this.pageNo);
        this.list = proList.data;
      } catch (error) {
        console.error("Error fetching initial page data:", error);
      }
    },
    async changePage(no) {
      try {
        let page = await axios.get("/api/show/" + no);
        this.list = page.data;
        console.log(page.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    },
  },
  created() {
    this.productList();
    this.total();
  },
  components: {
    filterSide,
    menulist,
    pagination,
  },
};
</script>

<style></style>
