<template>
  <div>
    글쓰기
    <editor ref="toastuiEditor" />
    <b-button @click="createAction">{{ $t("blog.article.write") }}</b-button>
  </div>
</template>

<script>
import blogMixin from "@/assets/blog/blog.js";
import blogArticleMixin from "@/assets/blog/blogArticle.js";

  import 'codemirror/lib/codemirror.css';
  import '@toast-ui/editor/dist/toastui-editor.css';

  import { Editor } from '@toast-ui/vue-editor';

export default {
  mixins: [blogMixin, blogArticleMixin],
  components: {
    editor: Editor
  },
  data() {
    return {
      blogArticle: {
        title: "",
        content: ""
      }
    };
  },
  watch: {},
  // asyncData({ params }) {
  //   console.log(params);
  // },
  methods: {
    createAction() {
      this.blogArticle.content = this.$refs.toastuiEditor.invoke("getHtml")
      console.log("createAction : ", this.$refs.toastuiEditor);
      console.log("createAction2 : ", this.blogArticle.content);
      this.create(this.blogArticle);
    }
  },
  mounted() {
  }
};
</script>

<style></style>
