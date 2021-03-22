<template>
  <section>
    <BlogHeadTitle menu="blog.menu.list" />

    <BlogLoading v-if="blogArticleList.content === undefined" />

    <b-table
      v-if="blogArticleList.content"
      :items="blogArticleList.content"
      :fields="blogArticleListTableFields"
      @row-clicked="getView"
      hover
    />

    <b-pagination-nav
      align="center"
      v-if="blogArticleList.content"
      v-model="currentPage"
      number-of-pages="blogArticleList.totalPages"
      link-gen="movePage"
    />
  </section>
</template>

<script>
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import BlogLoading from "@/components/Blog/BlogLoading.vue";
import BlogHeadTitle from "@/components/Blog/BlogHeadTitle.vue";

export default {
  mixins: [blogArticleMixin],
  components: { BlogLoading, BlogHeadTitle },
  data() {
    return {
      blogArticleListTableFields: [
        { key: "id", label: this.$t("blogArticle.id") },
        {
          key: "title",
          label: this.$t("blogArticle.title"),
          class: "w-75",
        },
        {
          key: "createdDate",
          label: this.$t("blogArticle.createdDate"),
          formatter: (value) => {
            return this.$moment(value)
              .subtract(10, "days")
              .calendar();
          },
        },
        {
          key: "blogArticleCategory.name",
          label: this.$t("blogArticleCategory.name"),
        },
        {
          key: "viewCount",
          label: this.$t("blogArticle.viewCount"),
        },
      ],
      blogArticleList: {},
      currentPage: 1,
    };
  },
  methods: {
    getView: function(item, index, event) {
      this.moveBlogArticleView(this.$route.params.blogId, item.id);
    },
    // movePage의 경우 href를 만들기 때문에 move함수의 $router를 사용하지 않음.
    movePage: function(pageNum) {
      return {
        path: "/blog/{0}/list".format(this.$route.params.blogId),
        query: { page: pageNum },
      };
    },
    getList: function(pageRequest) {
      this.getBlogArticleList(this.$route.params.blogId, pageRequest)
        .then((data) => {
          if (data !== undefined) {
            this.blogArticleList = data;
            this.currentPage = this.blogArticleList.number + 1;
          }
        })
        .catch(this.commonErrorHandler);
    },
  },
  watch: {
    $route(to, from) {
      var pageRequest = {
        page: to.query.page === undefined ? 0 : to.query.page - 1,
      };
      this.getList(pageRequest);
    },
  },
  // asyncData({ params }) {
  //   console.log(params);
  // },
  mounted() {
    this.getList();
  },
};
</script>

<style></style>
