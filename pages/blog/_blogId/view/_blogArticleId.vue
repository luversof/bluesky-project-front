<template>
  <div class="m-3">
    <article>
      <h1>{{blogArticle.title}}</h1>
      <viewer
        v-if="blogArticle.content != null"
        ref="toastuiEditor"
        :initialValue="blogArticle.content"
      />
      <footer>
        <p>
          Posted on
          <time v-text="$moment(blogArticle.createdDate).format('LLL')"></time>
        </p>
      </footer>
    </article>
    <!-- 수정 버튼은 해당 글의 글쓴이만 가능 -->
    <b-button v-if="isOwner()" @click="moveModifyView" v-text="$t('blogArticle.modify')"></b-button>
    <b-button v-if="isOwner()" @click="deleteBlogArticleConfirm" v-text="$t('blogArticle.delete')"></b-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/vue-editor";

export default {
  layout: "blog",
  mixins: [blogMixin, blogArticleMixin],
  components: {
    viewer: Viewer
  },
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  data() {
    return {
      blogArticle: {},
      viewerText: "# This is Viewer.\n Hello World."
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
          response => {
            if (response.ok) {
              this.moveUserBlogArticleListPage();
              console.log("삭제 성공. 실패시엔 어떻게?");
            }
          }
        );
      }
    }
  },
  mounted() {
    // router의 변수 값은 어떻게 구하나?
    // path variable 이름은 동일한 이름을 사용하면 안됨.
    this.getBlogArticle(this.$route.params.blogArticleId).then(data => {
      this.blogArticle = data;
    });
  }
};
</script>

<style>
</style>