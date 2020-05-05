<template>
  <div class="m-3">
    <BlogHeadTitle menu="blogArticle.menu.view" />

    <BlogLoading v-if="blogArticle.id == null" />

    <article v-if="blogArticle.id != null">
      <div class="d-flex w-100 justify-content-between">
        <h1>{{ blogArticle.title }}</h1>
        <time v-text="$moment(blogArticle.createdDate).format('LLL')" />
      </div>

      <Viewer
        v-if="blogArticle.content != null"
        ref="toastuiEditor"
        :initialValue="blogArticle.content"
      />
    </article>
    <!-- 수정 버튼은 해당 글의 글쓴이만 가능 -->
    <div class="text-right">
      <b-button
        variant="outline-primary"
        v-if="isOwner()"
        @click="moveModifyView"
        v-text="$t('blogArticle.button.modify')"
      />
      <b-button
        variant="outline-danger"
        v-if="isOwner()"
        @click="deleteBlogArticleConfirm"
        v-text="$t('blogArticle.button.delete')"
      />
    </div>

    <BlogCommentList />

    <BlogArticleList />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import BlogHeadTitle from "@/components/Blog/BlogHeadTitle.vue";
import BlogCommentList from "@/components/Blog/BlogCommentList.vue";
import BlogArticleList from "@/components/Blog/BlogArticleList.vue";
import BlogLoading from "@/components/Blog/BlogLoading.vue";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/vue-editor";

export default {
  layout: "blog",
  mixins: [blogMixin, blogArticleMixin],
  components: {
    BlogHeadTitle,
    BlogCommentList,
    BlogArticleList,
    BlogLoading,
    Viewer,
  },
  computed: {
    ...mapState({
      loginInfo: (state) => state.loginInfo.loginInfo,
    }),
  },
  data() {
    return {
      blogArticle: {},
      viewerText: "# This is Viewer.\n Hello World.",
    };
  },
  methods: {
    isOwner: function() {
      if (this.blogArticle.blog === undefined) {
        return false;
      }
      if (this.blogArticle.blog.userId === this.loginInfo.id) {
        return true;
      }
      return false;
    },
    moveModifyView: function() {
      this.moveBlogArticleModifyPage(this.$route.params.blogArticleId);
    },
    deleteBlogArticleConfirm: function() {
      if (confirm(this.$t("blogArticle.msg.deleteConfirm"))) {
        this.deleteBlogArticle(this.$route.params.blogArticleId).then(
          (response) => {
            if (response.ok) {
              this.moveUserBlogArticleListPage();
              console.log("삭제 성공. 실패시엔 어떻게?");
            }
          }
        );
      }
    },
  },
  watch: {
    $route(to, from) {
      this.getBlogArticle(this.$route.params.blogArticleId).then((data) => {
        this.blogArticle = data;
        window.scrollTo(0, 0);
      });
    },
  },
  mounted() {
    // router의 변수 값은 어떻게 구하나?
    // path variable 이름은 동일한 이름을 사용하면 안됨.
    this.getBlogArticle(this.$route.params.blogArticleId).then((data) => {
      this.blogArticle = data;
    });
  },
};
</script>

<style></style>
