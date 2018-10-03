<template>
  <div>
    <b-table hover :fields="fields" :items="blogArticles">
      <template slot="title" slot-scope="data">
        <b-link :to="'view/' + data.item.id">{{data.item.title}}</b-link>
      </template>
    </b-table>
    <b-pagination :total-rows="totalRows" v-model="currentPage" :per-page="perPage">
    </b-pagination>
  </div>
</template>

<script>
export default {
  name: 'BlogArticleList',
  props: ['blogId'],
  data () {
    return {
      fields: {
        id: { key: 'id' },
        title: { label: '제목' },
        createdDate: { label: '생성일' },
        viewCount: { label: '조회수' }
      },
      blogListResponse: null,
      blogArticles: [],
      totalRows: 0,
      currentPage: 0,
      perPage: 0
    }
  },
  methods: {
  },
  mounted: function () {
    var _this = this
    console.log(this.blogId)
    this.$http.get('/api/blogArticles/search/findByBlogId', {
      params: {
        id: this.blogId
      }
    })
      .then(function (response) {
        var data = response.data
        _this.blogListResponse = data
        _this.blogArticles = data._embedded.blogArticles

        var page = data.page
        _this.totalRows = page.totalElements
        _this.currentPage = page.number
        _this.perPage = page.size
      })
  }
}
</script>

<style scoped>
</style>
