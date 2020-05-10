<template>
  <section>
    <BlogHeadTitle
      menu="blogComment.menu.list"
      v-if="blogCommentList.content && blogCommentList.content.length > 0"
    />

    <BlogLoading v-if="blogCommentList.content === undefined" />
    <div v-if="blogCommentList.content && blogCommentList.content.length > 0">
      <b-list-group flush>
        <b-list-group-item
          class="flex-column"
          v-for="blogComment in sortedBlogCommentList"
          :key="blogComment.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <span>
              <b class="mb-1" v-text="blogComment.user.username" />
              <time
                @click="toggleCommentTimeDisplay"
                v-text="getCommentTimeDisplay(blogComment.createdDate)"
              />
            </span>
            <span
              v-if="loginInfo.login & (loginInfo.id === blogComment.userId)"
            >
              <b-button
                size="sm"
                variant="outline-primary"
                v-if="isOwner(blogComment)"
                v-text="$t('blogArticle.button.modify')"
              />
              <b-button
                size="sm"
                variant="outline-danger"
                v-if="isOwner(blogComment)"
                v-text="$t('blogArticle.button.delete')"
              />
            </span>
          </div>

          <p class="mb-1" v-text="blogComment.comment" />
        </b-list-group-item>
      </b-list-group>
    </div>

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
import { mapState, mapMutations } from "vuex";

import blogCommentMixin from "@/assets/blog/blogComment.js";

import BlogHeadTitle from "@/components/Blog/BlogHeadTitle.vue";
import BlogLoading from "@/components/Blog/BlogLoading.vue";

export default {
  computed: {
    ...mapState({
      loginInfo: (state) => state.loginInfo.loginInfo,
    }),
  },
  mixins: [blogCommentMixin],
  components: { BlogHeadTitle, BlogLoading },
  data() {
    return {
      blogCommentListTableFields: [
        { key: "user.username", label: this.$t("user.username") },
        { key: "comment", label: this.$t("blogComment.comment") },
        {
          key: "createdDate",
          label: this.$t("blogArticle.createdDate"),
          formatter: (value) => {
            return this.$moment(value)
              .subtract(10, "days")
              .calendar();
          },
        },
      ],
      blogCommentList: {},
      blogComment: {},
      currentPage: 1,
      commentTimeDisplay: 1,
    };
  },
  methods: {
    isOwner: function(blogComment) {
      if (blogComment.userId === this.loginInfo.id) {
        return true;
      }
      return false;
    },
    getList: function(pageRequest) {
      this.getBlogCommentList(this.$route.params.blogArticleId, pageRequest)
        .then((data) => {
          if (data != undefined) {
            this.blogCommentList = data;
            this.currentPage = this.blogCommentList.number + 1;
          }
        })
        .catch(this.commonErrorHandler);
    },
    movePage: function(pageNum) {
      var pageRequest = {
        page: pageNum - 1,
      };
      this.getList(pageRequest);
    },
    commentWriteAction: function() {
      this.blogComment.blogArticle = {
        id: this.$route.params.blogArticleId,
      };
      this.createBlogComment(this.blogComment)
        .then((data) => {
          this.blogComment = { comment: "" };
          this.getList();
        })
        .catch(this.commonErrorHandler);
    },
    toggleCommentTimeDisplay: function() {
      this.commentTimeDisplay = this.commentTimeDisplay ^ 1;
    },
    getCommentTimeDisplay: function(date) {
      if (this.commentTimeDisplay == 1) {
        return this.$moment(date).fromNow();
      } else {
        return this.$moment(date).format("LLLL");
      }
    },
  },
  watch: {
    $route(to, from) {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  computed: {
    sortedBlogCommentList: function() {
      return _.orderBy(this.blogCommentList.content, ["id"], ["asc"]);
    },
  },
};
</script>

<style></style>
