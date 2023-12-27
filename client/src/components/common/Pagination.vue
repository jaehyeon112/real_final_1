<template>
  <div>
    <ul class="pagination">
      <li class="page-item">
        <button
          class="page-link"
          aria-label="Previous"
          :disabled="this.currentPage === 1"
          @click="changePage(1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        v-for="page in visiblebutton"
        :key="page"
        :class="{ active: page === currentPage }"
      >
      
        <a class="page-link btn" @click="changePage(page)" :disabled="this.currentPage == page">{{ page }}</a>
      </li>
      <li class="page-item">
        <button
          class="page-link"
          aria-label="Next"
          :disabled="this.currentPage == totalpage"
          @click="changePage(totalpage)"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 6, //보여질 페이지를 조절...
      currentPage: 1, //현재페이지
    };
  },
  computed: {
    // 페이지의 총 갯수
    totalpage() {
      return Math.ceil(this.list.length / this.total);
    },
    visiblebutton() {
      let pageCount = Math.min(this.totalpage, 5); //보여지는 페이지 버튼 수, 보통은 5이지만 만약 총갯수가 5보다 작으면.. 토탈 페이지갯수 보여줌

      let startPage = Math.max(1, this.currentPage - Math.floor(pageCount / 2)); //현재 페이지 - 2해야 시작페이지
      let endPage = Math.min(this.totalpage, startPage + pageCount - 1);
      if (endPage - startPage + 1 < pageCount) {
        // 시작 페이지가 뒤로 더 갈 수 있으면 뒤로 더 가도록
        startPage = Math.max(1, endPage - pageCount + 1);
      }
      console.log(
        `현재 페이지 ${this.currentPage}, 시작페이지 ${startPage}, 끝페이지${endPage}`
      );
      // 총 길이 5개인 배열을 만드는 방법..
      return Array.from(
        { length: endPage - startPage + 1 },
        (x, i) => startPage + i
      );
    },
  },
  props: ["list"],
  methods: {
    changePage(index) {
      this.currentPage = index;
      this.$emit("changePage", index-1);
    },
  },
};
</script>

<style scope>
.pagination {
  justify-content: center;
}
.pagination .active {
  background-color: #007bff;
  color: #fff;
}
</style>
