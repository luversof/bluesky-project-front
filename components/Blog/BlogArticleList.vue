<template>
  <section>
    <BlogHeadTitle menu="blogArticle.menu.list" />

    <BlogLoading v-if="blogArticleList.content === undefined" />

    <b-table
      v-if="blogArticleList.content !== undefined"
      :items="blogArticleList.content"
      hover
      :fields="tableFields"
      @row-clicked="getView"
      :tbody-tr-class="rowClass"
    >
      <template v-slot:cell(title)="data">
        {{ data.value }}
        <small
          class="text-info"
          v-if="data.item.blogCommentCount > 0"
          v-text="data.item.blogCommentCount"
        />
      </template>
    </b-table>

    <!-- 페이지 붙일 차례 -->
    <b-container fluid>
      <b-row>
        <b-col> </b-col>
        <b-col>
          <b-pagination-nav
            align="center"
            v-if="blogArticleList.content !== undefined"
            v-model="currentPage"
            :number-of-pages="blogArticleList.totalPages"
            :link-gen="movePage"
          />
        </b-col>
        <b-col class="text-right">
          <b-button
            v-if="userBlog.id == $route.params.blogId"
            variant="outline-primary"
            @click="moveUserBlogArticleWriteView()"
            v-text="$t('blogArticle.button.write')"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import BlogHeadTitle from "@/components/Blog/BlogHeadTitle.vue";
import BlogLoading from "@/components/Blog/BlogLoading.vue";

export default {
  components: { BlogHeadTitle, BlogLoading },
  mixins: [blogMixin, blogArticleMixin],
  data() {
    return {
      tableFields: [
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
            return this.$dayjs(value).fromNow();
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
    getView(item, index, event) {
      this.moveBlogArticleView(this.$route.params.blogId, item.id);
    },
    // movePage의 경우 href를 만들기 때문에 move함수의 $router를 사용하지 않음.
    movePage(pageNum) {
      return {
        path: "/blog/{0}/list".format(this.$route.params.blogId),
        query: { page: pageNum },
      };
    },
    getList(pageRequest) {
      this.getBlogArticleList(this.$route.params.blogId, pageRequest)
        .then((data) => {
          if (data !== undefined) {
            this.blogArticleList = data;
            this.currentPage = this.blogArticleList.number + 1;
          }
        })
        .catch(this.commonErrorHandler);
    },
    rowClass(item, type) {
      var blogArticleId = this.$route.params.blogArticleId;
      if (!item || type !== "row" || blogArticleId === undefined) return;
      if (item.id == blogArticleId) return "table-active";
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
