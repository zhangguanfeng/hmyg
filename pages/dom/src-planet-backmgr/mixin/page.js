export default {
  data() {
    return {
      total: 0,
      rows: 30,
      page: 1,
      loading: false,
    }
  },
  methods: {
    handleSizeChange(size) {
      this.rows = size;
      this.page = 1;
      this.queryData && this.queryData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.queryData && this.queryData();
    }
  }
}