<template>
  <div class="m-3">
    <h1 class="text-primary" v-text="$t('blogArticle.menu.modify')"></h1>

    <b-form-group>
      <b-form-input
        v-model="blogArticle.title"
        :placeholder="$t('blogArticle.title')"
      ></b-form-input>
    </b-form-group>
    <b-form-group>
      <Editor
        v-if="blogArticle.content != null"
        :initialValue="blogArticle.content"
        ref="toastuiEditor"
      />
    </b-form-group>
    <div class="text-right">
      <b-button @click="modifyAction">{{
        $t("blogArticle.button.modify")
      }}</b-button>
      <b-button @click="historyBack">{{
        $t("blogArticle.button.cancel")
      }}</b-button>
    </div>
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import BlogHeadTitle from "@/components/Blog/BlogHeadTitle.vue";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/vue-editor";

export default {
  mixins: [blogMixin, blogArticleMixin],
  components: {
    BlogHeadTitle,
    Editor,
  },
  data() {
    return {
      blogArticle: {},
    };
  },
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  methods: {
    modifyAction() {
      this.blogArticle.content = this.$refs.toastuiEditor.invoke("getMarkdown");
      this.updateBlogArticle(this.blogArticle)
        .then((data) => {
          if (data !== undefined) {
            this.moveBlogArticleView(this.$route.params.blogId, this.$route.params.blogArticleId);
          }
          return data;
        })
        .catch(this.commonErrorHandler);
    },
  },
  mounted() {
    // 수정할 글 정보를 호출한다.
    this.getBlogArticle(this.$route.params.blogArticleId).then((data) => {
      this.blogArticle = data;
    });
  },
};
</script>

<style></style>
