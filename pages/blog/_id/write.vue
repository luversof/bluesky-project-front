<template>
  <div>
    글쓰기
    <editor ref="toastuiEditor" />
    <b-button @click="write">{{ $t("blog.article.write") }}</b-button>
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/vue-editor";

export default {
  mixins: [blogMixin, blogArticleMixin],
  components: {
    editor: Editor
  },
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  methods: {
    write() {
      console.log("TEST", this.$refs.toastuiEditor.invoke("getHtml"));
    }
  },
  mounted() {
    console.log("테스트", this.$route);
    this.getBlogArticleList(this.$route.params.id);
  }
};
</script>

<style></style>
