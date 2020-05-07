<template>
  <section>
    <BlogHeadTitle
      menu="blogComment.menu.list"
      v-if="blogCommentList.content && blogCommentList.content.length > 0"
    />

    <BlogLoading v-if="blogCommentList.content === undefined" />

    <b-table
      v-if="blogCommentList.content && blogCommentList.content.length > 0"
      :items="blogCommentList.content"
      :fields="blogCommentListTableFields"
    />
    <b-pagination
      align="center"
      v-if="blogCommentList.content && blogCommentList.totalPages > 1"
      v-model="currentPage"
      :total-rows="blogCommentList.totalElements"
      :per-page="blogCommentList.size"
      @change="movePage"
    />

    <div>
      <b>댓글 쓰기</b>
      <b-input-group>
        <b-form-textarea v-model="blogComment.comment" />
        <b-input-group-append>
          <b-button
            variant="outline-primary"
            @click="commentWriteAction"
            v-text="$t('blogComment.button.write')"
          />
        </b-input-group-append>
      </b-input-group>
    </div>
  </section>
</template>

<script>
import blogCommentMixin from "@/assets/blog/blogComment.js";

import BlogHeadTitle from "@/components/Blog/BlogHeadTitle.vue";
import BlogLoading from "@/components/Blog/BlogLoading.vue";

export default {
  mixins: [blogCommentMixin],
  components: { BlogHeadTitle, BlogLoading },
  data() {
    return {
      blogCommentListTableFields: [
        { key: "comment", label: this.$t("blogComment.comment") },
        {
          key: "createdDate",
          label: this.$t("blogArticle.createdDate"),
          formatter: value => {
            return this.$moment(value)
              .subtract(10, "days")
              .calendar();
          }
        }
      ],
      blogCommentList: {},
      blogComment: {},
      currentPage: 1
    };
  },
  methods: {
    getList: function(pageRequest) {
      this.getBlogCommentList(this.$route.params.blogArticleId, pageRequest)
        .then(data => {
          if (data != undefined) {
            this.blogCommentList = data;
            console.log("TEST : ", this.blogCommentList);
            this.currentPage = this.blogCommentList.number + 1;
          }
        })
        .catch(this.commonErrorHandler);
    },
    movePage: function(pageNum) {
      var pageRequest = {
        page: pageNum - 1
      };
      this.getList(pageRequest);
    },
    commentWriteAction: function() {
      this.blogComment.blogArticle = {
        id: this.$route.params.blogArticleId
      };
      this.createBlogComment(this.blogComment)
        .then(data => {
          this.blogComment = { comment: "" };
          this.getList();
        })
        .catch(this.commonErrorHandler);
    }
  },
  watch: {
    $route(to, from) {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style></style>
