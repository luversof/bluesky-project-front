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
          v-for="(targetBlogComment, index) in sortedBlogCommentList"
          :key="targetBlogComment.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <span>
              <b class="mb-1" v-text="targetBlogComment.user.username" />
              <time
                @click="toggleCommentTimeDisplay"
                v-text="getCommentTimeDisplay(targetBlogComment.createdDate)"
              />
            </span>
            <span
              v-if="
                loginInfo.login & (loginInfo.id === targetBlogComment.userId)
              "
            >
              <b-button
                size="sm"
                variant="outline-primary"
                v-if="isOwner(targetBlogComment)"
                v-text="$t('blogComment.button.modify')"
                @click="toggleArticleCommentModifyForm(targetBlogComment)"
              />
              <b-button
                size="sm"
                variant="outline-danger"
                v-if="isOwner(targetBlogComment)"
                v-text="$t('blogComment.button.delete')"
                @click="deleteBlogArticleConfirm(targetBlogComment)"
              />
            </span>
          </div>

          <BlogHeadTitle menu="blogComment.menu.write" />
          <BlogCommentWrite
            v-if="isActiveBlogCommentModifyForm(targetBlogComment)"
            v-model="modifyBlogComment"
            text="blogComment.button.modify"
            :click="commentModifyAction"
          />

          <section
            class="mb-1"
            v-if="!isActiveBlogCommentModifyForm(targetBlogComment)"
            v-text="targetBlogComment.comment"
          />
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

    <BlogHeadTitle menu="blogComment.menu.write" />
    <BlogCommentWrite
      v-model="blogComment"
      text="blogComment.button.write"
      :click="commentWriteAction"
    />
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import blogCommentMixin from "@/assets/blog/blogComment.js";

import BlogHeadTitle from "@/components/Blog/BlogHeadTitle.vue";
import BlogLoading from "@/components/Blog/BlogLoading.vue";
import BlogCommentWrite from "@/components/Blog/BlogCommentWrite.vue";

export default {
  computed: {
    ...mapState({
      loginInfo: (state) => state.loginInfo.loginInfo,
    }),
  },
  mixins: [blogCommentMixin],
  components: { BlogHeadTitle, BlogLoading, BlogCommentWrite },
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
      modifyBlogComment: {},
      originalBlogComment: {},
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
    commentModifyAction: function() {
      console.log("modify : ", this.modifyBlogComment);
    },
    deleteBlogArticleConfirm: function(blogComment) {
      if (confirm(this.$t("blogComment.msg.deleteConfirm"))) {
        this.deleteBlogComment(blogComment.id).then((response) => {
          if (response.ok) {
            var pageRequest = {
              page: this.currentPage - 1,
            };
            this.getList(pageRequest);
            console.log("삭제 성공. 실패시엔 어떻게?");
          }
        });
      }
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

    toggleArticleCommentModifyForm: function(targetBlogComment) {
      console.log("접근");
      if (this.modifyBlogComment.id == targetBlogComment.id) {
        this.modifyBlogComment = {};
      } else {
        console.log(1);
        this.modifyBlogComment = _.cloneDeep(targetBlogComment);
        console.log(2, this.modifyBlogComment);
        this.originalBlogComment = targetBlogComment;
      }
    },
    isActiveBlogCommentModifyForm: function(targetBlogComment) {
      return this.modifyBlogComment.id == targetBlogComment.id;
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
