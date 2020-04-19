<template>
  <div class="m-3">
    <b-table :items="blogArticleList.content" hover :fields="tableFields" @row-clicked="getView"></b-table>

    <!-- 페이지 붙일 차례 -->
    <b-pagination-nav
      v-model="blogArticleList.number"
      :number-of-pages="blogArticleList.totalPages"
      :link-gen="movePage"
    ></b-pagination-nav>
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

export default {
  mixins: [blogMixin, blogArticleMixin],
  data() {
    return {
      tableFields: [
        { key: "id", label: this.$t("blogArticle.id") },
        {
          key: "title",
          label: this.$t("blogArticle.title"),
          class: "w-75"
        },
        {
          key: "createdDate",
          label: this.$t("blogArticle.createdDate"),
          formatter: value => {
            return this.$moment(value)
              .subtract(10, "days")
              .calendar();
          }
        },
        {
          key: "viewCount",
          label: this.$t("blogArticle.viewCount")
        }
      ],
      blogArticleList: {
        content: []
      }
    };
  },
  methods: {
    getView: function(item, index, event) {
      this.moveBlogArticleViewPage(this.$route.params.blogId, item.id);
    },
    // movePage의 경우 href를 만들기 때문에 move함수의 $router를 사용하지 않음.
    movePage: function(pageNum) {
      console.log("movePage: ", pageNum);

      return {
        path: "/blog/{0}/list".format(this.$route.params.blogId),
        query: { page: pageNum }
      };
    }
  },
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  mounted() {
    this.getBlogArticleList(this.$route.params.blogId)
      .then(data => {
        if (data !== undefined) {
          this.blogArticleList = data;
        }
      })
      .catch(this.commonErrorHandler);
  }
};
</script>

<style></style>
